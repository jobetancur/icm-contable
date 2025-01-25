import { Fragment, useRef, useState } from 'react'; // MUI

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ButtonBase from '@mui/material/ButtonBase';
import styled from '@mui/material/styles/styled'; // CUSTOM COMPONENTS

import PopoverLayout from './PopoverLayout';
import FlexBox from '@/components/flexbox/FlexBox';
import AvatarLoading from '@/components/avatar-loading';
import { H6, Paragraph, Small } from '@/components/typography'; // CUSTOM DEFINED HOOK

import useAuth from '@/hooks/useAuth';
import useNavigate from '@/hooks/useNavigate'; // CUSTOM UTILS METHOD

import { isDark } from '@/utils/constants'; // STYLED COMPONENTS

import { useContext } from 'react';
import { AuthContext } from '@/contexts/firebaseContext';

const StyledButtonBase = styled(ButtonBase)(({
  theme
}) => ({
  marginLeft: 8,
  borderRadius: 30,
  border: `1px solid ${theme.palette.grey[isDark(theme) ? 800 : 200]}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));
const StyledSmall = styled(Paragraph)(({
  theme
}) => ({
  fontSize: 13,
  display: 'block',
  cursor: 'pointer',
  padding: '5px 1rem',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));
export default function ProfilePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {
    logout
  } = useAuth();

  const {user} = useContext(AuthContext);

  const handleMenuItem = path => () => {
    navigate(path);
    setOpen(false);
  };

  return <Fragment>
      <StyledButtonBase ref={anchorRef} onClick={() => setOpen(true)}>
        <AvatarLoading alt="user" percentage={100} src={user.avatar} sx={{
        width: 35,
        height: 35
      }} />
      </StyledButtonBase>

      <PopoverLayout hiddenViewButton maxWidth={230} minWidth={200} popoverOpen={open} anchorRef={anchorRef} popoverClose={() => setOpen(false)} title={<FlexBox alignItems="center" gap={1}>
            <Avatar src={user.avatar} sx={{
        width: 35,
        height: 35
      }} />

            <div>
              <H6 fontSize={14}>
                {user.firstName} {user.lastName}
              </H6>
              <Small color="text.secondary" display="block">
                {user.email}
              </Small>
            </div>
          </FlexBox>}>
        <Box pt={1}>
          {/* <StyledSmall onClick={handleMenuItem('/dashboard/profile')}>Set Status</StyledSmall> */}

          <StyledSmall onClick={handleMenuItem('/dashboard/profile')}>
            Perfil
          </StyledSmall>

          <StyledSmall onClick={handleMenuItem('/dashboard/account')}>
            Configuración
          </StyledSmall>

          {/* <StyledSmall onClick={handleMenuItem('/dashboard/profile')}>Manage Team</StyledSmall> */}

          <Divider sx={{
          my: 1
        }} />

          <StyledSmall onClick={logout}>Cerrar Sesión</StyledSmall>
        </Box>
      </PopoverLayout>
    </Fragment>;
}