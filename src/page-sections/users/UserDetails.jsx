import { useState } from 'react'; // MUI

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import useTheme from '@mui/material/styles/useTheme';
import DeleteOutline from '@mui/icons-material/DeleteOutline'; // CUSTOM COMPONENTS

import Modal from '@/components/modal';
import AddContactForm from './AddContactForm';
import { TableMoreMenuItem } from '@/components/table';
import { H6, Paragraph } from '@/components/typography';
import FlexBetween from '@/components/flexbox/FlexBetween'; // CUSTOM ICON COMPONENTS

import Add from '@/icons/Add';
import Call from '@/icons/Call';
import City from '@/icons/City';
import Edit from '@/icons/Edit';
import Flag from '@/icons/Flag';
import User from '@/icons/User';
import Email from '@/icons/Email';
import Skype from '@/icons/social/Skype';
import ShareVs from '@/icons/ShareVs';
import Birthday from '@/icons/Birthday';
import Facebook from '@/icons/social/Facebook';
import Whatsapp from '@/icons/social/Whatsapp';
import Messenger from '@/icons/Messenger';
import MoreHorizontal from '@/icons/MoreHorizontal'; // CUSTOM UTILS METHOD

import { isDark } from '@/utils/constants'; // ==============================================================

// ==============================================================
export default function UserDetails({
  data
}) {
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => setOpenModal(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseMenu = () => setAnchorEl(null);

  console.log(data); 

  const attendsDate = new Date(data?.attendsSince.seconds * 1000);
  const attendsSince = attendsDate.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const birthdate = new Date(data?.birthday.seconds * 1000);
  const birthday = birthdate.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return <Box sx={{
    padding: 3,
    height: '100%',
    borderTopRightRadius: '1rem',
    borderBottomRightRadius: '1rem',
    backgroundColor: isDark(theme) ? 'grey.800' : 'grey.100'
  }}>
      <Button fullWidth variant="contained" startIcon={<Add />} onClick={() => setOpenModal(true)}>
        Add Contact
      </Button>

      <Modal open={openModal} handleClose={handleCloseModal}>
        <AddContactForm handleCancel={handleCloseModal} data={isEdit ? data : null} />
      </Modal>

      {data ? <>
          <FlexBetween mt={4}>
            <IconButton onClick={() => {
          setIsEdit(true);
          setOpenModal(true);
        }}>
              <Edit fontSize="small" sx={{
            color: 'text.secondary'
          }} />
            </IconButton>

            <IconButton sx={{
          backgroundColor: isDark(theme) ? 'grey.700' : 'white'
        }} onClick={e => setAnchorEl(e.currentTarget)}>
              <MoreHorizontal fontSize="small" sx={{
            color: 'text.secondary'
          }} />
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} transformOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}>
              <TableMoreMenuItem Icon={DeleteOutline} title="Delete" handleClick={() => handleCloseMenu()} />
            </Menu>
          </FlexBetween>

          <Stack alignItems="center">
            <Avatar src={data.avatar} sx={{
          width: 120,
          height: 120,
          backgroundColor: 'white'
        }} />
            <H6 fontSize={16} mt={2}>
              {data.name}
            </H6>

            <Paragraph color="text.secondary" mt={0.5}>
              {data.position}
            </Paragraph>
          </Stack>

          <Box mt={4}>
            <ListItem Icon={Birthday} title={birthday} />
            <ListItem Icon={User} title={data.gender === 'male' ? 'Hombre' : 'Mujer'} />
            <ListItem Icon={City} title={data.site} />
            <ListItem Icon={Email} title={data.email} />
            <ListItem Icon={Whatsapp} title={data.phone} />
            <ListItem Icon={ShareVs} title="http://carriepage.com" />
            <ListItem Icon={Flag} title="6956 Henderson Park" />
          </Box>

          <Box mt={2}>
            <ListItem Icon={Messenger} title={data.phone} />
            <ListItem Icon={Facebook} title="facebook-carrie-page" />
            <ListItem Icon={Skype} title="carrie-page" />
          </Box>
        </> : <Box height="100%" display="flex" alignItems="center" justifyContent="center" color="text.secondary">
          No Data
        </Box>}
    </Box>;
} // ===================================================================

// ===================================================================
function ListItem({
  Icon,
  title
}) {
  return <Stack direction="row" spacing={1.5} pb={2} alignItems="center">
      <Icon sx={{
      color: 'text.secondary',
      fontSize: 20
    }} />
      <Paragraph color="grey.500">{title}</Paragraph>
    </Stack>;
}