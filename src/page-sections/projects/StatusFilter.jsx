import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import styled from '@mui/material/styles/styled'; // CUSTOM COMPONENTS

import { H6, Paragraph } from '@/components/typography'; // CUSTOM DATA

const StyledRoot = styled(Card)({
  paddingTop: '1.5rem',
  paddingInline: '2rem',
  '& .MuiTabs-root': {
    borderBottom: 'none'
  }
}); // ==============================================================

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 'En ejecución', label: 'En ejecución' },
  { value: 'Pendiente', label: 'Pendiente' },
  { value: 'Finalizado', label: 'Finalizado' },
  { value: 'Bloqueado', label: 'Bloqueado' }
];

export default function StatusFilter({
  value,
  handleChange,
  projects = []
}) {
  console.log('value', value);
  console.log('projects', projects);

  return <StyledRoot>
      <H6 fontSize={20} mb={2}>
        Proyectos
      </H6>
      <TabContext value={value}>
        <TabList variant="scrollable" onChange={(_, value) => handleChange(value)}>
          {STATUS_OPTIONS.map(option => (
            <Tab
              disableRipple
              key={option.value}
              value={option.value}
              label={<Paragraph>{option.label} </Paragraph>}
            />
          ))}
        </TabList>
      </TabContext>
    </StyledRoot>;
}