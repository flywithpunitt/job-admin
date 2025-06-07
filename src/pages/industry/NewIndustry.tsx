import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, Typography, Container, MenuItem } from '@mui/material'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import FormProvider, {  RHFTextField } from 'src/components/hook-form'
import { useSettingsContext } from 'src/components/settings'
import { PATH_DASHBOARD } from 'src/routes/paths'
import { useNavigate } from 'react-router'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { createRole } from 'src/types/user'
import { useCreateIndustryMutation } from 'src/services'


interface FormValuesProps extends Omit<createRole, ''> { }

function NewUser() {

const [createIndutry, { isLoading} ] = useCreateIndustryMutation()


  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    name: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;


  const onSubmit = async (data: FormValuesProps) => {

    try {
       await createIndutry({
            name:data.name
        }).unwrap()
      console.log(data);
      reset();
      enqueueSnackbar('Create  success!');
      navigate(PATH_DASHBOARD.industry.list);
    } catch (error) {
      console.error(error);
      if (error.data) {
        Object.entries(error.data).forEach(([field, errorMessage]) => {
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
        <title>Create Industry</title>
      </Helmet>
      <Stack direction='row' justifyContent='space-between' display='flex' p={5}>
        <Typography variant="h3" component="h1" paragraph>
          Create Industry
        </Typography>
      </Stack>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack display='flex' direction='column' spacing={4}>
            <RHFTextField
              name='name'
              label='Name'
              id='name'
            />
            <LoadingButton type="submit" variant="contained" size="large" loading={isLoading}>
              {'Create Industry'}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Container>
    </>
  )
}

export default NewUser
