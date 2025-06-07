import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Iconify from "src/components/iconify/Iconify";
import { useSnackbar } from "notistack";
import moment from "moment";
import { Box, Button, Dialog, DialogActions, DialogTitle, Grid, MenuItem, Popover, Stack, Tooltip } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PATH_DASHBOARD } from "src/routes/paths";
import { LoadingButton } from "@mui/lab";
import { useBlogEditMutation } from "src/services";
import FormProvider, { RHFSelect } from "src/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { useForm } from "react-hook-form";


type props = {
  title: string;
  updateAt: string;
  src: string;
  description1?: string;
  card: number;
  status?: string
};

export default function RecipeReviewCard(props: props) {

  const [deteleBlog] = useBlogEditMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [deleteDialog, setDeleteDialog] = useState(false)
  const navigate = useNavigate()
  const [open, setOpen] = useState(null);
  const [ProductView, setProductView] = useState(false)
  const [pinView, setPinView] = useState(false)


  const statusViewModelOpen = () => {
    setProductView(true)
    setOpen(null)
  }

  const pinViewModelopen = () => {
    setPinView(true)
    setOpen(null)
  }

  const handleCloseMenu = () => {
    setOpen(null);
  }
  const handleCloseStatusModel = () => {
  
    setProductView(false)
  }

  const handleClosePinModel = () => {
    setPinView(false)
  }

  const handleClose = () => {

    setDeleteDialog(false)
    setOpen(null)
  }
  const UploadTime = moment(props.updateAt).format("MMMM Do YYYY");


  const NewProductSchema = Yup.object().shape({
    status: Yup.string().required('Status is required'),
  });

  const defaultValues = {
    status: "published",

  };

  const defaultValuespin = {
    pin: "1",

  };

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const NewProductSchemaPin = Yup.object().shape({
    pin: Yup.string().required('Pin is required'),
  });

  const methodsPin = useForm({
    resolver: yupResolver(NewProductSchemaPin),
    defaultValues:defaultValuespin,
  });



  const {
    watch,
    handleSubmit,
  } = methods;

  
  const {
   
    handleSubmit: handlePinSubmit,
  } = methodsPin;



  const toYes = async () => {

    try {
      const formData = new FormData();
      formData.append('status', 'deleted');
      await deteleBlog({ id: props.card, data: formData }).unwrap();
      handleCloseMenu();
      setOpen(null)
      setDeleteDialog(false)
      // setdialog(false);
      // refetch()
      enqueueSnackbar('Deleted Successfully!');
    } catch (error) {
      console.log(error);
      enqueueSnackbar('error Please check console', { variant: 'error' });
    }
  };




  const onSubmit = async (data: any) => {

    try {
      const formData = new FormData();
      formData.append('status', data.status);
      await deteleBlog({ id: props.card, data: formData }).unwrap();
      setProductView(false)

      enqueueSnackbar('Upadated Successfully!');
    } catch (error) {
      console.log(error);
      enqueueSnackbar('error Please check console', { variant: 'error' });

    }

  }

  
  const onSubmitPin = async (data: any) => {

    try {
      const formData = new FormData();
      formData.append('pinning', data.pin);
      await deteleBlog({ id: props.card, data: formData }).unwrap();
      setPinView(false)


      enqueueSnackbar('Upadated Successfully!');
    } catch (error) {
      console.log(error);
      enqueueSnackbar('error Please check console', { variant: 'error' });

    }

  }


  return (
    <Card sx={{ maxWidth: 360, height: 520 }}>
      <Grid container direction='row'>
        
        <Grid item xs={8} md={9} display='flex' direction='row' justifyContent='space-between'>
          <CardHeader
            sx={{ mb: 1 }}
            action={<IconButton aria-label="settings"></IconButton>}
            title={props.title}
            subheader={UploadTime}
          />
          <Grid item xs={4} md={3}  display='flex' direction='row'>
            <Stack display='flex' direction='row' paddingTop={4} paddingBottom={4}>
            <Tooltip title="Pin">
              <IconButton size="small" color="success" onClick={(event: any) => { pinViewModelopen() }}>
                {/* Apply the circularIcon style to the IconButton */}
                <Iconify icon={'ion:pin-sharp'}  />
              </IconButton>
            </Tooltip>
            
            {/* Tooltip for Publish Icon */}
            <Tooltip title="Publish">
              <IconButton size="small" color="success" onClick={(event: any) => { statusViewModelOpen() }}>
                {/* Apply the circularIcon style to the IconButton */}
                <Iconify icon={'ic:baseline-publish'}  />
              </IconButton>
            </Tooltip>
          
            

            {/* Tooltip for View Icon */}
            <Tooltip title="View">
              <IconButton size="small" color="info" onClick={(event: any) => {navigate(PATH_DASHBOARD.blog.view(props.card.toString())) }}>
                {/* Apply the circularIcon style to the IconButton */}
                <Iconify icon={'ic:baseline-remove-red-eye'}  />
              </IconButton>
            </Tooltip>

            {/* Tooltip for Edit Icon */}
            <Tooltip title="Edit">
              <IconButton size="small" color="warning" onClick={(event: any) => {navigate(PATH_DASHBOARD.blog.edit(props.card.toString())) }}>
                {/* Apply the circularIcon style to the IconButton */}
                <Iconify icon={'ic:baseline-edit'}  />
              </IconButton>
            </Tooltip>
.
            {/* Tooltip for Delete Icon */}
            <Tooltip title="Delete">
              <IconButton size="small" color="error" onClick={(event: any) => { setDeleteDialog(true) }}>
                {/* Apply the circularIcon style to the IconButton */}
                <Iconify icon={'eva:trash-2-outline'}  />
              </IconButton>
            </Tooltip>
            </Stack>
            {/* Delete Model */}

            <Dialog
              open={deleteDialog}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {'Are you sure to delete this Blog?'}
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

                      <MenuItem key={1} value={"published"} selected>published</MenuItem>
                      <MenuItem key={2} value={"draft"} >draft</MenuItem>

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

            <Dialog
              open={pinView}
              onClose={handleClosePinModel}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth
              maxWidth='sm'
            >
              <FormProvider methods={methodsPin} onSubmit={handlePinSubmit(onSubmitPin)}>
                <Card elevation={0} sx={{ p: 5 }}>
                  <Stack direction='column' spacing={2}>
                    <Typography variant='h4'>
                      Pin Blog
                    </Typography>
                    <RHFSelect name="pin" label="Change Pin status" placeholder="Change Pin status">
                      <MenuItem key={1} value={"1"} selected>Pin</MenuItem>
                      <MenuItem key={2} value={"0"} >un-pin</MenuItem>
                    </RHFSelect>


                  </Stack>
                </Card>
                <DialogActions>
                  <LoadingButton type='submit' variant="contained">
                    Change
                  </LoadingButton>
                  <Button variant="contained" onClick={handleClosePinModel} autoFocus>
                    Back
                  </Button>
                </DialogActions>
              </FormProvider>
            </Dialog>

          </Grid>
        </Grid>

      </Grid>


      <CardMedia
        component="img"
        height="194"
        image={props.src}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description1}
        </Typography>
      </CardContent>

    </Card>

  );
}
