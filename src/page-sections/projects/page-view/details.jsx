import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/utils/supabaseClient';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import styled from '@mui/material/styles/styled';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { H6, Paragraph } from '@/components/typography';
import { FlexBetween } from '@/components/flexbox';

const Div = styled('div')({
  padding: '1.5rem'
});
const RightContentWrapper = styled('div')({
  gap: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '& .MuiPaper-root': {
    padding: '1.5rem'
  }
});

export default function ProjectDetails() {
  // const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state?.project;
  const [pastoral, setPastoral] = useState(null);
  const [loadingPastoral, setLoadingPastoral] = useState(true);

  useEffect(() => {
    if (project?.pastoralId) {
      fetchPastoral(project.pastoralId);
    }
  }, [project?.pastoralId]);

  const fetchPastoral = async (pastoralId) => {
    setLoadingPastoral(true);
    const { data, error } = await supabase
      .from('pastorals')
      .select('id, name, description')
      .eq('id', pastoralId)
      .single();
    if (!error && data) {
      setPastoral(data);
    }
    setLoadingPastoral(false);
  };

  if (!project) {
    return <Card sx={{ p: 3, textAlign: 'center' }}>
      <Paragraph>No se encontró información del proyecto.<br />Por favor, accede desde la lista de proyectos.</Paragraph>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard/projects/version-1')} sx={{ mt: 2 }}>
        Volver a Proyectos
      </Button>
    </Card>;
  }

  return (
    <div className="pt-2 pb-4">
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard/projects/version-1')}>
          Volver a Proyectos
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <Div>
              <FlexBetween>
                <H6 fontSize={22} mb={1}>{project.name}</H6>
                {project.pastoralName && (
                  <Chip label={project.pastoralName} color="primary" variant="outlined" />
                )}
              </FlexBetween>
              <Paragraph fontWeight={500} color="text.secondary" sx={{ mt: 2, mb: 2 }}>
                {project.description}
              </Paragraph>
            </Div>
            <Divider />
            <Div>
              <FlexBetween mb={1.5}>
                <Paragraph fontWeight={600}>Progreso del Proyecto</Paragraph>
                <Paragraph fontWeight={600}>{project.progress}%</Paragraph>
              </FlexBetween>
              <LinearProgress variant="determinate" value={project.progress || 0} sx={{ height: 10, borderRadius: 5 }} />
            </Div>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <RightContentWrapper>
            <Card>
              <Paragraph fontWeight={600}>Información de la Pastoral</Paragraph>
              <Box mt={2}>
                {loadingPastoral ? (
                  <CircularProgress size={24} />
                ) : pastoral ? (
                  <>
                    <Paragraph fontWeight={600}>{pastoral.name}</Paragraph>
                    <Paragraph fontSize={14} mt="2px" color="text.secondary">
                      {pastoral.description}
                    </Paragraph>
                  </>
                ) : (
                  <Paragraph color="text.secondary">No se encontró información de la pastoral.</Paragraph>
                )}
              </Box>
            </Card>
          </RightContentWrapper>
        </Grid>
      </Grid>
    </div>
  );
}