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
import {  useDeletyeCategoryMutation, useGetCategoryQuery, useGetMenuQuery, useGetRoleQuery } from 'src/services';
import { log } from 'console';
import { useSnackbar } from 'notistack';
// ----------------------------------------------------------------------

export default function CategoryList() {
    const [limit, setLimit] = useState(0);
    const [offset, setOffset] = useState(0);

    const { data,isLoading} = useGetCategoryQuery({
        limit: limit,
        offset: limit * offset,
    });

    
 
    const [deletyeCategory] = useDeletyeCategoryMutation();

    const [open, setOpen] = useState(null);
    const [update, setUpdate] = useState<any>()
    const [deleteDialog, setDeleteDialog] = useState(false)
  
   

    const { themeStretch } = useSettingsContext();

    const columns: Column[] = [
        { id: 'name', label: 'Name', minWidth: 100,align:"center" },
        { id: 'action', label: 'Delete', minWidth: 100, align: 'right', type: "delete" },
    ];

    const { enqueueSnackbar } = useSnackbar();


    const handleOpenMenu = (event: any, row: any) => {
        setOpen(event.currentTarget);
        setUpdate(row)
    };

    const methods = useForm()

    const {
        handleSubmit,
        formState: { isSubmitting, errors }
    } = methods;

    const toYes = async () => {
       
        try {
             await deletyeCategory({
                id: update.id
              }).unwrap();
            handleCloseMenu();
            setOpen(null)
            setDeleteDialog(false)
            enqueueSnackbar('Deleted Successfully!');
        } catch (error) {
            console.error(error);
            enqueueSnackbar('error Please check console', { variant: 'error' });
         }
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
                <title>Category List</title>
            </Helmet>
            <Stack direction='row' justifyContent='space-between' display='flex' p={2}>
            <Typography variant="h4" component="h4" paragraph>
                    Category List
                </Typography>
                <Button
                    sx={{ height: 40 }}
                    variant="contained"
                    component={RouterLink}
                    to={PATH_DASHBOARD.category.new}
                    startIcon={<Iconify icon={'eva:plus-fill'} />}
                >
                    New Category
                </Button>
            </Stack>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <CustomTable columns={columns} rows={data?.data ?? []} loading={isLoading}
                   
                    onDeleteClick={(event, row) => {
                        handleOpenMenu(event, row)
                        setDeleteDialog(true)
                    }}
                    limit={(number) => {
                       
                        setLimit(number)
            
                      }}
                      offset={(number) => {
                      
                        setOffset(number) 
                      }}
                />
                {/* Delete Model */}
                <FormProvider methods={methods}>
                    <Dialog
                        open={deleteDialog}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {'Are you sure to delete this Category?'}
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


