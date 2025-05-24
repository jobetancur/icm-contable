import { useState, useEffect } from 'react'; // MUI ICON COMPONENT

import Add from '@mui/icons-material/Add'; // MUI

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import styled from '@mui/material/styles/styled';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // CUSTOM COMPONENTS

import Modal from '@/components/modal';
import Dropzone from '@/components/dropzone'; // STYLED COMPONENT

const StyledAppModal = styled(Modal)(({
  theme
}) => ({
  '& .add-btn': {
    border: `1px solid ${theme.palette.divider}`
  },
  '& .label': {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 8,
    display: 'block'
  },
  '& .btn-group': {
    gap: '1rem',
    display: 'flex',
    paddingTop: '1.5rem'
  }
})); // ==============================================================

// ==============================================================
export default function ProjectForm({
  open,
  handleClose,
  createProject,
  updateProject,
  pastorals = [],
  editMode = false,
  currentProject = null
}) {
  const [formData, setFormData] = useState({
    name: '',
    pastoralId: '',
    progress: 0,
    status: '',
    description: '',
    sitesId: ''
  });
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode && currentProject) {
      setFormData({
        id: currentProject.id,
        name: currentProject.name,
        pastoralId: currentProject.pastoralId,
        progress: currentProject.progress || 0,
        status: currentProject.status || '',
        description: currentProject.description || '',
        sitesId: currentProject.sitesId || ''
      });
    } else {
      setFormData({ name: '', pastoralId: '', progress: 0, status: '', description: '', sitesId: '' });
    }
  }, [editMode, currentProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (_, newValue) => {
    setFormData(prev => ({ ...prev, progress: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editMode) {
      await updateProject(formData);
    } else {
      await createProject(formData);
    }
    setLoading(false);
    handleClose();
  };

  // Opciones de status y site
  const STATUS_OPTIONS = [
    'En ejecución',
    'Finalizado',
    'Bloqueado',
    'Pendiente'
  ];
  const SITE_OPTIONS = [
    { value: 1, label: 'San Pedro' },
    { value: 2, label: 'Pajarito' },
    { value: 3, label: 'Pedregal Bajo' }
  ];

  return <StyledAppModal open={open} handleClose={handleClose}>
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <div>
          <p className="label">Nombre del Proyecto</p>
          <TextField fullWidth size="small" placeholder="Nombre del proyecto" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <p className="label">Pastoral</p>
          <FormControl fullWidth size="small">
            <InputLabel id="pastoral-select-label">Pastoral</InputLabel>
            <Select
              labelId="pastoral-select-label"
              id="pastoral-select"
              name="pastoralId"
              value={formData.pastoralId}
              label="Pastoral"
              onChange={handleChange}
              required
            >
              {pastorals.map((pastoral) => (
                <MenuItem key={pastoral.id} value={pastoral.id}>{pastoral.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <p className="label">Estado</p>
          <FormControl fullWidth size="small">
            <InputLabel id="status-select-label">Estado</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              name="status"
              value={formData.status}
              label="Estado"
              onChange={handleChange}
              required
            >
              {STATUS_OPTIONS.map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <p className="label">Sede</p>
          <FormControl fullWidth size="small">
            <InputLabel id="site-select-label">Sede</InputLabel>
            <Select
              labelId="site-select-label"
              id="site-select"
              name="sitesId"
              value={formData.sitesId}
              label="Sede"
              onChange={handleChange}
              required
            >
              {SITE_OPTIONS.map((site) => (
                <MenuItem key={site.value} value={site.value}>{site.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <p className="label">Descripción</p>
          <TextField
            fullWidth
            size="small"
            placeholder="Descripción del proyecto"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            minRows={2}
            maxRows={5}
            required
          />
        </div>
        <div>
          <p className="label">Progreso (%)</p>
          <Stack spacing={2} direction="row" alignItems="center">
            <Slider value={formData.progress} onChange={handleSliderChange} aria-labelledby="progress-slider" valueLabelDisplay="auto" min={0} max={100} />
            <Typography>{formData.progress}%</Typography>
          </Stack>
        </div>
        <div className="btn-group">
          <Button variant="contained" fullWidth type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : editMode ? 'Actualizar' : 'Crear'}
          </Button>
          <Button variant="outlined" fullWidth onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
        </div>
      </Stack>
    </form>
  </StyledAppModal>;
}