import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography, Popover, Dialog, DialogTitle, DialogActions, Card, MenuItem } from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';
import CustomTable, { Column } from 'src/components/table';
import { PATH_DASHBOARD } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import {  useGetApplicationQuery, useGetjobQuery, useUpdatejobMutation } from 'src/services';
// ----------------------------------------------------------------------

export default function JobView() {

 const { id } = useParams()
 
 
   
    const { data, isLoading } = useGetApplicationQuery({
        id: id
    })
    ;
   

    const { themeStretch } = useSettingsContext();

    const columns: Column[] = [
        { id: 'name', label: 'Name', minWidth: 10 },
        { id: 'phone', label: 'Phone', minWidth: 10, },
        { id: 'email', label: 'Email', minWidth: 10, },
        { id: 'title', label: 'Title', minWidth: 100 },
        { id: 'requirements', label: 'skills', minWidth: 100, align: 'right', },
    ];  





    return (
        <>
            <Helmet>
                <title>Applicants</title>
            </Helmet>
            <Stack direction='row' justifyContent='space-between' display='flex' p={2}>
                <Typography variant="h2" component="h1" paragraph>
                    Applicants
                </Typography>
               { /* <Button
                    sx={{ height: 45 }}
                    variant="contained"
                    component={RouterLink}
                    to={PATH_DASHBOARD.jobs.new}
                    startIcon={<Iconify icon={'eva:plus-fill'} />}
                >
                    New Job
                </Button> */}
            </Stack>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                <CustomTable
                 columns={columns}
                 rows={data?.data ?? []} 
                 loading={isLoading}
                   
                   
                />
            </Container>
        </>
    );
}


