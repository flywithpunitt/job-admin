import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, Typography, Container, MenuItem, Grid } from '@mui/material'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form'
import { useSettingsContext } from 'src/components/settings'
import { PATH_DASHBOARD } from 'src/routes/paths'
import { useNavigate } from 'react-router'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { createUser } from 'src/types/user'
import { useCreateUserMutation, useGetRoleQuery } from 'src/services'

interface FormValuesProps extends Omit<createUser, ''> { }

function NewUser() {

  const [role, setRole] = useState('')

  const [createUser, { isLoading }] = useCreateUserMutation()

  const { data } = useGetRoleQuery({})


  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();



  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    email: Yup.string().required('Email is required'),
    phone: Yup.string().required('phone is required'),
    role: Yup.string().required('Role is required'),
  });

  const defaultValues = {
    name: '',
    phone: '',
    email: '',
    role: 0

  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await createUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role.toString(),
      }).unwrap()
      reset();
      enqueueSnackbar('Create  success!');
      navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
      if (error.data.message) {
        Object.entries(error.data.message).forEach(([field, errorMessage]) => {
          enqueueSnackbar(`Error in ${field}: ${errorMessage}`, { variant: 'error' });
        });
      } else {
        enqueueSnackbar('error please check console', { variant: 'error' });
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Create User</title>
      </Helmet>
      <Stack direction='row' justifyContent='space-between' display='flex' p={5}>
        <Typography variant="h3" component="h1" paragraph>
          Create User
        </Typography>
      </Stack>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack display='flex' direction='column' spacing={4}>
            <Grid container spacing={3} direction='column'>
              <Grid item xs={12} sm={6} display='flex' direction="row" spacing={5}>
                <RHFTextField
                  name='name'
                  label='Name'
                  id='name'
                  sx={{mr:2}}
                />
                <RHFTextField name="email" label="Email" id='email' />

              </Grid>
              <Grid item xs={12} sm={6} direction="row"  display='flex'>
                <RHFTextField name="phone" label="Phone" id='phone' sx={{mr:2}}/>

                <RHFSelect
                  name="role"
                  id="role"
                  label='Role'
                  placeholder='Select Role'
                  value={role}
                  onChange={(e) => { setRole(e.target.value) }}

                >
                  {
                    data?.data.map((item: any) => {
                      return (
                        <MenuItem value={item.id}>
                          {item.name}
                        </MenuItem>
                      )

                    })
                  }
                </RHFSelect>
              </Grid>
            </Grid>
            <LoadingButton type="submit" variant="contained" size="large" loading={isLoading}>
              {'Create User'}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Container>
    </>
  )
}

export default NewUser
