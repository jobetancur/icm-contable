import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled"; // MUI ICON COMPONENT

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import * as Yup from "yup";
import { Field, useFormik } from "formik"; // CUSTOM COMPONENTS

import { Paragraph, Small } from "@/components/typography"; // CUSTOM UTILS METHOD

import { isDark } from "@/utils/constants"; // STYLED COMPONENTS
import { KeyboardArrowDown } from "@mui/icons-material";
import { Typography } from "@mui/material";
// Create User Function
import { createUser, createAvatar } from '@/utils/firebaseFunctions';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SwitchWrapper = styled("div")({
  width: "100%",
  marginTop: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
const StyledCard = styled(Card)({
  padding: 24,
  minHeight: 400,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});
const ButtonWrapper = styled("div")(({ theme }) => ({
  width: 100,
  height: 100,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.grey[isDark(theme) ? 700 : 100],
}));
const UploadButton = styled("div")(({ theme }) => ({
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.grey[isDark(theme) ? 600 : 200],
  border: `1px solid ${theme.palette.background.paper}`,
}));
export default function AddNewUserPageView() {

  const [avatar, setAvatar] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    const newUrl = await createAvatar(file);
    setAvatarUrl(newUrl);
  };
  
  useEffect(() => {
    if (avatarUrl) {
      setAvatar(avatarUrl);
    }
  }, [avatarUrl]);

  console.log(avatar);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    profile: "",
    attendsSince: "",
    birthday: "",
    avatar: avatar,
    role: "",
    baptized: false,
    department: "",
    document: "",
    function: "",
    gender: "",
    level: "",
    maritalStatus: "",
    mentor: "",
    site: "",
    training: "",
    neighborhood: "",
  };
  const validationSchema = Yup.object().shape({
    // Validaciones en español
    firstName: Yup.string().required("Nombre es requerido"),
    lastName: Yup.string().required("Apellido es requerido"),
    email: Yup.string()
      .email("Debe ingresar un email valido")
      .required("Email es requerido"),
    phone: Yup.string().required("Celular es requerido"),
    role: Yup.string().required("Rol es requerido"),
    department: Yup.string().required("Ministerio es requerido"),
    function: Yup.string().required("Función es requerida"),
    site: Yup.string().required("Sede es requerida"),
    training: Yup.string().required("Formación es requerida"),
    level: Yup.string().required("Nivel de formación es requerido"),
    mentor: Yup.string().required("Mentor es requerido"),
    baptized: Yup.boolean().required("Bautizado es requerido"),
    birthday: Yup.string()
    .nullable() // Permite valores nulos
    .matches(
      /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/, // Formato DD/MM/YYYY
      'Fecha de nacimiento no válida (DD/MM/YYYY) Ejemplo: 01/01/2000'
    ),
    attendsSince: Yup.string()
    .nullable() // Permite valores nulos
    .matches(
      /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/, // Formato DD/MM/YYYY
      'Fecha de asistencia no válida (DD/MM/YYYY) Ejemplo: 01/01/2002'
    ),
  });
  const { 
    values, 
    errors, 
    handleChange, 
    handleBlur, 
    handleSubmit, 
    touched
  } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        values.avatar = avatar;
        await createUser(values);
        toast.success('Usuario creado correctamente.');
        resetForm();
        setAvatarUrl('');
        setAvatar('');
      } catch (error) {
        if (error.message === 'El email ya está registrado') {
          toast.error('Email already registered');
        } else {
          toast.error('Error creating user');
        }
      } finally {
        setSubmitting(false);
      }
    },
    });
  return (
    <div className="pt-2 pb-4">
      <Toaster position="top-right" reverseOrder={false} />
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <StyledCard>
            <ButtonWrapper>
              <UploadButton>
                <label htmlFor="upload-btn">
                  <input accept="image/*" id="upload-btn" type="file" onChange={handleImageFileChange} style={{
                  display: 'none'
                }} />
                  {
                  avatar ? <img src={avatar} alt="avatar" style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%'
                  }} /> : <IconButton aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                  }
                </label>
              </UploadButton>
            </ButtonWrapper>

            <Paragraph
              marginTop={2}
              maxWidth={200}
              display="block"
              textAlign="center"
              color="text.secondary"
            >
              Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
            </Paragraph>

            <Box maxWidth={250} marginTop={5} marginBottom={1}>
              <SwitchWrapper>
                {/* <Paragraph display="block" fontWeight={600}>
                  Public Profile
                </Paragraph>

                <Switch defaultChecked /> */}
              </SwitchWrapper>

              <SwitchWrapper>
                {/* <Paragraph display="block" fontWeight={600}>
                  Banned
                </Paragraph>
                <Switch defaultChecked /> */}
              </SwitchWrapper>

              {/* <Small display="block" color="text.secondary">
                Apply disable account
              </Small>

              <SwitchWrapper>
                <Paragraph display="block" fontWeight={600}>
                  Email Verified
                </Paragraph>

                <Switch defaultChecked />
              </SwitchWrapper> */}

              {/* <Small display="block" color="text.secondary">
                Disabling this will automatically send the user a verification email
              </Small> */}
            </Box>
          </StyledCard>
        </Grid>

        <Grid item md={8} xs={12}>
          <Card className="p-3">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="firstName"
                    label="Nombre"
                    value={values.firstName}
                    onChange={handleChange}
                    helperText={touched.firstName && errors.firstName}
                    error={Boolean(touched.firstName && errors.firstName)}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="lastName"
                    label="Apellido"
                    value={values.lastName}
                    onChange={handleChange}
                    helperText={touched.lastName && errors.lastName}
                    error={Boolean(touched.lastName && errors.lastName)}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="document"
                    label="Cédula"
                    value={values.document}
                    onChange={handleChange}
                    helperText={touched.document && errors.document}
                    error={Boolean(touched.document && errors.document)}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    helperText={touched.email && errors.email}
                    error={Boolean(touched.email && errors.email)}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="phone"
                    label="Celular"
                    value={values.phone}
                    onChange={handleChange}
                    helperText={touched.phone && errors.phone}
                    error={Boolean(touched.phone && errors.phone)}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="maritalStatus"
                    label="Estado Civil"
                    variant="outlined"
                    placeholder="Estado Civil"
                    SelectProps={{
                      native: true,
                      IconComponent: KeyboardArrowDown,
                    }}
                    value={values.maritalStatus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.maritalStatus && errors.maritalStatus}
                    error={Boolean(touched.maritalStatus && errors.maritalStatus)}
                  >
                    <option value=""></option>
                    <option value="soltero">Soltero</option>
                    <option value="casado">Casado</option>
                    <option value="divorciado">Divorciado</option>
                    <option value="viudo">Viudo</option>
                    <option value="union-libre">Unión libre</option>
                    <option value="re-casado">Re-Casado</option>
                  </TextField>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="address"
                    label="Dirección"
                    value={values.address}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="neighborhood"
                    label="Barrio"
                    value={values.neighborhood}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="attendsSince"
                    label="Asiste desde"
                    value={values.attendsSince}
                    onChange={handleChange}
                    helperText={touched.attendsSince && errors.attendsSince}
                    error={Boolean(touched.attendsSince && errors.attendsSince)}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="birthday"
                    label="Fecha de nacimiento"
                    value={values.birthday}
                    onChange={handleChange}
                    helperText={touched.birthday && errors.birthday}
                    error={Boolean(touched.birthday && errors.birthday)}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="role"
                    label="Role"
                    variant="outlined"
                    placeholder="Role"
                    SelectProps={{
                      native: true,
                      IconComponent: KeyboardArrowDown,
                    }}
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.role && errors.role}
                    error={Boolean(touched.role && errors.role)}
                  >
                    <option value=""></option>
                    <option value="admin-pajarito">Admin Pajarito</option>
                    <option value="admin-san-pedro">Admin San Pedro</option>
                    <option value="admin-pedregal-bajo">Admin Pedregal Bajo</option>
                    <option value="super-admin">Super Admin</option>
                    <option value="financial-pajarito">Financiero Pajarito</option>
                    <option value="financial-san-pedro">Financiero San Pedro</option>
                    <option value="financial-pedregal-bajo">Financiero Pedregal Bajo</option>
                    <option value="lider">Líder</option>
                    <option value="user">Usuario</option>
                  </TextField>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="department"
                    label="Ministerio Principal"
                    variant="outlined"
                    placeholder="Ministerio Principal"
                    SelectProps={{
                      native: true,
                      IconComponent: KeyboardArrowDown,
                    }}
                    value={values.department}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.department && errors.department}
                    error={Boolean(touched.department && errors.department)}
                  >
                    <option value=""></option>
                    <option value="enseñanza">Enseñanza</option>
                    <option value="jovenes">Jovenes</option>
                    <option value="adulto-mayor">Adulto Mayor</option>
                    <option value="adolescentes">Adolescentes</option>
                    <option value="niños">Niños</option>
                    <option value="alabanza">Alabanza</option>
                    <option value="evangelismo">Evangelismo</option>
                    <option value="general">General</option>
                    <option value="diaconos">Diáconos</option>
                    <option value="administracion">Administración</option>
                    <option value="comunicacion">Comunicación</option>
                    <option value="logistica">Logística</option>
                    <option value="misiones">Misiones</option>
                    <option value="oracion">Oración</option>
                    <option value="visitas">Visitas</option>
                    <option value="na">No aplica</option>
                  </TextField>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="function"
                    label="Función"
                    variant="outlined"
                    placeholder="Función"
                    SelectProps={{
                      native: true,
                      IconComponent: KeyboardArrowDown,
                    }}
                    value={values.function}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.function && errors.function}
                    error={Boolean(touched.function && errors.function)}
                  >
                    <option value=""></option>
                    <option value="lider">Líder</option>
                    <option value="pastor">Pastor</option>
                    <option value="miembro">Miembro</option>
                    <option value="visitante">Visitante</option>
                    <option value="na">No aplica</option>
                  </TextField>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="site"
                    label="Sede"
                    variant="outlined"
                    placeholder="Sede"
                    SelectProps={{
                      native: true,
                      IconComponent: KeyboardArrowDown,
                    }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.site}
                    helperText={touched.site && errors.site}
                    error={Boolean(touched.site && errors.site)}
                  >
                    <option value=""></option>
                    <option value="pajarito">Pajarito</option>
                    <option value="san-pedro">San Pedro</option>
                    <option value="pedregal-bajo">Pedregal Bajo</option>
                  </TextField>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="training"
                    label="Formación"
                    variant="outlined"
                    placeholder="Formación"
                    SelectProps={{
                      native: true,
                      IconComponent: KeyboardArrowDown,
                    }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.training}
                    helperText={touched.training && errors.training}
                    error={Boolean(touched.training && errors.training)}
                  >
                    <option value=""></option>
                    <option value="escuela-global">Escuela de liderazgo Global</option>
                    <option value="seminario">Seminario Bíblico</option>
                    <option value="discipulado">Discipulado en iglesia</option>
                    <option value="isum">ISUM</option>
                    <option value="global-university">Global University</option>
                    <option value="ninguno">Ninguno</option>
                  </TextField>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="level"
                    label="Nivel de formación"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.level}
                    helperText={touched.level && errors.level}
                    error={Boolean(touched.level && errors.level)}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="baptized"
                    label="Bautizado"
                    variant="outlined"
                    placeholder="Bautizado"
                    SelectProps={{
                      native: true,
                      IconComponent: KeyboardArrowDown,
                    }}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.baptized}
                    helperText={touched.baptized && errors.baptized}
                    error={Boolean(touched.baptized && errors.baptized)}
                  >
                    <option value="true">Si</option>
                    <option value="false">No</option>
                  </TextField>
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullWidth
                    name="mentor"
                    label="Mentor"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.mentor}
                    helperText={touched.mentor && errors.mentor}
                    error={Boolean(touched.mentor && errors.mentor)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained">
                    Crear usuario
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
