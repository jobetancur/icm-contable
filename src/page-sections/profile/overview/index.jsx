import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack'; // CUSTOM COMPONENTS

import Posts from './posts';
import Teams from './teams';
import Skills from './skills';
import Hobbies from './Hobbies';
import Summery from './Summery';
import Portfolio from './portfolios';
import MyConnections from './my-connection';
import AdditionalDetails from './additional-details';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/firebaseContext';

export default function Overview() {

  const { user } = useContext(AuthContext);

  return <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <Stack spacing={3}>
            <Summery user={user}/>
            {/* <Skills /> */}
            <Teams />
            {/* <Hobbies /> */}
            {/* <Posts /> */}
            {/* <Portfolio /> */}
          </Stack>
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Stack spacing={3}>
            {/* <MyConnections /> */}
            <AdditionalDetails user={user}/>
          </Stack>
        </Grid>
      </Grid>
    </Box>;
}