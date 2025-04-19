import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // MUI ICON COMPONENT

import CameraAlt from "@mui/icons-material/CameraAlt";
import * as Yup from "yup";
import { useFormik } from "formik"; // CUSTOM COMPONENTS

import { H5 } from "@/components/typography";
import AvatarBadge from "@/components/avatar-badge"; // ==========================================================================
import { KeyboardArrowDown } from "@mui/icons-material";

// ==========================================================================
export default function AddContactForm({ handleCancel, data }) {
  const initialValues = {
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    email: data?.email || "",
    phone: data?.phone || "",
    address: data?.address || "",
    attendsSince: data?.attendsSince || "",
    avatar: data?.avatar || "",
    baptized: data?.baptized || false,
    birthday: data?.birthday || "",
    city: data?.city || "",
    department: data?.department || "",
    document: data?.document || "",
    function: data?.function || "",
    gender: data?.gender || "",
    level: data?.level || "",
    maritalStatus: data?.maritalStatus || "",
    mentor: data?.mentor || "",
    neighborhood: data?.neighborhood || "",
    profile: data?.profile || "",
    role: data?.role || "",
    site: data?.site || "",
    training: data?.training || "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("El primer nombre es requerido"),
    lastName: Yup.string().required("El apellido es requerido"),
    email: Yup.string().email("Email inválido").required("El email es requerido"),
    phone: Yup.string().required("El teléfono es requerido"),
    address: Yup.string().required("La dirección es requerida"),
    city: Yup.string().required("La ciudad es requerida"),
    department: Yup.string().required("El ministerio es requerido"),
    document: Yup.string().required("El número de documento es requerido"),
    function: Yup.string().required("La función es requerida"),
  });
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => console.log(values),
  });
  return (
    <div>
      <H5 fontSize={16} mb={4}>
        Editar Usuario
      </H5>

      <form onSubmit={handleSubmit}>
        <Stack direction="row" justifyContent="center" mb={6}>
          <AvatarBadge
            badgeContent={
              <label htmlFor="icon-button-file">
                <input
                  type="file"
                  accept="image/*"
                  id="icon-button-file"
                  style={{
                    display: "none",
                  }}
                />

                <IconButton aria-label="upload picture" component="span">
                  <CameraAlt
                    sx={{
                      fontSize: 16,
                      color: "background.paper",
                    }}
                  />
                </IconButton>
              </label>
            }
          >
            <Avatar
              src={data?.avatar || "/static/avatar/001-man.svg"}
              sx={{
                width: 80,
                height: 80,
                backgroundColor: "grey.100",
              }}
            />
          </AvatarBadge>
        </Stack>

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
              error={Boolean(touched.maritalStatus && errors.maritalStatus)}
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
              error={Boolean(touched.department && errors.department)}
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
        </Grid>

        <Stack direction="row" alignItems="center" spacing={1} mt={4}>
          <Button type="submit" size="small">
            Save
          </Button>

          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </div>
  );
}
