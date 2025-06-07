import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography, Popover, Dialog, DialogTitle, DialogActions, Card, MenuItem} from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';
import CustomTable, { Column } from 'src/components/table';
import { PATH_DASHBOARD } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useGetMenuQuery, useGetRoleQuery } from 'src/services';
// ----------------------------------------------------------------------

export default function RoleList() {

    const [limit, setLimit] = useState(0);
    const [offset, setOffset] = useState(0);
    const { data, error,isLoading} = useGetRoleQuery({
        limit: limit,
        offset: limit * offset,
    });


    const token = localStorage.getItem("accessToken")

    

    const navigate = useNavigate()

    const [open, setOpen] = useState(null);
    const [update, setUpdate] = useState<any>()
    const [deleteDialog, setDeleteDialog] = useState(false)
    

    const { themeStretch } = useSettingsContext();

    const columns: Column[] = [
        { id: 'name', label: 'Name', minWidth: 100,align:"left" },
    ];
    const handleOpenMenu = (event: any, row: any) => {
        setOpen(event.currentTarget);
        setUpdate(row)
    };



    const methods = useForm()

    const {
        formState: { isSubmitting, errors }
    } = methods;

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
        } catch (error) { }
    };

    const handleCloseMenu = () => {
        setOpen(null);
    }
    const handleClose = () => {

        setDeleteDialog(false)
        setOpen(null)
    }

    return (
        <>
            <Helmet>
                <title>Role</title>
            </Helmet>
            <Stack direction='row' justifyContent='space-between' display='flex' p={2}>
            <Typography variant="h4" component="h4" paragraph>
                    Role
                </Typography>
                {/* <Button
                    sx={{ height: 40 }}
                    variant="contained"
                    component={RouterLink}
                    to={PATH_DASHBOARD.role.new}
                    startIcon={<Iconify icon={'eva:plus-fill'} />}
                >
                    New Role
                </Button> */}
            </Stack>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <CustomTable columns={columns} rows={data?.data ?? []} loading={isLoading}
                    onClick={(event, row) => {
                        handleOpenMenu(event, row)
                    }}
                    limit={(number) => {
                       
                        setLimit(number)
            
                      }}
                      offset={(number) => {
                      
                        setOffset(number) 
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
                 
                    <MenuItem onClick={() => setDeleteDialog(true)} sx={{ color: 'error.main' }}>
                        <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                        Delete
                    </MenuItem>
                </Popover>
                {/* Delete Model */}
                <FormProvider methods={methods}>
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
                </FormProvider>
                {/* ///// Delete Model */}
             
            </Container>
        </>
    );
}


