import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import StatusFilter from '../StatusFilter';
import SearchFilter from '../SearchFilter';
import ProjectForm from '../project-form';
import ProjectCard1 from '../project-card-1';
import useProjects from '../useProjects';

export default function ProjectVersionOnePageView() {
  const {
    FILTERED_PROJECTS,
    filters,
    openModal,
    editMode,
    currentProject,
    pastorals,
    loading,
    handleChangeFilter,
    handleCloseModal,
    handleOpenModal,
    createProject,
    updateProject,
    deleteProject,
    projects
  } = useProjects();
  return <div className="pt-2 pb-4">
      <StatusFilter value={filters.status} handleChange={value => handleChangeFilter('status', value)} projects={projects} />
      <SearchFilter handleOpenModal={() => handleOpenModal()} handleChange={value => handleChangeFilter('searchValue', value)} />
      <ProjectForm 
        open={openModal} 
        handleClose={handleCloseModal} 
        createProject={createProject}
        updateProject={updateProject}
        pastorals={pastorals}
        editMode={editMode}
        currentProject={currentProject}
      />
      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {FILTERED_PROJECTS.map(project => (
            <Grid item xs={12} sm={6} lg={4} key={project.id}>
              <ProjectCard1 
                project={project} 
                onEdit={handleOpenModal}
                onDelete={deleteProject}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>;
}