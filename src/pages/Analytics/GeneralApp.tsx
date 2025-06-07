// @mui
import { useTheme } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
import { useSettingsContext } from "src/components/settings";
import Page from "./Page";
import AppWidgetSummary from "./AppWidgetSummary";
// hooks

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3} direction='column'>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Send Messages"
              percent={2.6}
              total={18765}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total pending Messages"
              percent={0.2}
              total={4876}
              chartColor={theme.palette.primary.light}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total failed Messages"
              percent={-0.1}
              total={678}
              chartColor={theme.palette.primary.dark}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
