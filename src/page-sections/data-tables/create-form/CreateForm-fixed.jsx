import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react'; // CUSTOM COMPONENTS

import { H6 } from '@/components/typography';
import Scrollbar from '@/components/scrollbar';
import FlexBox from '@/components/flexbox/FlexBox';
import NotificationSnackbar from '@/components/notification/NotificationSnackbar'; // STYLED COMPONENT

import { StyledAppModal } from './styles';
import { supabase } from '@/utils/supabaseClient'; // ======================================================================================

// ======================================================================================
export default function CreateForm({
  open,
  onClose,
  onSave,
  edit,
  data
}) {
  // Estado para las notificaciones
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Cerrar notificación
  const handleCloseNotification = () => {
    setNotification({...notification, open: false});
  };
  
  // Listas para selects
  const ACCOUNTS = [
    { id: 31, name: 'caja' },
    { id: 32, name: 'actividades' },
    { id: 33, name: 'protemplo' },
    { id: 34, name: 'cosecha' },
    { id: 35, name: 'donaciones' },
  ];
  const SITES = [
    { id: 1, name: 'san_pedro' },
    { id: 2, name: 'pajarito' },
    { id: 3, name: 'pedregal_bajo' },
  ];
  const TYPES_INCOME = [
    { id: 1, name: 'diezmo' },
    { id: 2, name: 'ofrenda' },
    { id: 3, name: 'donacion' },
    { id: 4, name: 'bazar' },
    { id: 5, name: 'cafeteria' },
    { id: 6, name: 'tamales' },
    { id: 7, name: 'cosecha' },
    { id: 8, name: 'misiones_pajarito' },
    { id: 9, name: 'actividades' },
    { id: 10, name: 'protemplo' },
  ];
  const TYPES_EXPENDITURES = [
    { id: 11, name: 'diezmo_distrital' },
    { id: 12, name: 'misiones' },
    { id: 13, name: 'arriendo' },
    { id: 14, name: 'aporte_administrativo' },
    { id: 15, name: 'emonumento_pastoral' },
    { id: 16, name: 'seguridad_social' },
    { id: 17, name: 'internet_hogar' },
    { id: 18, name: 'internet_iglesia' },
    { id: 19, name: 'epm_hogar' },
    { id: 20, name: 'epm_iglesia' },
    { id: 21, name: 'insumos' },
    { id: 22, name: 'ofrenda_pastoral' },
    { id: 23, name: 'otros' },
    { id: 24, name: 'adecuaciones' },
    { id: 25, name: 'axilios_pastorales' },
    { id: 26, name: 'retefuente_arriendo' },
    { id: 27, name: 'cuota_contadora' },
    { id: 28, name: 'auxilios_movilidad' },
    { id: 29, name: 'ofrenda_invitados' },
    { id: 30, name: 'planes_celulares' },
  ];
  
  // Determinar el tipo basado en los campos incomes/expenditures en modo de edición
  const determineType = () => {
    if (!edit || !data) return 'ingreso'; // Por defecto ingreso para nuevos registros
    return data.incomes ? 'ingreso' : 'egreso';
  };

  const initialValues = {
    type: determineType(),
    description: data?.description || '',
    amount: data?.amount || '',
    date: data?.date || '',
    accounts_id: data?.accounts_id?.toString() || '',
    sites_id: data?.sites_id?.toString() || '',
    types_income_id: data?.types_income_id?.toString() || '',
    type_expenditure_id: data?.type_expenditure_id?.toString() || '',
  };
  
  const validationSchema = Yup.object().shape({
    type: Yup.string().required('El tipo es requerido'),
    description: Yup.string().required('La descripción es requerida'),
    amount: Yup.number().required('El monto es requerido'),
    date: Yup.string().required('La fecha es requerida'),
    accounts_id: Yup.string().required('La cuenta es requerida'),
    sites_id: Yup.string().required('El sitio es requerido'),
    types_income_id: Yup.string().when('type', {
      is: 'ingreso',
      then: schema => schema.required('El tipo de ingreso es requerido'),
      otherwise: schema => schema
    }),
    type_expenditure_id: Yup.string().when('type', {
      is: 'egreso',
      then: schema => schema.required('El tipo de egreso es requerido'),
      otherwise: schema => schema
    }),
  });
  
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched,
    resetForm,
    setValues,
    setFieldValue
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async values => {
      // Prepara el objeto para Supabase (sin el campo 'type')
      const { type, ...rest } = values;
      // Convierte los campos numéricos vacíos a null y los demás a número
      const parseIntOrNull = v => v === '' ? null : parseInt(v, 10);
      const parseFloatOrNull = v => v === '' ? null : parseFloat(v);
      const record = {
        ...rest,
        incomes: values.type === 'ingreso',
        expenditures: values.type === 'egreso',
        amount: parseFloatOrNull(values.amount),
        accounts_id: parseIntOrNull(values.accounts_id),
        sites_id: parseIntOrNull(values.sites_id),
        types_income_id: parseIntOrNull(values.types_income_id),
        type_expenditure_id: parseIntOrNull(values.type_expenditure_id),
      };
      
      try {
        let error;
        if (edit && data && data.id) {
          // Actualizar registro existente
          ({ error } = await supabase.from('financial').update(record).eq('id', data.id));
          if (!error) {
            setNotification({
              open: true,
              message: 'Registro actualizado exitosamente',
              severity: 'success'
            });
          }
        } else {
          // Insertar nuevo registro
          ({ error } = await supabase.from('financial').insert([record]));
          if (!error) {
            setNotification({
              open: true,
              message: 'Registro creado exitosamente',
              severity: 'success'
            });
          }
        }
        
        if (!error) {
          if (onSave) onSave();
          resetForm();
          // Cerramos después de un breve delay para permitir ver la notificación
          setTimeout(() => {
            onClose();
          }, 500);
        } else {
          setNotification({
            open: true,
            message: 'Error al guardar: ' + error.message,
            severity: 'error'
          });
        }
      } catch (err) {
        setNotification({
          open: true,
          message: 'Error inesperado: ' + err.message,
          severity: 'error'
        });
      }
    }
  });
  
  // Efecto para monitorear cambios en datos de edición
  useEffect(() => {
    if (edit && data) {
      console.log('Editando registro:', data);
      console.log('Tipo determinado:', determineType());
    }
  }, [edit, data]);
  
  return <StyledAppModal open={open} handleClose={onClose}>
      <H6 fontSize={18} mb={2}>
        {edit ? 'Editar movimiento' : 'Agregar movimiento'}
      </H6>

      <form onSubmit={handleSubmit}>
        <Scrollbar style={{ maxHeight: 400 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                size="small"
                name="type"
                label="Tipo"
                value={values.type}
                onChange={(e) => {
                  // Limpiar el campo del otro tipo cuando se cambia
                  const newType = e.target.value;
                  if (newType === 'ingreso') {
                    setValues({
                      ...values,
                      type: newType,
                      type_expenditure_id: '' // Limpiar tipo de egreso
                    });
                  } else {
                    setValues({
                      ...values,
                      type: newType,
                      types_income_id: '' // Limpiar tipo de ingreso
                    });
                  }
                }}
                error={Boolean(errors.type && touched.type)}
                helperText={touched.type && errors.type}
                SelectProps={{ native: true }}
              >
                <option value="ingreso">Ingreso</option>
                <option value="egreso">Egreso</option>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                name="date"
                label="Fecha"
                type="date"
                value={values.date}
                onChange={handleChange}
                error={Boolean(errors.date && touched.date)}
                helperText={touched.date && errors.date}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                name="description"
                label="Descripción"
                value={values.description}
                onChange={handleChange}
                error={Boolean(errors.description && touched.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                name="amount"
                label="Monto"
                type="number"
                value={values.amount}
                onChange={handleChange}
                error={Boolean(errors.amount && touched.amount)}
                helperText={touched.amount && errors.amount}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                size="small"
                name="accounts_id"
                label="Cuenta"
                value={values.accounts_id}
                onChange={handleChange}
                error={Boolean(errors.accounts_id && touched.accounts_id)}
                helperText={touched.accounts_id && errors.accounts_id}
                SelectProps={{
                  native: true // Esto hace que funcione correctamente con las etiquetas <option>
                }}
              >
                <option value="">Selecciona una cuenta</option>
                {ACCOUNTS.map(acc => (
                  <option key={acc.id} value={acc.id}>{acc.name}</option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                size="small"
                name="sites_id"
                label="Sitio"
                value={values.sites_id}
                onChange={handleChange}
                error={Boolean(errors.sites_id && touched.sites_id)}
                helperText={touched.sites_id && errors.sites_id}
                SelectProps={{
                  native: true // Esto hace que funcione correctamente con las etiquetas <option>
                }}
              >
                <option value="">Selecciona un sitio</option>
                {SITES.map(site => (
                  <option key={site.id} value={site.id}>{site.name}</option>
                ))}
              </TextField>
            </Grid>
            {values.type === 'ingreso' && (
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="types_income_id"
                  label="Tipo de Ingreso"
                  value={values.types_income_id}
                  onChange={handleChange}
                  error={Boolean(errors.types_income_id && touched.types_income_id)}
                  helperText={touched.types_income_id && errors.types_income_id}
                  SelectProps={{
                    native: true // Esto hace que funcione correctamente con las etiquetas <option>
                  }}
                >
                  <option value="">Selecciona un tipo</option>
                  {TYPES_INCOME.map(tipo => (
                    <option key={tipo.id} value={tipo.id}>{tipo.name}</option>
                  ))}
                </TextField>
              </Grid>
            )}
            {values.type === 'egreso' && (
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  name="type_expenditure_id"
                  label="Tipo de Egreso"
                  value={values.type_expenditure_id}
                  onChange={handleChange}
                  error={Boolean(errors.type_expenditure_id && touched.type_expenditure_id)}
                  helperText={touched.type_expenditure_id && errors.type_expenditure_id}
                  SelectProps={{
                    native: true // Esto hace que funcione correctamente con las etiquetas <option>
                  }}
                >
                  <option value="">Selecciona un tipo</option>
                  {TYPES_EXPENDITURES.map(tipo => (
                    <option key={tipo.id} value={tipo.id}>{tipo.name}</option>
                  ))}
                </TextField>
              </Grid>
            )}
          </Grid>
        </Scrollbar>
        <FlexBox justifyContent="flex-end" gap={2} marginTop={4}>
          <Button fullWidth variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <Button fullWidth type="submit" variant="contained">
            Guardar
          </Button>
        </FlexBox>
      </form>

      {/* Notificaciones */}
      <NotificationSnackbar 
        open={notification.open} 
        message={notification.message} 
        severity={notification.severity} 
        onClose={handleCloseNotification} 
      />
    </StyledAppModal>;
}
