import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add'; // CUSTOM COMPONENTS

import CreateForm from '../create-form';
import { H6 } from '@/components/typography';
import SearchInput from '@/components/search-input';
import FlexBetween from '@/components/flexbox/FlexBetween';
import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
import NotificationSnackbar from '@/components/notification/NotificationSnackbar'; // CUSTOM STYLED COMPONENTS

import { ButtonWrapper } from './styles'; // ==============================================================

// ==============================================================
export default function TableActions({
  rowSelected,
  hasColumnFilter,
  handleSearch,
  handleDeleteRow,
  handleResetColumnFilter,
  onSave,
  onEdit
}) {
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null
  });
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Función para abrir el modal en modo edición
  const handleEdit = (row) => {
    setEditData(row);
    setOpenForm(true);
  };

  // Manejador para cerrar notificaciones
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Manejador para confirmar eliminación
  const handleConfirmDelete = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
    
    // Ejecutar la acción real de eliminación
    handleDeleteRow();
    
    // Mostrar notificación de éxito
    setNotification({
      open: true,
      message: `${rowSelected} registro(s) eliminado(s) correctamente`,
      severity: 'success'
    });
  };

  // Manejador para abrir diálogo de confirmación de eliminación
  const handleOpenDeleteConfirm = () => {
    setConfirmDialog({
      open: true,
      title: 'Confirmar eliminación',
      message: `¿Está seguro que desea eliminar ${rowSelected} registro(s) seleccionado(s)?`,
      onConfirm: handleConfirmDelete
    });
  };

  // Permitir que TableActions escuche el evento global para editar
  useEffect(() => {
    // Definir el manejador para abrir el modal y establecer los datos
    window.setEditMovimiento = (data) => {
      setEditData(data);
      setOpenForm(true);
    };
    return () => { window.setEditMovimiento = null; };
  }, []);

  return <FlexBetween flexWrap="wrap" gap={2}>
    {/* SEARCH INPUT BOX */}
    <SearchInput placeholder="Buscar movimiento" onChange={e => handleSearch(e.target.value.trim())} />
    <ButtonWrapper>
      {/* SELECTED ITEM AND DELETE BUTTON */}
      {rowSelected ? <div className="select-action">
        <H6 fontSize={14}>{rowSelected} Seleccionado(s)</H6>
        <Button size="small" color="error" variant="contained" onClick={handleOpenDeleteConfirm}>
          Eliminar
        </Button>
      </div> : null}
      {/* CLEAR FILTER BUTTON */}
      {hasColumnFilter ? <Button size="small" color="error" variant="contained" onClick={handleResetColumnFilter}>
        Limpiar filtro
      </Button> : null}
      {/* ADD MOVEMENT BUTTON  */}
      <Button endIcon={<Add />} variant="contained" onClick={() => { setEditData(null); setOpenForm(true); }}>
        Agregar movimiento
      </Button>
      {/* ADD MOVEMENT FORM MODAL */}
      <CreateForm open={openForm} onClose={() => setOpenForm(false)} onSave={() => { setOpenForm(false); if (onSave) onSave(); }} edit={!!editData} data={editData} />
      
      {/* CONFIRM DELETE DIALOG */}
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
        onConfirm={confirmDialog.onConfirm}
        confirmButtonText="Eliminar"
        confirmButtonColor="error"
      />
      
      {/* NOTIFICATIONS */}
      <NotificationSnackbar
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </ButtonWrapper>
  </FlexBetween>;
}