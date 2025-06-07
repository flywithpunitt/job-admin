import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, Typography, Container } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import FormProvider, { RHFTextField } from 'src/components/hook-form'
import { useSettingsContext } from 'src/components/settings'
import { PATH_DASHBOARD } from 'src/routes/paths'
import { useNavigate } from 'react-router'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'
import { LoadingButton } from '@mui/lab'
import { useCreatePartnerMutation, useCreateUserMutation } from 'src/services'

interface FormValuesProps {
  name:string,
  image:string,
 }

function NewPartner() {

  const [createUser] = useCreatePartnerMutation({})


  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();



  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    image: Yup.string().required('Image is required'),
  });

  const defaultValues = {
    name: '',
    image: ''
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


const {image} = watch()

console.log(image);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const formData = new FormData()
      formData.append('image',getValues('image'))
      formData.append('name',data.name)
      await createUser({formData}).unwrap()
      reset();
      enqueueSnackbar('Create  success!');
      navigate(PATH_DASHBOARD.partner.list);
    } catch (error) {
      console.error(error);
      if (error?.data) {
        if (error?.data?.code) {
          enqueueSnackbar('Internal server error!', { variant: 'error' });
        }else{
          Object.entries(error.data).forEach(([field, errorMessage]) => {
            enqueueSnackbar(`Error in ${field}: ${errorMessage}`, { variant: 'error' });
        });
        }
        
    }else {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
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
          Create Partner
        </Typography>
      </Stack>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack 
          display='flex' 
          direction='column' 
          justifyContent='center'
          spacing={4} 
          maxWidth={500}>
           
          <RHFTextField
            name='name'
            label='Name'
            id='name'
            sx={{mr:2}}
          />
          <input type="file" name='image' onChange={(e) => {
                  //@ts-ignore
                  setValue('image', e.target?.files?.[0])
            }} accept="image/png, image/gif, image/jpeg" />


            
            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {'Create Partner'}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Container>
    </>
  )
}

export default NewPartner
