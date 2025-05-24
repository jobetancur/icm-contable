import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
// CUSTOM COMPONENTS
import FlexBox from '@/components/flexbox/FlexBox';
import { Paragraph, Small } from '@/components/typography'; // common cell component

const CommonCell = ({
  title,
  body
}) => <div>
    <Paragraph fontWeight={500} color="text.primary">
      {title}
    </Paragraph>

    <Small color="text.secondary">{body}</Small>
  </div>; // ===============================

// Datos de referencia para mostrar nombres en vez de IDs
const ACCOUNTS = [{
  id: 31,
  name: 'caja'
}, {
  id: 32,
  name: 'actividades'
}, {
  id: 33,
  name: 'protemplo'
}, {
  id: 34,
  name: 'cosecha'
}, {
  id: 35,
  name: 'donaciones'
}];
const SITES = [{
  id: 1,
  name: 'san_pedro'
}, {
  id: 2,
  name: 'pajarito'
}, {
  id: 3,
  name: 'pedregal_bajo'
}];
const TYPES_INCOME = [{
  id: 1,
  name: 'diezmo'
}, {
  id: 2,
  name: 'ofrenda'
}, {
  id: 3,
  name: 'donacion'
}, {
  id: 4,
  name: 'bazar'
}, {
  id: 5,
  name: 'cafeteria'
}, {
  id: 6,
  name: 'tamales'
}, {
  id: 7,
  name: 'cosecha'
}, {
  id: 8,
  name: 'misiones_pajarito'
}, {
  id: 9,
  name: 'actividades'
}, {
  id: 10,
  name: 'protemplo'
}];
const TYPES_EXPENDITURES = [{
  id: 11,
  name: 'diezmo_distrital'
}, {
  id: 12,
  name: 'misiones'
}, {
  id: 13,
  name: 'arriendo'
}, {
  id: 14,
  name: 'aporte_administrativo'
}, {
  id: 15,
  name: 'emonumento_pastoral'
}, {
  id: 16,
  name: 'seguridad_social'
}, {
  id: 17,
  name: 'internet_hogar'
}, {
  id: 18,
  name: 'internet_iglesia'
}, {
  id: 19,
  name: 'epm_hogar'
}, {
  id: 20,
  name: 'epm_iglesia'
}, {
  id: 21,
  name: 'insumos'
}, {
  id: 22,
  name: 'ofrenda_pastoral'
}, {
  id: 23,
  name: 'otros'
}, {
  id: 24,
  name: 'adecuaciones'
}, {
  id: 25,
  name: 'axilios_pastorales'
}, {
  id: 26,
  name: 'retefuente_arriendo'
}, {
  id: 27,
  name: 'cuota_contadora'
}, {
  id: 28,
  name: 'auxilios_movilidad'
}, {
  id: 29,
  name: 'ofrenda_invitados'
}, {
  id: 30,
  name: 'planes_celulares'
}]; // ===============================

// Paletas de colores sutiles para cada tipo
const ACCOUNT_COLORS = ['#e3f2fd', '#fce4ec', '#e8f5e9', '#fff3e0', '#f3e5f5'];
const SITE_COLORS = ['#e1f5fe', '#f9fbe7', '#f3e5f5'];
const INCOME_COLORS = ['#e0f7fa', '#f1f8e9', '#fffde7', '#fce4ec', '#e8eaf6', '#f3e5f5', '#e1f5fe', '#f9fbe7', '#f3e5f5', '#fff3e0'];
const EXPENDITURE_COLORS = [
  '#f8bbd0','#ffe0b2','#c8e6c9','#b3e5fc','#d1c4e9','#fff9c4','#ffecb3','#b2dfdb','#dcedc8','#f0f4c3',
  '#f3e5f5','#e1f5fe','#f9fbe7','#fce4ec','#e8eaf6','#f3e5f5','#e1f5fe','#f9fbe7','#f3e5f5','#fff3e0'
];

// Helper para filtrar por nombre en columnas de referencia
function filterByName(value, id, refArray) {
  if (!value) return true;
  const ref = refArray.find(r => r.id === id);
  return ref ? ref.name.toLowerCase().includes(value.toLowerCase()) : false;
}

function filterByAmount(value, amount) {
  if (!value) return true;
  // Permite buscar por número exacto o por parte del número
  return (amount + '').includes(value.replace(/[^\d.]/g, ''));
}

function filterByType(value, row) {
  if (!value) return true;
  const tipo = row.original.incomes ? 'Ingreso' : 'Egreso';
  return tipo.toLowerCase().includes(value.toLowerCase());
}

function formatCOP(amount) {
  return amount !== undefined && amount !== null
    ? amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 })
    : '';
}

