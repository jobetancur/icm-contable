import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Sistema de notificaciones global
let notifyFunction = null;

// Función para mostrar notificaciones desde cualquier parte de la app
export const notify = (message, severity = 'success', duration = 4000) => {
  if (notifyFunction) {
    notifyFunction(message, severity, duration);
  }
};

export default function GlobalNotification() {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
    duration: 4000
  });

  useEffect(() => {
    // Registrar la función de notificación globalmente
    notifyFunction = (message, severity, duration) => {
      setNotification({
        open: true,
        message,
        severity,
        duration
      });
    };

    return () => {
      notifyFunction = null;
    };
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  // Usar un portal para renderizar fuera de la jerarquía del DOM
  return createPortal(
    <Snackbar
      open={notification.open}
      autoHideDuration={notification.duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ zIndex: 9999 }} // Asegurar que esté por encima de todo
    >
      <Alert 
        onClose={handleClose} 
        severity={notification.severity} 
        variant="filled"
        sx={{ width: '100%' }}
      >
        {notification.message}
      </Alert>
    </Snackbar>,
    document.body
  );
}
