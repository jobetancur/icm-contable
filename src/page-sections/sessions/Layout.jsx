import { Fragment } from 'react'; // MUI

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider'; // CUSTOM COMPONENTS

import { H3, H6, Paragraph } from '@/components/typography';
import FlexRowAlign from '@/components/flexbox/FlexRowAlign'; // =========================================================================

// =========================================================================
export default function Layout({
  children,
  login
}) {
  return <Grid container height="100%">
      <Grid item md={6} xs={12}>
        <FlexRowAlign bgcolor="primary.main" height="100%">
          <Box color="white" p={6} maxWidth={620}>
            {login ? <H3 fontWeight={600}>¡Hola, bienvenido otra vez!</H3> : <Fragment>
                <Box width={80} alt="icm" component="img" src="/static/logo/icm-vida-nueva.png" />
              </Fragment>}

            <Box mt={2} mb={5}>
              <H6 fontSize={20} mb={1}>Estás en el sistema de gestión de ICM Vida Nueva</H6>
              <Paragraph>
                Un software de gestión de iglesias y ministerios que te ayudará a llevar un mejor control de tu congregación.
              </Paragraph>
            </Box>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <img src="/static/logo/icm-vida-nueva.png" alt="footer" 
                style={{ width: '190px' }}
              />
              <img src="/static/logo/logo-asambleas.png" alt="footer" 
                style={{ width: '202px', height: '51px' }}
              />
            </div>
          </Box>
        </FlexRowAlign>
      </Grid>

      <Grid item md={6} xs={12}>
        <FlexRowAlign bgcolor="background.paper" height="100%">
          {children}
        </FlexRowAlign>
      </Grid>
    </Grid>;
}