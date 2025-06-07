import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography, MenuItem, Popover, Dialog, DialogTitle, DialogActions, Grid, Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CardContent, Divider } from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';
import CustomTable from 'src/components/table';
import Iconify from 'src/components/iconify';
import { useState } from 'react';
import { useGetCandidateByIdQuery, useGetCandidateQuery } from 'src/services';
import { Link, useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function PageThree() {
  const { id } = useParams()
  const { data, isLoading } = useGetCandidateByIdQuery({ id: id })

  const [open, setOpen] = useState(null);
  const [update, setUpdate] = useState<any>()
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [ProductView, setProductView] = useState(false)
  const [limit, setLimit] = useState(0);
  const [offset, setOffset] = useState(0);
  const [arr, setArr] = useState<any>([])


  console.log(data);




  const { themeStretch } = useSettingsContext();

  const columns: any = [
    { id: 'name', label: 'Name', minWidth: 100, key: 'name' },
    { id: 'phone', label: 'Phone', minWidth: 100, key: 'phone' },
    { id: 'email', label: 'Email', minWidth: 100, key: 'email' },
    { id: 'address', label: 'Address', minWidth: 100, key: 'address' },
    { id: 'status', label: 'Status', minWidth: 100, type: "badge", key: 'status' },
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

  const ProductViewModelOpen = () => {
    setProductView(true)
    setOpen(null)
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
      </Stack>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              {/* Left side (Attributes) */}
              <Grid item xs={3}>
                <Typography variant="h6">Candidate Details</Typography>
                <Typography>Full Name:</Typography>
                <Typography>Email:</Typography>
                <Typography>Phone:</Typography>
                <Typography>Address:</Typography>
                <Typography>Status:</Typography>
                <Typography>D.O.B:</Typography>
                <Typography>Documents:</Typography>

                {/* Add more attributes as needed */}
              </Grid>
              <Divider orientation="vertical" flexItem />

              {/* Right side (Values) */}
              <Grid item xs={6}>
                <Typography variant="h6">Values</Typography>
                <Typography>{data?.candidate.name}</Typography>
                <Typography>{data?.candidate.email}</Typography>
                <Typography>{data?.candidate.phone}</Typography>
                <Typography>{data?.candidate.line1 + ", " + data?.candidate.city + ", " + data?.candidate.state + ", " + data?.candidate.country + ", " + data?.candidate.pincode}</Typography>
                <Typography>{data?.candidate.status}</Typography>
                <Typography>{data?.candidate.dob}</Typography>
                {
                  data?.documents.map((doc: any) => {
                    return (
                      <>
                        <Typography>{doc.title}</Typography>
                        <Link to={`${doc.document}`} target='_blank'>
                          <Typography>{doc.document}</Typography>
                        </Link>
                      </>
                    )

                  })
                }

                {/* Add more values corresponding to attributes */}
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Card>
      </Container>
    </>
  );
}
