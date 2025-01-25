import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button'; 
// CUSTOM COMPONENTS
import { Paragraph } from '@/components/typography';
import AvatarLoading from '@/components/avatar-loading';
import FlexRowAlign from '@/components/flexbox/FlexRowAlign';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/firebaseContext';

export default function UserAccount() {

  const { user } = useContext(AuthContext);

  return <FlexRowAlign flexDirection="column" py={5}>
      <Badge badgeContent="¡Hola!" color="primary">
        <AvatarLoading alt="user" percentage={100} src={user.avatar} sx={{
        width: 50,
        height: 50
      }} />
      </Badge>

      <Box textAlign="center" pt={1.5} pb={3}>
        {/* <Chip variant="outlined" label="60% Complete" size="small" /> */}

        <Paragraph fontSize={16} fontWeight={600} mt={2}>
          {user.firstName} {user.lastName}
        </Paragraph>

        <Paragraph fontSize={13} fontWeight={500} color="text.secondary" mt={0.5}>
          {user.email}
        </Paragraph>
      </Box>
    </FlexRowAlign>;
}