import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';

export default function useProjects() {
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [pastorals, setPastorals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    searchValue: ''
  });

  useEffect(() => {
    fetchProjects();
    fetchPastorals();
    const channel = supabase
      .channel('projects-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, fetchProjects)
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('id, project_name, execution, sites_id, pastorals_id, description, status')
      .order('id', { ascending: true });
    let pastoralsMap = {};
    if (pastorals.length > 0) {
      pastoralsMap = pastorals.reduce((acc, p) => { acc[p.id] = p.name; return acc; }, {});
    }
    if (!error) {
      setProjects(data.map(p => ({
        id: p.id,
        name: p.project_name,
        progress: Math.round((p.execution || 0) * 100),
        sitesId: p.sites_id,
        pastoralId: p.pastorals_id,
        pastoralName: pastoralsMap[p.pastorals_id] || '',
        description: p.description || '',
        status: p.status || 'pending' // Asegura que siempre haya un estado
      })));
    }
    setLoading(false);
  };

  // Modifica fetchPastorals para refrescar proyectos después de cargar pastorals
  const fetchPastorals = async () => {
    const { data, error } = await supabase
      .from('pastorals')
      .select('id, name')
      .order('id', { ascending: true });
    if (!error) {
      setPastorals(data);
      // Refresca proyectos para incluir el nombre de la pastoral
      setTimeout(fetchProjects, 0);
    }
  };

  const createProject = async (projectData) => {
    await supabase.from('projects').insert({
      project_name: projectData.name,
      execution: (projectData.progress || 0) / 100,
      sites_id: projectData.sitesId || projectData.site || 1,
      pastorals_id: projectData.pastoralId,
      description: projectData.description || '',
      status: projectData.status || 'Pendiente'
    });
  };

  const updateProject = async (projectData) => {
    await supabase.from('projects').update({
      project_name: projectData.name,
      execution: (projectData.progress || 0) / 100,
      sites_id: projectData.sitesId || projectData.site || 1,
      pastorals_id: projectData.pastoralId,
      description: projectData.description || '',
      status: projectData.status || 'Pendiente'
    }).eq('id', projectData.id);
  };

  const deleteProject = async (id) => {
    await supabase.from('projects').delete().eq('id', id);
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setCurrentProject(project);
      setEditMode(true);
    } else {
      setCurrentProject(null);
      setEditMode(false);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentProject(null);
    setEditMode(false);
  };

  const handleChangeFilter = (key, value) => {
    setFilters(state => ({ ...state, [key]: value }));
  };

  const FILTERED_PROJECTS = projects.filter(item =>
    (filters.status === 'all' || item.status === filters.status) &&
    item.name.toLowerCase().includes(filters.searchValue.toLowerCase())
  );

  return {
    FILTERED_PROJECTS,
    filters,
    openModal,
    editMode,
    currentProject,
    pastorals,
    loading,
    handleOpenModal,
    handleCloseModal,
    handleChangeFilter,
    createProject,
    updateProject,
    deleteProject
  };
}