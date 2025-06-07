import { Helmet } from "react-helmet-async";
// @mui
import {
  Button,
  Container,
  Stack,
  Typography,
  MenuItem,
  Popover,
  Dialog,
  DialogTitle,
  DialogActions,
  Grid,
  Card,
} from "@mui/material";
// components
import { useSettingsContext } from "../../components/settings";
import CustomTable, { Column } from "src/components/table";
import { PATH_DASHBOARD } from "src/routes/paths";
import Iconify from "src/components/iconify";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import FormProvider from "src/components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import Label from "src/components/table/Label";
import { useGetCompanyQuery, useUpdateCompanyMutation } from "src/services";
import { log } from "console";
import { RHFSelect, RHFTextField } from "src/components/hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";

// ----------------------------------------------------------------------

export default function PageThree() {
  const [limit, setLimit] = useState(0);
  const [offset, setOffset] = useState(0);
  const [open, setOpen] = useState(null);
  const [update, setUpdate] = useState<any>();
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [ProductView, setProductView] = useState(false);

  const { data, isLoading } = useGetCompanyQuery({
    limit: limit,
    offset: limit * offset,
  });

  console.log(data);

  const [updateCompany] = useUpdateCompanyMutation();

  const { themeStretch } = useSettingsContext();

  const columns: Column[] = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "industry", label: "Industry", minWidth: 100 },
    { id: "location", label: "Location", minWidth: 100 },
    { id: "website", label: "Website", minWidth: 100 },
    { id: "contact_name", label: "Contact Name", minWidth: 100 },
    { id: "contact_email", label: "Contact Email", minWidth: 100 },
    { id: "phone", label: "Contact Phone", minWidth: 100 },
    { id: "gst", label: "GST", minWidth: 100 },
    { id: "cin", label: "CIN", minWidth: 100 },
    { id: "pan", label: "PAN", minWidth: 100 },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      align: "right",
      type: "badge",
    },
    {
      id: "action",
      label: "Update",
      minWidth: 100,
      align: "right",
      type: "update",
    },
  ];

  const handleOpenMenu = (event: any, row: any) => {
    setOpen(event.currentTarget);
    setUpdate(row);
  };

  const toYes = async () => {
    alert("API Required");
    try {
      // await deleteProduct({
      //   variables: {
      //     id: id
      //   }
      // });
      handleCloseMenu();
      setOpen(null);
      setDeleteDialog(false);
      // setdialog(false);
      // refetch()
      // enqueueSnackbar('Deleted Successfully!');
    } catch (error) {}
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleClose = () => {
    setDeleteDialog(false);
    setOpen(null);
  };

  const navigate = useNavigate();

  const handleCloseStatusModel = () => {
    setProductView(false);
  };
  const { enqueueSnackbar } = useSnackbar();
  const NewProductSchema = Yup.object().shape({
    status: Yup.string().required("Status is required"),
  });

  const defaultValues = {
    status: "verified",
  };

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const { watch, handleSubmit } = methods;
  const values = watch();

  const onSubmit = async (data: any) => {
    try {
      await updateCompany({
        id: update.id,
        status: data.status,
        remark: data.remarks,
      }).unwrap();
      setProductView(false);

      enqueueSnackbar("Upadated Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const statusViewModelOpen = () => {
    setProductView(true);
    setOpen(null);
  };

  return (
    <>
      <Helmet>
        <title>Companies</title>
      </Helmet>
      <Stack
        direction="row"
        justifyContent="space-between"
        display="flex"
        p={2}
      >
        <Typography variant="h3" component="h3" paragraph>
          Companies
        </Typography>
        {/* <Button
          sx={{ height: 45 }}
          variant="contained"
          component={RouterLink}
          to={PATH_DASHBOARD.company.new}
          startIcon={<Iconify icon={'eva:plus-fill'} />}
        >
          New Company
        </Button> */}
      </Stack>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <CustomTable
          columns={columns}
          rows={data?.data ?? []}
          loading={isLoading}
          onUpdateClick={(event, row) => {
            handleOpenMenu(event, row);
            statusViewModelOpen();
          }}
          limit={(number) => {
            setLimit(number);
          }}
          offset={(number) => {
            setOffset(number);
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
              {"Are you sure to delete this Product?"}
            </DialogTitle>
            <DialogActions>
              <LoadingButton type="submit" variant="contained" onClick={toYes}>
                Yes
              </LoadingButton>
              <Button variant="contained" onClick={handleClose} autoFocus>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </FormProvider>
        {/* ///// Delete Model */}

        {/* Status model */}

        <Dialog
          open={ProductView}
          onClose={handleCloseStatusModel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Card elevation={0} sx={{ p: 5 }}>
              <Stack direction="column" spacing={2}>
                <Typography variant="h4">Update Status</Typography>
                <RHFSelect
                  name="status"
                  label="Change Status"
                  placeholder="Change Status"
                >
                  <MenuItem key={1} value={"verified"} selected>
                    Verified
                  </MenuItem>
                  <MenuItem key={2} value={"under-process"}>
                    Under-process
                  </MenuItem>
                  <MenuItem key={3} value={"suspended"}>
                    Suspended
                  </MenuItem>
                  <MenuItem key={4} value={"rejected"}>
                    rejected
                  </MenuItem>
                </RHFSelect>
                {values.status === "rejected" && (
                  <RHFTextField
                    name="remarks"
                    label="Reason"
                    placeholder="Reason"
                  />
                )}
              </Stack>
            </Card>
            <DialogActions>
              <LoadingButton type="submit" variant="contained">
                Change
              </LoadingButton>
              <Button
                variant="contained"
                onClick={handleCloseStatusModel}
                autoFocus
              >
                Back
              </Button>
            </DialogActions>
          </FormProvider>
        </Dialog>
      </Container>
    </>
  );
}
