import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import useTheme from '@mui/material/styles/useTheme'; // CUSTOM COMPONENTS

import ListItem from './ListItem';
import { H6 } from '@/components/typography';
import MoreButton from '@/components/more-button';
import FlexBetween from '@/components/flexbox/FlexBetween'; // CUSTOM ICON COMPONENTS

import Globe from '@/icons/Globe';
import DateRange from '@/icons/DateRange';
import Education from '@/icons/Education';
import UserOutlined from '@/icons/UserOutlined';
import EmailOutlined from '@/icons/EmailOutlined';
import BriefcaseOutlined from '@/icons/BriefcaseOutlined';

export default function AdditionalDetails({ user }) {

  const date = new Date(user.attendsSince.seconds * 1000);

  const attendsSince = date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const theme = useTheme();
  return <Card className="p-3">
      <FlexBetween>
        <H6 fontSize={16}>Detalles adicionales</H6>
        <MoreButton size="small" />
      </FlexBetween>

      <Stack mt={3} spacing={2}>
        <ListItem title="Email" Icon={EmailOutlined} subTitle={user.email} color={theme.palette.grey[400]} />

        <ListItem Icon={Globe} title="Mentor" subTitle={user.mentor} color={theme.palette.primary.main} />

        <ListItem title="Estado civil" subTitle={user.maritalStatus} Icon={UserOutlined} color={theme.palette.warning[600]} />

        <ListItem Icon={DateRange} title="Asiste desde el" subTitle={attendsSince} color={theme.palette.success.main} />

        <ListItem title="¿Bautizado?" subTitle={user.baptized ? 'Sí' : 'No'} Icon={BriefcaseOutlined} color={theme.palette.error.main} />

        <ListItem Icon={Education} title="Formación" subTitle={user.training} color={theme.palette.warning.main} />
      </Stack>
    </Card>;
}