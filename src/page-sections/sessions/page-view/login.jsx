import { useState } from 'react'; // MUI

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import ButtonBase from '@mui/material/ButtonBase';
import LoadingButton from '@mui/lab/LoadingButton';
import styled from '@mui/material/styles/styled'; // MUI ICON COMPONENT

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import * as Yup from 'yup';
import { useFormik } from 'formik'; // CUSTOM DEFINED HOOK

import useAuth from '@/hooks/useAuth'; // CUSTOM LAYOUT COMPONENT

import Layout from '../Layout'; // CUSTOM COMPONENTS

import Link from '@/components/link';
import { H5, H6, Paragraph } from '@/components/typography';
import { FlexBetween, FlexBox } from '@/components/flexbox'; // CUSTOM ICON COMPONENTS
import toast, { Toaster } from 'react-hot-toast';

import Twitter from '@/icons/social/Twitter';
import Facebook from '@/icons/social/Facebook';
import GoogleIcon from '@/icons/GoogleIcon'; // STYLED COMPONENT

const StyledButton = styled(ButtonBase)(({
  theme
}) => ({
  padding: 12,
  borderRadius: 8,
  border: `1px solid ${theme.palette.divider}`
}));
export default function LoginPageView() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    signInWithEmail,
    signInWithGoogle
  } = useAuth();

  const handleGoogle = async () => {
    await signInWithGoogle();
  };

  const initialValues = {
    email: '',
    password: '',
    remember: true
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Debe ingresar un email valido').max(255).required('Email es requerido'),
    password: Yup.string().min(6, 'La contraseña debe contener mínimo 6 caracteres').required('Contraseña es requerida')
  });
  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      try {
        await signInWithEmail(values.email, values.password);
      } catch (error) {
        console.log(error);
        toast.error("Correo o contraseña incorrectos");
      }
    }
  });
  return <Layout login>
      <Toaster position="top-right" />
      <Box maxWidth={550} p={4}>
        <H5 fontSize={{
        sm: 30,
        xs: 25
      }}>Iniciar sesión</H5>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <H6 fontSize={16} mb={1.5} mt={1.5}>
                Ingresa con tu correo y contraseña
              </H6>

              <TextField fullWidth placeholder="Ingrese su email" name="email" onBlur={handleBlur} value={values.email} onChange={handleChange} helperText={touched.email && errors.email} error={Boolean(touched.email && errors.email)} />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth placeholder="Password" type={showPassword ? 'text' : 'password'} name="password" onBlur={handleBlur} value={values.password} onChange={handleChange} helperText={touched.password && errors.password} error={Boolean(touched.password && errors.password)} InputProps={{
              endAdornment: <ButtonBase disableRipple disableTouchRipple onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </ButtonBase>
            }} />

              <FlexBetween my={1}>
                <FlexBox alignItems="center" gap={1}>
                  <Checkbox sx={{
                  p: 0
                }} name="remember" value={values.remember} onChange={handleChange} checked={values.remember} />
                  <Paragraph fontWeight={500}> Recuérdame </Paragraph>
                </FlexBox>

                <Box fontSize={13} component={Link} fontWeight={500} color="error.500" href="/forget-password">
                  ¿Olvidaste tu contraseña?
                </Box>
              </FlexBetween>
            </Grid>

            <Grid item xs={12}>
              <LoadingButton loading={isSubmitting} type="submit" variant="contained" fullWidth>
                Iniciar sesión
              </LoadingButton>
            </Grid>
          </Grid>
        </form>

        <Divider sx={{
        my: 4,
        borderColor: 'grey.200',
        borderWidth: 1
      }}>
          {/* <Paragraph color="text.secondary" px={1}>
            OR
          </Paragraph> */}
        </Divider>

        {/* <FlexBox justifyContent="center" flexWrap="wrap" gap={2}>
          <StyledButton onClick={handleGoogle}>
            <GoogleIcon sx={{
            fontSize: 18
          }} />
          </StyledButton>

          <StyledButton>
            <Facebook sx={{
            color: '#2475EF',
            fontSize: 18
          }} />
          </StyledButton>

          <StyledButton>
            <Twitter sx={{
            color: '#45ABF7',
            fontSize: 18
          }} />
          </StyledButton>
        </FlexBox> */}
      </Box>
    </Layout>;
}