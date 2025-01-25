import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled"; // MUI ICON COMPONENT
import { KeyboardArrowDown } from "@mui/icons-material"; // MUI ICON COMPONENT

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import * as Yup from "yup";
import { useFormik } from "formik"; // CUSTOM COMPONENTS

import { Paragraph, Small } from "@/components/typography"; // CUSTOM UTILS METHOD

import { isDark } from "@/utils/constants"; // STYLED COMPONENTS
import { useEffect, useState } from "react";
import { createAvatar, createUser } from "@/utils/firebaseFunctions";
import toast, { Toaster } from 'react-hot-toast';

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

  const initialValues = {
    firstName: "",
    lastName: "",
    baptized: null,
    birthday: "",
    department: "",
    document: "",
    function: "",
    gender: "",
    level: "",
    maritalStatus: "",
    mentor: "",
    profile: "",
    role: "",
    site: "",
    training: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    neighborhood: "",
    avatar: "",
    attendsSince: "",
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("El primer nombre es requerido"),
    lastName: Yup.string().required("El apellido es requerido"),
    email: Yup.string().email("El email es inválido").required("El email es requerido"),
    phone: Yup.string().required("El teléfono es requerido"),
    document: Yup.string().required("El número de documento es requerido"),
  });
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    touched
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        values.avatar = avatar;
        await createUser(values);
        toast.success('User Created Successfully!');
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
      <Toaster />
      <Grid container spacing={3}>
        <Grid item md={4} xs={12} maxHeight={200}>
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
              Permitido *.jpeg, *.jpg, *.png, *.gif peso máximo de 3.1 MB
            </Paragraph>
          </StyledCard>
        </Grid>

        <Grid item md={8} xs={12}>
          <Card className="p-3">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Primer Nombre"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Número de Documento"
                    name="document"
                    value={values.document}
                    onChange={handleChange}
                    error={Boolean(touched.document && errors.document)}
                    helperText={touched.document && errors.document}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="gender"
                    label="Género"
                    variant="outlined"
                    placeholder="Género"
                    SelectProps={{
                      native: true,
                      IconComponent: KeyboardArrowDown,
                    }}
                    onChange={handleChange}
                    value={values.gender || ""}
                    helperText={touched.gender && errors.gender}
                    error={Boolean(touched.gender && errors.gender)}
                  >
                    <option value=""></option>
                    <option value="male">Hombre</option>
                    <option value="famale">Mujer</option>
                  </TextField>
                </Grid>

                {/* Select tipo fecha para la fecha de nacimiento */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Fecha de Nacimiento"
                    name="birthday"
                    value={values.birthday}
                    onChange={handleChange}
                    error={Boolean(touched.birthday && errors.birthday)}
                    helperText={touched.birthday && errors.birthday}
                    InputLabelProps={{
                      shrink: true, // Hace que el label siempre se muestre en estado "shrink"
                    }}
                  />
                </Grid>

                {/* Selector desplegable para Marital Status*/}
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
                    onChange={handleChange}
                    value={values.maritalStatus || ""}
                    helperText={touched.maritalStatus && errors.maritalStatus}
                    error={Boolean(
                      touched.maritalStatus && errors.maritalStatus
                    )}
                  >
                    <option value=""></option>
                    <option value="single">Soltero</option>
                    <option value="married">Casado</option>
                    <option value="divorced">Divorciado</option>
                    <option value="widower">Viudo</option>
                    <option value="remarried">Casado de nuevo</option>
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Barrio"
                    name="neighborhood"
                    value={values.neighborhood}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Ciudad"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                  />
                </Grid>

                {/* Selector de ministerio de la iglesia (departmanet) principal en el que sirve */}
                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="department"
                    label="Ministerio principal"
                    variant="outlined"
                    placeholder="Ministerio Principal"
                    SelectProps={{
                      native: true,
                      IconComponent: KeyboardArrowDown,
                    }}
                    onChange={handleChange}
                    value={values.department || ""}
                    helperText={touched.department && errors.department}
                    error={Boolean(
                      touched.department && errors.department
                    )}
                  >
                    <option value=""></option>
                    <option value="worship">Alabanza</option>
                    <option value="sound">Sonido</option>
                    <option value="children">Niños</option>
                    <option value="youth">Jóvenes</option>
                    <option value="adolescents">Adolescentes</option>
                    <option value="preaching">Predicación</option>
                    <option value="teaching">Enseñanza</option>
                    <option value="intercession">Intercesión</option>
                    <option value="evangelism">Evangelismo</option>
                    <option value="administration">Administración</option>
                    <option value="communication">Comunicación</option>
                    <option value="usher">Ujier</option>
                    <option value="none">Ninguno</option>
                    <option value="other">Otro</option>
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Entrenamiento"
                    name="training"
                    value={values.training}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nivel de Entrenamiento"
                    name="level"
                    value={values.level}
                    onChange={handleChange}
                  />
                </Grid>

                {/* Selector de función que desempeña: líder, pastor, miembro */}
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
                    onChange={handleChange}
                    value={values.function || ""}
                    helperText={touched.function && errors.function}
                    error={Boolean(touched.function && errors.function)}
                  >
                    <option value=""></option>
                    <option value="leader">Líder</option>
                    <option value="pastor">Pastor</option>
                    <option value="member">Miembro</option>
                    <option valuer="visitor">Visitante</option>
                    <option value="other">Otro</option>
                  </TextField>
                </Grid>

                {/* Selector de role, predefinido como user y no editable */}
                <Grid item sm={6} xs={12}>
                  <TextField
                    select
                    fullWidth
                    name="role"
                    label="Rol"
                    variant="outlined"
                    placeholder="Rol"
                    SelectProps={{
                      shrink: true,
                      IconComponent: KeyboardArrowDown,
                    }}
                    onChange={handleChange}
                    value={values.role || "user"}
                    helperText={touched.role && errors.role}
                    error={Boolean(touched.role && errors.role)}
                    disabled
                  >
                    <option value="user">Usuario</option>
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Mentor"
                    name="mentor"
                    value={values.mentor}
                    onChange={handleChange}
                  />
                </Grid>

                {/* Selector de sede: pajarito, pedregal-bajo o san-pedro */}
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
                    onChange={handleChange}
                    value={values.site || ""}
                    helperText={touched.site && errors.site}
                    error={Boolean(touched.site && errors.site)}
                  >
                    <option value=""></option>
                    <option value="pajarito">Pajarito</option>
                    <option value="pedregal-bajo">Pedregal Bajo</option>
                    <option value="san-pedro">San Pedro</option>
                  </TextField>
                </Grid>

                {/* Input de fecha para seleccionar desde cuando asiste */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Asiste desde"
                    name="attendsSince"
                    value={values.attendsSince}
                    onChange={handleChange}
                    error={Boolean(touched.attendsSince && errors.attendsSince)}
                    helperText={touched.attendsSince && errors.attendsSince}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained">
                    Crear Usuario
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
