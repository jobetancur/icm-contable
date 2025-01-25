import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import * as Yup from 'yup';
import { useFormik } from 'formik'; // CUSTOM COMPONENTS
import { H6 } from '@/components/typography';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/firebaseContext';
import { updateUser } from '@/utils/firebaseFunctions';
import toast, { Toaster } from 'react-hot-toast';

export default function InfoForm() {

  const { user } = useContext(AuthContext);

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    function: user.function,
    department: user.department,
    site: user.site,
    attendsSince: user.attendsSince,
    birthday: user.birthday,
    document: user.document,
    profile: user.profile,
    role: user.role,
    training: user.training,
    level: user.level,
    mentor: user.mentor,
    gender: user.gender,
    baptized: user.baptized,
    maritalStatus: user.maritalStatus,
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    function: Yup.string().required('Function is required'),
    department: Yup.string().required('Department is required'),
    site: Yup.string().required('Site is required'),
    attendsSince: Yup.string().required('Attends Since is required'),
    birthday: Yup.string().required('Birthday is required'),
    document: Yup.string().required('Document is required'),
    role: Yup.string().required('Role is required'),
    training: Yup.string().required('Training is required'),
    mentor: Yup.string().required('Mentor is required'),
  });
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      updateUser(values, user);
      toast.success('Datos actualizados correctamente');
    }
  });
  return <Card sx={{
    mt: 3
  }}>
      <Toaster position="top-right" reverseOrder={false} />
      <H6 fontSize={14} px={3} py={2}>
        Información del usuario
      </H6>

      <Divider />

      <form onSubmit={handleSubmit}>
        <Box margin={3}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth name="firstName" label="Nombre" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.firstName} helperText={touched.firstName && errors.firstName} error={Boolean(touched.firstName && errors.firstName)} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField fullWidth name="lastName" label="Apellido" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.lastName} helperText={touched.lastName && errors.lastName} error={Boolean(touched.lastName && errors.lastName)} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField fullWidth name="phone" label="Celular" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.phone} helperText={touched.phone && errors.phone} error={Boolean(touched.phone && errors.phone)} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField fullWidth name="email" label="Correo" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.email} helperText={touched.email && errors.email} error={Boolean(touched.email && errors.email)} />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField fullWidth name="document" label="Cédula" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.document} helperText={touched.document && errors.document} error={Boolean(touched.document && errors.document)} disabled/>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField select fullWidth name="sede" label="Sede" variant="outlined" placeholder="Sede" SelectProps={{
              native: true,
              IconComponent: KeyboardArrowDown
            }} onBlur={handleBlur} onChange={handleChange} value={values.site} helperText={touched.site && errors.site} error={Boolean(touched.site && errors.site)} disabled>
                <option value="pajarito">Pajarito</option>
                <option value="san-pedro">San Pedro</option>
                <option value="pedregal-bajo">Pedregal Bajo</option>
              </TextField>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField select fullWidth name="training" label="Formación" variant="outlined" placeholder="Formación" SelectProps={{
              native: true,
              IconComponent: KeyboardArrowDown
            }} onBlur={handleBlur} onChange={handleChange} value={values.training} helperText={touched.training && errors.training} error={Boolean(touched.training && errors.training)} disabled>
                <option value="escuela-global">Escuela de liderazgo Global</option>
                <option value="seminario">Seminario Bíblico</option>
                <option value="discipulado">Discipulado en iglesia</option>
                <option value="ninguno">Ninguno</option>
              </TextField>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField fullWidth name="level" label="Nivel de formación" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.level} helperText={touched.level && errors.level} error={Boolean(touched.level && errors.level)} disabled/>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField select fullWidth name="department" label="Ministerio Principal" variant="outlined" placeholder="Ministerio Principal" SelectProps={{
              native: true,
              IconComponent: KeyboardArrowDown
            }} onBlur={handleBlur} onChange={handleChange} value={values.department} helperText={touched.department && errors.department} error={Boolean(touched.department && errors.department)} disabled>
                <option value="enseñanza">Enseñanza</option>
                <option value="jovenes">Jovenes</option>
                <option value="adulto-mayor">Adulto Mayor</option>
                <option value="adolescentes">Adolescentes</option>
                <option value="niños">Niños</option>
                <option value="alabanza">Alabanza</option>
                <option value="evangelismo">Evangelismo</option>
                <option value="general">General</option>
                <option value="diaconos">Diáconos</option>
              </TextField>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField select fullWidth name="baptized" label="Bautizado" variant="outlined" placeholder="Bautizado" SelectProps={{
              native: true,
              IconComponent: KeyboardArrowDown
            }} onBlur={handleBlur} onChange={handleChange} value={values.baptized} helperText={touched.baptized && errors.baptized} error={Boolean(touched.baptized && errors.baptized)} disabled>
                <option value="true">Si</option>
                <option value="false">No</option>
              </TextField>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField fullWidth name="mentor" label="Mentor" variant="outlined" onBlur={handleBlur} onChange={handleChange} value={values.mentor} helperText={touched.mentor && errors.mentor} error={Boolean(touched.mentor && errors.mentor)} disabled/>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Save Changes
              </Button>

              <Button variant="outlined" sx={{
              ml: 2
            }}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Card>;
}