import { Helmet } from "react-helmet-async";
// sections
import {
    Typography,
    styled,
    Link,
    Container,
    Stack,
    Alert
} from "@mui/material";
import Logo from "src/components/logo";

import { Link as RouterLink } from "react-router-dom";
import { useSettingsContext } from "src/components/settings";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
// Snack Bar
import { useSnackbar } from "notistack";
import { PATH_AUTH } from "src/routes/paths";
import FormProvider from "src/components/hook-form/FormProvider";
import { RHFTextField } from "src/components/hook-form";
import { useForgetPasswordMutation } from "src/services";
// Snack Bar

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  afterSubmit?: string;
};

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

export default function LoginPage() {
  const { themeStretch } = useSettingsContext();

  const { enqueueSnackbar } = useSnackbar();

  const [sendEmail] = useForgetPasswordMutation({})

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const defaultValues = {
    email: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
        await sendEmail(data)
        enqueueSnackbar("Forget password link send Successfully");
    } catch (error) {
      setError("afterSubmit", {
        ...error,
        message: error?.data?.message || "Error While Forget!",
      });
    }
  };
  return (
    <>
      <Helmet>
        <title> Forget Password</title>
      </Helmet>
      <RootStyle>
        <HeaderStyle>
          <Logo />
          <Typography variant="body2" sx={{ mt: { md: 2 }, mr: 3 }}>
            {`Go to login`}
            <Link
              variant="subtitle2"
              component={RouterLink}
              to={PATH_AUTH.login}
            >
              {" login"}
            </Link>
          </Typography>
        </HeaderStyle>

        <Container sx={{mt:30}} maxWidth={themeStretch ? false : "xs"}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {!!errors.afterSubmit && (
                <Alert severity="error">{errors.afterSubmit.message}</Alert>
              )}

              <RHFTextField
                name="email"
                label="Email Address"
                InputLabelProps={{
                  shrink: true,
                }}
              />

             
            </Stack>


            <LoadingButton
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
                mt:10,
                bgcolor: "text.primary",
                color: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "grey.800",
                "&:hover": {
                  bgcolor: "text.primary",
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "common.white"
                      : "grey.800",
                },
              }}
            >
              Forget
            </LoadingButton>
          </FormProvider>
        </Container>
      </RootStyle>
    </>
  );
}
