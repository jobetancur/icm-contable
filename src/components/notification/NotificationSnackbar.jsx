import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

/**
 * Componente de notificaciones tipo Snackbar
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.open - Estado de apertura de la notificación
 * @param {Function} props.onClose - Función a ejecutar al cerrar
 * @param {string} props.message - Mensaje a mostrar
 * @param {'success'|'info'|'warning'|'error'} props.severity - Tipo de notificación
 */
export default function NotificationSnackbar({ open, onClose, message, severity = 'success' }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
