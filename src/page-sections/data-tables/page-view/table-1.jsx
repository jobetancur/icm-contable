import { Fragment, useEffect, useState } from 'react'; // MUI

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination'; // REACT TABLE

import { flexRender, useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel } from '@tanstack/react-table'; // CUSTOM PAGE SECTION COMPONENT

import TableActions from '../table-actions/TableActions';
import TableColumnFilter from '../table-column-filter/TableColumnFilter'; // CUSTOM COMPONENTS

import Scrollbar from '@/components/scrollbar'; // CUSTOM DUMMY DATA

import { supabase } from '@/utils/supabaseClient'; // CUSTOM STYLED COMPONENTS

import { BodyTableRow, BodyTableCell, HeadTableCell } from './styles'; // TABLE COLUMN SHAPE

import { columns, ACCOUNTS, SITES, TYPES_INCOME, TYPES_EXPENDITURES } from '../columns';
export default function DataTablePageView() {
  const [userList, setUserList] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const table = useReactTable({
    columns,
    data: userList,
    enableRowSelection: true,
    state: {
      rowSelection
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  }); // SELECTED ROW DATA LIST

  const SELECTED_ROWS = table.getSelectedRowModel().flatRows; // ANY SPECIFIC COLUMN FILTERING EXIST OR NOT

  const HAS_COLUMN_FILTER = table.getState().columnFilters.length; // Búsqueda global y recarga de todos los registros al limpiar

  const handleSearch = async text => {
    if (text) {
      // Búsqueda global en frontend (puedes cambiar a Supabase si la tabla es muy grande)
      const lower = text.toLowerCase();
      const filtered = userList.filter(item =>
        (item.description || '').toLowerCase().includes(lower) ||
        (item.amount + '').includes(lower) ||
        (item.date || '').includes(lower) ||
        (item.accounts_id && ACCOUNTS.find(a => a.id === item.accounts_id)?.name.toLowerCase().includes(lower)) ||
        (item.sites_id && SITES.find(s => s.id === item.sites_id)?.name.toLowerCase().includes(lower)) ||
        (item.types_income_id && TYPES_INCOME.find(t => t.id === item.types_income_id)?.name.toLowerCase().includes(lower)) ||
        (item.type_expenditure_id && TYPES_EXPENDITURES.find(t => t.id === item.type_expenditure_id)?.name.toLowerCase().includes(lower))
      );
      setUserList(filtered);
    } else {
      // Si se borra la búsqueda, recarga todos los registros desde Supabase
      setLoading(true);
      const { data } = await supabase.from('financial').select('*');
      setUserList(data || []);
      setLoading(false);
    }
  }; // RESET ALL COLUMN FILTERING IF EXIST


  const handleResetColumnFilter = () => {
    table.resetColumnFilters();
  }; // HANDLE DELETE SELECTED ROW


  const handleDeleteRow = async () => {
    const userIdList = SELECTED_ROWS.map(row => row.original.id);
    if (userIdList.length === 0) return;
    // Elimina en Supabase
    await supabase.from('financial').delete().in('id', userIdList);
    setRefresh(r => !r);
    setRowSelection({});
  };

  // Permitir editar al hacer doble click en una fila
  const handleRowDoubleClick = (row) => {
    if (row && row.original) {
      // Abre el modal de edición pasando los datos
      document.dispatchEvent(new CustomEvent('edit-movimiento', { detail: row.original }));
    }
  };

  useEffect(() => {
    setLoading(true);
    // Suscripción en tiempo real
    const subscription = supabase
      .channel('financial-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'financial' }, payload => {
        setRefresh(r => !r);
      })
      .subscribe();

    const fetchData = async () => {
      const { data, error } = await supabase
        .from('financial')
        .select('*');
      if (!error) setUserList(data || []);
      setLoading(false);
    };
    fetchData();
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [refresh]);

  // Escuchar evento global para editar
  useEffect(() => {
    const handler = (e) => {
      if (e.detail) {
        // Propaga el evento a TableActions
        if (window.setEditMovimiento) {
          window.setEditMovimiento(e.detail);
        } else {
          console.warn('El manejador setEditMovimiento no está disponible');
        }
      }
    };
    document.addEventListener('edit-movimiento', handler);
    return () => document.removeEventListener('edit-movimiento', handler);
  }, []);

  // Hacer funcionales los filtros por columna
  table.getAllLeafColumns().forEach(col => {
    if (col.getCanFilter()) {
      col.setFilterValue = value => {
        table.setColumnFilters(old => [
          ...old.filter(f => f.id !== col.id),
          value ? { id: col.id, value } : null
        ].filter(Boolean));
      };
    }
  });

  // Paginación real sobre los datos filtrados
  const paginatedRows = table.getRowModel().rows;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const paginatedData = paginatedRows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  return <div className="pt-2 pb-4">
      {
      /* DATA TABLE ACTIONS */
    }
      <TableActions
        rowSelected={SELECTED_ROWS.length}
        hasColumnFilter={HAS_COLUMN_FILTER}
        handleSearch={handleSearch}
        handleDeleteRow={handleDeleteRow}
        handleResetColumnFilter={handleResetColumnFilter}
        onSave={() => setRefresh(r => !r)}
      />

      {
      /* DATA TABLE */
    }
      <Card sx={{
      marginTop: 3,
      pt: 1
    }}>
        <Scrollbar>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map(headerGroup => <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => <HeadTableCell key={header.id} sx={{
                minWidth: header.getSize()
              }}>
                      {header.isPlaceholder ? null : <Fragment>
                          {
                    /* GET HEADER COLUMN */
                  }
                          {flexRender(header.column.columnDef.header, header.getContext())}

                          {
                    /* GET COLUMN BASED FILTER */
                  }
                          {header.column.getCanFilter() ? <TableColumnFilter column={header.column} table={table} /> : null}
                        </Fragment>}
                    </HeadTableCell>)}
                </TableRow>)}
            </TableHead>

            <TableBody>
              {paginatedData.map(row => <BodyTableRow selected_row={rowSelection[row.id] ? 1 : 0} key={row.id} onDoubleClick={() => handleRowDoubleClick(row)}>
                  {row.getVisibleCells().map(cell => <BodyTableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </BodyTableCell>)}
                </BodyTableRow>)}
            </TableBody>
          </Table>
        </Scrollbar>

        {
        /* TABLE PAGINATION SECTION */
      }
        <TablePagination component="div" rowsPerPageOptions={[5, 10, 25]} page={pageIndex} rowsPerPage={pageSize} count={paginatedRows.length} onPageChange={(_, page) => table.setPageIndex(page)} onRowsPerPageChange={e => table.setPageSize(+e.target.value || 5)} />
      </Card>
    </div>;
}