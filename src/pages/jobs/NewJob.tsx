// @mui
import { LoadingButton } from '@mui/lab';
import {
  Grid,
  Stack,
  Typography,
  Card
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';


import FormProvider, { RHFTextField } from 'src/components/hook-form';


// hooks

// components




export default function CreateJob() {

  const methods = useForm()


  return (
    <>
      <Helmet>
        <title>New job</title>
      </Helmet>
      <Stack direction='row' justifyContent='space-between' display='flex' p={5}>
        <Typography variant="h2" component="h1" paragraph>
          New Job
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>

            <FormProvider methods={methods}>
              <Stack spacing={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <RHFTextField name="jobtitle" label="Title" id="title" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RHFTextField name="company" id="company" label="Company" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RHFTextField name="location" label="Location" id="location" />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <RHFTextField name="vacancies" id="vacancies" label="Vacancies" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RHFTextField name="qualifications" label="Qualifications" id="Qualifications" />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <RHFTextField name="experince" id="experince" label="Experince" />
                  </Grid>
                </Grid>

                <Grid
                  container
                  sx={{ border: '1px solid grey', borderRadius: '20px', padding: '30px' }}
                >
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={6}>
                      <RHFTextField name="line1" label="Line1" id="line1" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <RHFTextField name="city" id="city" label="City" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <RHFTextField name="state" label="State" id="state" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <RHFTextField name="postal_code" label="Postal Code" id="postal_code" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <RHFTextField name="country" label="Country" id="country" />
                    </Grid>
                  </Grid>
                </Grid>
                <RHFTextField name="description" label="Description" id="description" />
              </Stack>
            </FormProvider>
          </Card>
        </Grid>

        <Grid item xs={12} md={12}>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"

          >
            {'Create Customer'}
          </LoadingButton>
        </Grid>
      </Grid>

    </>

  );
}
