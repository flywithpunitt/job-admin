import { useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
// Snack Bar
import { useSnackbar } from 'notistack';
import { useGetAuthLoginMutation } from 'src/services';
import { updateToken } from 'src/redux/slices/users';
import { dispatch } from 'src/redux/store';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_AUTH } from 'src/routes/paths';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  password: string;
  afterSubmit?: string;
};

export default function AuthLoginForm() {

  const { login } = useAuthContext();


  const { enqueueSnackbar } = useSnackbar()

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {

      await login(data.email, data.password).then((r: any) => {
        dispatch(updateToken({
          token: r.data.data.token
        }))
        if (r) {
          setError('afterSubmit', {
            ...errors,
            message: 'Firebase: Error (auth/wrong-password).',
          });
          return
        }
        enqueueSnackbar('Login Successful')
      })
    } catch (error) {
      console.log(error);
      if (error.data) {
        Object.entries(error.data).forEach(([field, errorMessage]) => {
          setError('afterSubmit', {
            ...error,
            message: `${errorMessage}`,
          });
        });
      } else {
        setError('afterSubmit', {
          ...error,
          message: 'Something went Wrong',
        });
      }
      
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <RHFTextField name="email" label="Email address" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link   variant="body2" color="inherit" component={RouterLink} to={PATH_AUTH.forgetpassword} >
          Forgot password?
        </Link>
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{
          bgcolor: 'primary',
          color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          '&:hover': {
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
          },
        }}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
