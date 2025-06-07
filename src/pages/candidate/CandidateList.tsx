import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Stack, Typography, MenuItem, Popover, Dialog, DialogTitle, DialogActions, Grid, Card } from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';
import CustomTable, { Column } from 'src/components/table';
import { PATH_DASHBOARD } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import FormProvider from 'src/components/hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import Label from 'src/components/table/Label';
import { useGetCandidateQuery, useUpdateCompanyMutation } from 'src/services';
import { RHFSelect } from 'src/components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { endOfQuarter } from 'date-fns';
import { useSnackbar } from 'notistack';
import { CSVLink } from 'react-csv';
// ----------------------------------------------------------------------

export default function PageThree() {

  const [open, setOpen] = useState(null);
  const [update, setUpdate] = useState<any>()
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [ProductView, setProductView] = useState(false)
  const [limit, setLimit] = useState(0);
  const [offset, setOffset] = useState(0);
  const [arr, setArr] = useState<any>([])

  const { data,error, isLoading } = useGetCandidateQuery({
 limit: limit,
     offset: limit * offset,
  })
  

  const formatDateOfBirth = (dob:any) => {
    // Parse the current date string into a Date object
    const date = new Date(dob);
    
    // Get the individual components of the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    
    // Construct the new format (e.g., 'DD/MM/YYYY')
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };

  useMemo(() => {
        const d = data?.data.map((item: any) => {
          return {
            id: item.id,
            name:item.name,
            bio:item.bio,
            gender:item.gender,
            phone:item.phone,
            email:item.email,
            dob:formatDateOfBirth(item.dob),
            status:item.status,
            address:item.city +"," +  item.state +"," + item.country +"," + item.pincode
          }
        })
        setArr(d)
  }, [data])
  
  const { themeStretch } = useSettingsContext();

  const columns: any = [
    { id: 'name', label: 'Name', minWidth: 100, key:'name' },
    { id: 'phone', label: 'Phone', minWidth: 100,  key:'phone'},
    { id: 'email', label: 'Email', minWidth: 100,  key:'email'},
    { id: 'address', label: 'Address', minWidth: 100,  key:'address' },
    { id: 'dob', label: 'DOB', minWidth: 100,  key:'dob' },
    { id: 'bio', label: 'BIO', minWidth: 100,  key:'bio' },
    { id: 'gender', label: 'Gender', minWidth: 100,  key:'gender' },
    { id: 'status', label: 'Status', minWidth: 100,  type: "badge",  key:'status' },
    { id: 'action', label: 'Action', minWidth: 100,  type: "action",align:'right',  key:'action' },
    
  ];


  const handleOpenMenu = (event: any, row: any) => {
    setOpen(event.currentTarget);
    setUpdate(row)
  };
  
  


  const handleCloseMenu = () => {
    setOpen(null);
  }
  const handleClose = () => {

    setDeleteDialog(false)
    setOpen(null)
  }

  const navigate = useNavigate()

  const ProductViewModelOpen = () => {
    setOpen(null)
    navigate(PATH_DASHBOARD.candidates.view(update.id))
  }




  return (
    <>
      <Helmet>
        <title>Candidates</title>
      </Helmet>
      <Stack direction='row' justifyContent='space-between' display='flex' p={2}>
      <Typography variant="h3" component="h3" paragraph>
          Candidates
        </Typography>
        <CSVLink data={arr ?? []} headers={columns} filename={'table-data.csv'}>
        <Button
          sx={{ height: 45 }}
          variant="contained"
         
          startIcon={<Iconify icon={'material-symbols:download'} />}
        >
        Export to CSV
        </Button>
      </CSVLink>
        
          
      </Stack>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomTable columns={columns} rows={arr ?? []} loading={isLoading} 
          onClick={(event, row) => {
            handleOpenMenu(event, row)
          }}
          limit={(number) => {
            
            setLimit(number)

          }}
          offset={(number) => {
           
            setOffset(number) 
          }}
          csvDownloadButton={false}
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
          <MenuItem sx={{ color: 'green' }} onClick={ProductViewModelOpen} >
            <Iconify icon={'ic:baseline-remove-red-eye'} sx={{ mr: 2 }} />
            View
          </MenuItem>
        </Popover>
      </Container>
    </>
  );
}
