// MUI ICON COMPONENTS
import MoreHoriz from '@mui/icons-material/MoreHoriz'; // MUI

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions'; // CUSTOM COMPONENTS

import Link from '@/components/link';
import FlexBetween from '@/components/flexbox/FlexBetween';
import { H6, Paragraph } from '@/components/typography';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { StyledRoot } from './styles'; // ==============================================================
import MoreButton from '@/components/more-button';

// ==============================================================
const TitleWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: 48,
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  paddingRight: theme.spacing(1),
}));

const StyledTitle = styled(H6)(({ theme }) => ({
  fontSize: 17,
  color: theme.palette.text.primary,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100%',
  fontWeight: 700,
}));

const InfoBlock = styled('div')(({ theme }) => ({
  margin: theme.spacing(1, 0),
  padding: theme.spacing(1.5, 1),
  background: theme.palette.grey[50],
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
}));

const StyledProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 6,
  background: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 6,
    background: theme.palette.primary.main,
  },
  marginTop: theme.spacing(1),
}));

const STATUS_COLORS = {
  'En ejecución': 'primary',
  'Finalizado': 'success',
  'Bloqueado': 'error',
  'Pendiente': 'warning',
  'Todos': 'default'
};
const SITE_NAMES = {
  1: 'San Pedro',
  2: 'Pajarito',
  3: 'Pedregal Bajo'
};
const SITE_COLORS = {
  1: '#e3f2fd', // San Pedro - azul claro
  2: '#fff3e0', // Pajarito - naranja claro
  3: '#e8f5e9'  // Pedregal Bajo - verde claro
};

export default function ProjectCard1({
  project,
  onEdit,
  onDelete
}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    handleMenuClose();
    if (onEdit) onEdit(project);
  };
  const handleDelete = () => {
    handleMenuClose();
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleConfirmDelete = async () => {
    setOpenDialog(false);
    try {
      await onDelete(project.id);
      setSnackbar({ open: true, message: 'Proyecto eliminado correctamente', severity: 'success' });
    } catch (e) {
      setSnackbar({ open: true, message: 'Error al eliminar el proyecto', severity: 'error' });
    }
  };
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleGoToDetails = () => {
    navigate('/dashboard/projects/details', { state: { project } });
  };
  return <StyledRoot sx={{
    background: '#fff',
    borderRadius: 3,
    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)',
    p: 2.5,
    minHeight: 240,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '1px solid #f0f0f0',
  }}>
      <FlexBetween mb={1}>
        <TitleWrapper>
          <span style={{ width: '100%', textDecoration: 'none', cursor: 'pointer' }} onClick={handleGoToDetails}>
            <StyledTitle title={project.name}>{project.name}</StyledTitle>
          </span>
        </TitleWrapper>
        <IconButton onClick={handleMenuOpen} size="small">
          <MoreHoriz />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleEdit}>Editar</MenuItem>
          <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
        </Menu>
      </FlexBetween>

      <FlexBetween mb={1}>
        {project.status && (
          <Chip label={project.status} color={STATUS_COLORS[project.status] || 'default'} size="small" sx={{ fontWeight: 600, mr: 1 }} />
        )}
        {project.sitesId && (
          <Chip 
            label={SITE_NAMES[project.sitesId] || `Sede ${project.sitesId}`}
            color="default"
            size="small"
            sx={{ 
              fontWeight: 600, 
              background: SITE_COLORS[project.sitesId] || '#f0f0f0',
              color: '#222',
              border: 'none'
            }}
          />
        )}
      </FlexBetween>

      <InfoBlock>
        <Paragraph fontWeight={500} color="text.secondary" sx={{ minHeight: 40, mb: 1, mt: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {project.description}
        </Paragraph>
        {project.pastoralName && (
          <Chip label={project.pastoralName} color="primary" size="small" sx={{ fontWeight: 600, mb: 1 }} />
        )}
      </InfoBlock>

      <InfoBlock sx={{ background: '#f8fafc' }}>
        <FlexBetween>
          <Paragraph fontWeight={600} color="text.secondary">Progreso</Paragraph>
          <Paragraph fontWeight={700} color="primary.main">{project.progress}%</Paragraph>
        </FlexBetween>
        <StyledProgress variant="determinate" value={project.progress || 0} />
      </InfoBlock>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>¿Eliminar proyecto?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el proyecto "{project.name}"? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </StyledRoot>;
}