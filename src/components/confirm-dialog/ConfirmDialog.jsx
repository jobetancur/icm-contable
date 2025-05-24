import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

/**
 * Diálogo de confirmación genérico
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.open - Estado de apertura del diálogo
 * @param {Function} props.onClose - Función a ejecutar al cancelar
 * @param {Function} props.onConfirm - Función a ejecutar al confirmar
 * @param {string} props.title - Título del diálogo
 * @param {string} props.message - Mensaje de confirmación
 * @param {string} props.confirmButtonText - Texto del botón de confirmación
 * @param {string} props.confirmButtonColor - Color del botón de confirmación
 */
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Confirmar acción',
  message = '¿Está seguro que desea continuar con esta acción?',
  confirmButtonText = 'Confirmar',
  confirmButtonColor = 'primary'
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color={confirmButtonColor} variant="contained" autoFocus>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
