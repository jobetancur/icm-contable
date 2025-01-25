import { Fragment, useState } from 'react'; // MUI

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
// CUSTOM COMPONENTS
import { H5 } from '@/components/typography';
import FlexBox from '@/components/flexbox/FlexBox'; // CUSTOM PAGE SECTION COMPONENTS

import TabComponent from '@/page-sections/accounts'; // CUSTOM ICON COMPONENTS
import Apps from '@/icons/Apps';
import Icons from '@/icons/account'; // STYLED COMPONENTS

import { StyledButton } from '../styles';
export default function AccountsPageView() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [active, setActive] = useState('Información de usuario');
  const downMd = useMediaQuery(theme => theme.breakpoints.down('md')); // HANDLE LIST ITEM ON CLICK

  const handleListItemBtn = name => () => {
    setActive(name);
    setOpenDrawer(false);
  }; // SIDEBAR LIST CONTENT


  const TabListContent = <FlexBox flexDirection="column">
      {tabList.map(({
      id,
      name,
      Icon
    }) => <StyledButton key={id} variant="text" startIcon={<Icon />} active={active === name} onClick={handleListItemBtn(name)}>
          {name}
        </StyledButton>)}
    </FlexBox>;
  return <div className="pt-2 pb-4">
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          {downMd ? <Fragment>
              <FlexBox alignItems="center" gap={1} onClick={() => setOpenDrawer(true)}>
                <IconButton sx={{
              padding: 0
            }}>
                  <Apps sx={{
                color: 'text.primary'
              }} />
                </IconButton>

                <H5 fontSize={16}>More</H5>
              </FlexBox>

              <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <Box padding={1}>{TabListContent}</Box>
              </Drawer>
            </Fragment> : <Card sx={{
          p: '1rem 0'
        }}>{TabListContent}</Card>}
        </Grid>

        <Grid item md={9} xs={12}>
          {active === tabList[0].name && <TabComponent.BasicInformation />}
          {active === tabList[1].name && <TabComponent.Password />}
        </Grid>
      </Grid>
    </div>;
}
const tabList = [{
  id: 1,
  name: 'Información de usuario',
  Icon: Icons.UserOutlined
}, {
  id: 2,
  name: 'Contraseña',
  Icon: Icons.LockOutlined
},
];