export const columns = [{
  id: 'select',
  maxSize: 50,
  header: ({
    table
  }) => <Checkbox {...{
    checked: table.getIsAllRowsSelected(),
    indeterminate: table.getIsSomeRowsSelected(),
    onChange: table.getToggleAllRowsSelectedHandler()
  }} />,
  cell: ({
    row
  }) => <Checkbox {...{
    checked: row.getIsSelected(),
    disabled: !row.getCanSelect(),
    indeterminate: row.getIsSomeSelected(),
    onChange: row.getToggleSelectedHandler()
  }} />
}, {
  header: 'Fecha',
  accessorKey: 'date',
  minSize: 120
}, {
  header: 'Tipo',
  accessorKey: 'type',
  minSize: 100,
  cell: ({ row }) => row.original.incomes ? 'Ingreso' : 'Egreso',
  filterFn: (row, id, value) => {
    if (!value) return true;
    const tipo = row.original.incomes ? 'Ingreso' : 'Egreso';
    return tipo.toLowerCase().includes((value || '').toLowerCase());
  },
}, {
  header: 'Descripción',
  accessorKey: 'description',
  minSize: 200
}, {
  header: 'Monto',
  accessorKey: 'amount',
  cell: ({
    row
  }) => formatCOP(row.original.amount),
  minSize: 100,
  filterFn: (row, id, value) => filterByAmount(value, row.original.amount)
}, {
  header: 'Cuenta',
  accessorKey: 'accounts_id',
  minSize: 120,
  cell: ({ row }) => {
    const acc = ACCOUNTS.find(a => a.id === row.original.accounts_id);
    const idx = ACCOUNTS.findIndex(a => a.id === row.original.accounts_id);
    return acc ? <Chip label={acc.name} size="small" sx={{ background: ACCOUNT_COLORS[idx % ACCOUNT_COLORS.length], fontWeight: 500, color: 'text.primary' }} /> : row.original.accounts_id;
  },
  filterFn: (row, id, value) => filterByName(value, row.original.accounts_id, ACCOUNTS)
}, {
  header: 'Sitio',
  accessorKey: 'sites_id',
  minSize: 120,
  cell: ({ row }) => {
    const site = SITES.find(s => s.id === row.original.sites_id);
    const idx = SITES.findIndex(s => s.id === row.original.sites_id);
    return site ? <Chip label={site.name} size="small" sx={{ background: SITE_COLORS[idx % SITE_COLORS.length], fontWeight: 500, color: 'text.primary' }} /> : row.original.sites_id;
  },
  filterFn: (row, id, value) => filterByName(value, row.original.sites_id, SITES)
}, {
  header: 'Tipo de Ingreso',
  accessorKey: 'types_income_id',
  minSize: 120,
  cell: ({ row }) => {
    const tipo = TYPES_INCOME.find(t => t.id === row.original.types_income_id);
    const idx = TYPES_INCOME.findIndex(t => t.id === row.original.types_income_id);
    return tipo ? <Chip label={tipo.name} size="small" sx={{ background: INCOME_COLORS[idx % INCOME_COLORS.length], fontWeight: 500, color: 'text.primary' }} /> : row.original.types_income_id;
  },
  filterFn: (row, id, value) => filterByName(value, row.original.types_income_id, TYPES_INCOME)
}, {
  header: 'Tipo de Egreso',
  accessorKey: 'type_expenditure_id',
  minSize: 120,
  cell: ({ row }) => {
    const tipo = TYPES_EXPENDITURES.find(t => t.id === row.original.type_expenditure_id);
    const idx = TYPES_EXPENDITURES.findIndex(t => t.id === row.original.type_expenditure_id);
    return tipo ? <Chip label={tipo.name} size="small" sx={{ background: EXPENDITURE_COLORS[idx % EXPENDITURE_COLORS.length], fontWeight: 500, color: 'text.primary' }} /> : row.original.type_expenditure_id;
  },
  filterFn: (row, id, value) => filterByName(value, row.original.type_expenditure_id, TYPES_EXPENDITURES)
}, {
  header: 'Acciones',
  id: 'actions',
  minSize: 80,
  cell: ({ row }) => (
    <Button
      size="small"
      variant="outlined"
      color="primary"
      onClick={(e) => {
        e.stopPropagation(); // Evitar propagación para prevenir conflictos
        document.dispatchEvent(new CustomEvent('edit-movimiento', { detail: row.original }));
      }}
    >
      Editar
    </Button>
  ),
  enableColumnFilter: false
}];

// Exporto las constantes para uso en otros archivos
export { ACCOUNTS, SITES, TYPES_INCOME, TYPES_EXPENDITURES };