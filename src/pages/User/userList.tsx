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
import { useGetuserQuery, useUpdateUserMutation } from 'src/services';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function PageTwo() {

   const [updateUser] = useUpdateUserMutation();

  const { themeStretch } = useSettingsContext();
  const [limit, setLimit] = useState(0);
  const [offset, setOffset] = useState(0);
  const { data, isLoading} = useGetuserQuery({
     limit: limit,
     offset: limit * offset,
  })

  

  const [open, setOpen] = useState(null);
  const [update, setUpdate] = useState<any>()
  const [ProductView, setProductView] = useState(false)

  const handleOpenMenu = (event: any, row: any) => {
    setOpen(event.currentTarget);
    setUpdate(row)
};

const statusViewModelOpen = () => {
  setProductView(true)
  setOpen(null)
}
const handleCloseStatusModel = () => {
  setProductView(false)
}

  const columns: Column[] = [
    { id: 'name', label: 'Name', minWidth: 10 },
    { id: 'phone', label: 'Phone', minWidth: 10, },
    { id: 'email', label: 'Email', minWidth: 10, },
    { id: 'status', label: 'Status', minWidth: 10, align: 'center', type: 'badge' },
    { id: 'status', label: 'Change Status',align: 'right', type: "update" },
  ];
  const { enqueueSnackbar } = useSnackbar();
  const NewProductSchema = Yup.object().shape({
    status: Yup.string().required('Status is required'),
  });

  const defaultValues = {
    status: "active",

  };

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
  } = methods;
  const values = watch()

  const onSubmit = async (data: any) => {
console.log(data);

    try {
      await updateUser({
        ...update,
        role : update.role ?? 0,
         id:update.id,
        status: data.status,
        approved:1,

        
      }).unwrap()
       setProductView(false)

      enqueueSnackbar('Upadated Successfully!');
    } catch (error) {
      console.log(error);
    }

  }



  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Stack direction='row' justifyContent='space-between' display='flex' p={2}>
      <Typography variant="h3" component="h3" paragraph>
          Users
        </Typography>
        <Button
          sx={{ height: 45 }}
          variant="contained"
          component={RouterLink}
          to={PATH_DASHBOARD.user.new}
          startIcon={<Iconify icon={'eva:plus-fill'} />}
        >
          New User
        </Button>
      </Stack>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomTable columns={columns} rows={data?.data ?? []} loading={isLoading}
          limit={(number) => {
        
            setLimit(number)

          }}

          onUpdateClick={(event, row) => {
            handleOpenMenu(event, row)
            statusViewModelOpen() 
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
                  Update Status
                </Typography>
                <RHFSelect name="status" label="Change Status" placeholder="Change Status">

                  <MenuItem key={1} value={"active"} selected>Active</MenuItem>
                  <MenuItem key={2} value={"inactive"} >Inactive</MenuItem>
                
                
                </RHFSelect>
                
              </Stack>
            </Card>
            <DialogActions>
              <LoadingButton type='submit' variant="contained">
                Change
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
