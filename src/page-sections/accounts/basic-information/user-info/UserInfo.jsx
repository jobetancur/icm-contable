import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress'; // MUI ICON COMPONENTS

import CameraAlt from '@mui/icons-material/CameraAlt';
import MoreHoriz from '@mui/icons-material/MoreHoriz'; // CUSTOM ICON COMPONENTS

import DateRange from '@/icons/DateRange';
import Bratislava from '@/icons/Bratislava';
import MapMarkerIcon from '@/icons/MapMarkerIcon'; // CUSTOM COMPONENTS

import InfoItem from './InfoItem';
import AvatarBadge from '@/components/avatar-badge';
import AvatarLoading from '@/components/avatar-loading';
import { FlexBetween, FlexBox } from '@/components/flexbox';
import { H6, Paragraph, Small } from '@/components/typography'; // STYLED COMPONENTS
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/firebaseContext';

import { ProgressWrapper, ContentWrapper } from '../styles';
import { uploadAvatar } from '@/utils/firebaseFunctions';
export default function UserInfo() {

  const {user} = useContext(AuthContext);

  const [avatar, setAvatar] = useState(user.avatar);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const date = new Date(user.birthday.seconds * 1000);

  const birthday = date.toLocaleDateString('es-Es', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    const newUrl = await uploadAvatar(file, user);
    setAvatarUrl(newUrl);
  };

  useEffect(() => {
    if (avatarUrl) {
      setAvatar(avatarUrl);
    }
  }, [avatarUrl]);

  return <ContentWrapper>
      <FlexBox justifyContent="center">
      <AvatarBadge badgeContent={<label htmlFor="icon-button-file">
              <input onChange={handleImageFileChange} type="file" accept="image/*" id="icon-button-file" style={{
          display: 'none'
        }} />

              <IconButton aria-label="upload picture" component="span">
                <CameraAlt sx={{
            fontSize: 16,
            color: 'grey.400'
          }} />
              </IconButton>
            </label>}>
          <div>
            {avatar ? <img src={avatar} alt="avatar" style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
            }} /> : <AvatarLoading />}
          </div>
        </AvatarBadge>
      </FlexBox>

      <Box mt={2}>
        <H6 fontSize={18} textAlign="center">
          {user.firstName} {user.lastName}
        </H6>

        <FlexBetween maxWidth={360} flexWrap="wrap" margin="auto" mt={1}>
          <InfoItem Icon={Bratislava} title={user.function} />
          <InfoItem Icon={MapMarkerIcon} title={user.site} />
          <InfoItem Icon={DateRange} title={birthday} />
        </FlexBetween>
      </Box>
    </ContentWrapper>;
}