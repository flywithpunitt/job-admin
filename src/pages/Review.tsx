import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography, Popover, Dialog, DialogTitle, DialogActions, Card, MenuItem } from '@mui/material';
// components

import CustomTable, { Column } from 'src/components/table';
import { PATH_DASHBOARD } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import {  useGetjobQuery, useUpdatejobMutation } from 'src/services';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
import { useGetReviewQuery, useUpdateReviewMutation } from 'src/services/role';
// ----------------------------------------------------------------------

export default function Review() {
 
 
      
    const { data, isLoading } = useGetReviewQuery({});

    const [updateJob,{isLoading:loading}]  = useUpdateReviewMutation()

    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate()

    const [open, setOpen] = useState(null);
    const [update, setUpdate] = useState<any>()
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [ProductView, setProductView] = useState(false)

    const { themeStretch } = useSettingsContext();

    const columns: Column[] = [
        { id: 'author', label: 'Auther', minWidth: 100, },
        { id: 'text', label: 'Text', minWidth: 100 },
        { id: 'designation', label: 'Designation', minWidth: 100, align: 'right', },
        { id: 'status', label: 'Status',  align: 'right', type: "badge" },
        { id: 'status', label: 'Change Status',align: 'right', type: "update" },
    ];


    const handleOpenMenu = (event: any, row: any) => {
        setOpen(event.currentTarget);
        setUpdate(row)
    };


    const ProductViewModelOpen = () => {
        setOpen(null)
        navigate(PATH_DASHBOARD.jobs.view(update.id.toString()))
    }


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
      
        try {
          await updateJob({
            id: update.id,
            status: data.status,
          }).unwrap()
          setProductView(false)
             enqueueSnackbar('Upadated Successfully!');
        } catch (error) {
            console.log(error);
        }
     
    }
    

    const toYes = async () => {
        alert("API Required");
        try {
            // await deleteProduct({
            //   variables: {
            //     id: id
            //   }
            // });
            handleCloseMenu();
            setOpen(null)
            setDeleteDialog(false)
            // setdialog(false);
            // refetch()
            // enqueueSnackbar('Deleted Successfully!');
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseMenu = () => {
        setOpen(null);
    }
    const handleClose = () => {

        setDeleteDialog(false)
        setOpen(null)
    }

    const editJobHandler = (id = 5) => {
        setOpen(null)
        navigate(PATH_DASHBOARD.jobs.edit(id.toString()))
    }
    const ProductViewModelClose = () => {
        setOpen(null)
    }

    const statusViewModelOpen = () => {
        setProductView(true)
        setOpen(null)
    }


    const handleCloseStatusModel = () => {
        setProductView(false)
    }
    const handleClick = () => {
        // Define your logic here to generate the URL with an ID
        // Replace with your actual job ID
        const url = `https://wiztrace.com/jobdetails/${update.id}`; // Construct the URL
        window.open(url, '_blank'); // Open the URL in a new tab
      };

    return (
        <>
            <Helmet>
                <title>Jobs</title>
            </Helmet>
            <Stack direction='row' justifyContent='space-between' display='flex' p={2}>
                <Typography variant="h3" component="h3" paragraph>
                    Jobs
                </Typography>
               { /* <Button
                    sx={{ height: 45 }}
                    variant="contained"
                    component={RouterLink}
                    to={PATH_DASHBOARD.jobs.new}
                    startIcon={<Iconify icon={'eva:plus-fill'} />}
                >
                    New Job
                </Button> */    }
            </Stack>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <CustomTable
                 columns={columns}
                 rows={data?.data ?? []} 
                 loading={isLoading}
                    onClick={(event, row) => {
                        handleOpenMenu(event, row)
                    }}
                    onUpdateClick={(event, row) => {
                        handleOpenMenu(event, row)
                        statusViewModelOpen() 
                    }}
                />
                <Popover
                    open={Boolean(open)}
                    anchorEl={open}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                        sx: {
                            p: 1,
                            width: 140,
                            '& .MuiMenuItem-root': {
                                px: 1,
                                typography: 'body2',
                                borderRadius: 0.75,
                            },
                        },
                    }}
                >
                    <MenuItem sx={{ color: 'green' }} onClick={() => { ProductViewModelOpen() }} >
                        <Iconify icon={'ic:baseline-remove-red-eye'} sx={{ mr: 2 }} />
                         Applicants
                    </MenuItem>
                   
                    <MenuItem onClick={handleClick} sx={{ color:'green' }}>
                        <Iconify icon={'ic:baseline-remove-red-eye'} sx={{ mr: 2 }} />
                        View job
                    </MenuItem>
                </Popover>
                {/* Delete Model */}
              
                    <Dialog
                        open={deleteDialog}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {'Are you sure to delete this Product?'}
                        </DialogTitle>
                        <DialogActions>
                            <LoadingButton type='submit' variant="contained" onClick={toYes}>
                                Yes
                            </LoadingButton>
                            <Button variant="contained" onClick={handleClose} autoFocus>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
              
                {/* ///// Delete Model */}
                {/* Status model */}
                
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
                            <LoadingButton loading={loading} type='submit' variant="contained">
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


