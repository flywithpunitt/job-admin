import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Card, Container, Dialog, DialogActions, DialogTitle, MenuItem, Popover, Stack, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';
import CustomTable, { Column } from 'src/components/table';
import { PATH_DASHBOARD } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { useDeletePartnerMutation, useGetPartnerQuery, useGetuserQuery, useUpdateUserMutation } from 'src/services';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function PageTwo() {

   const [deletePartner] = useDeletePartnerMutation();

  const { themeStretch } = useSettingsContext();
  const [limit, setLimit] = useState(0);
  const [offset, setOffset] = useState(0);
  const { data, isLoading} = useGetPartnerQuery({
     limit: limit,
     offset: limit * offset,
  })

  const [update, setUpdate] = useState<any>()
  const [ProductView, setProductView] = useState(false)

  const handleOpenMenu = (event: any, row: any) => {
    setUpdate(row)
};


console.log(ProductView);

const handleCloseStatusModel = () => {
  setProductView(false)
}

  const columns: Column[] = [
    { id: 'image', label: 'Image', minWidth: 10, type:'image' },
    { id: 'name', label: 'Name', minWidth: 10, },
    { id: 'status', label: 'Status', minWidth: 10, align: 'center', type: 'badge' },
    { id: 'delete', label: 'Action',align: 'right', type: "delete" },
  ];
  const { enqueueSnackbar } = useSnackbar();
  const NewProductSchema = Yup.object().shape({});

  const defaultValues = {};

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState:{isSubmitting}
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      await deletePartner(update).unwrap()
       setProductView(false)
      enqueueSnackbar('Delete Successfully!');
    } catch (error) {
      if (error.data.message) {
        Object.entries(error.data.message).forEach(([field, errorMessage]) => {
          enqueueSnackbar(`Error in ${field}: ${errorMessage}`, { variant: 'error' });
        });
      }else if (error?.status === 500){
        enqueueSnackbar('Internal Server Error!', { variant: 'error' });

      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    }

  }



  return (
    <>
      <Helmet>
        <title>Partners</title>
      </Helmet>
      <Stack direction='row' justifyContent='space-between' display='flex' p={2}>
      <Typography variant="h3" component="h3" paragraph>
          Partners
        </Typography>
        <Button
          sx={{ height: 45 }}
          variant="contained"
          component={RouterLink}
          to={PATH_DASHBOARD.partner.new}
          startIcon={<Iconify icon={'eva:plus-fill'} />}
        >
          New Partner
        </Button>
      </Stack>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomTable columns={columns} rows={data?.data ?? []} loading={isLoading}
          limit={(number) => {
            setLimit(number)
          }}

          onDeleteClick={(event, row) => {
            handleOpenMenu(event, row)
            setProductView(true);
        }}
          offset={(number) => {
            
            setOffset(number) 
          }}
          />

        <Dialog
          open={ProductView}
          onClose={handleCloseStatusModel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth='sm'
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Card elevation={0} sx={{ p: 5 }}>
              <Stack direction='column' spacing={2}>
                <Typography variant='h4'>
                  Are you want to sure delete this !
                </Typography>
              </Stack>
            </Card>
            <DialogActions>
              <LoadingButton type='submit' variant="contained" loading={isSubmitting}>
                Submit
              </LoadingButton>
              <Button variant="contained" onClick={handleCloseStatusModel} autoFocus>
                Back
              </Button>
            </DialogActions>
          </FormProvider>
        </Dialog>
       
      </Container>
    </>
  );
}
