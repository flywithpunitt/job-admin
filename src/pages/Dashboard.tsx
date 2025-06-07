import { Helmet } from 'react-helmet-async';
// @mui
import { Button, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../components/settings';
import GeneralAnalytics from './Analytics/GeneralAnalytics';

// ----------------------------------------------------------------------


export default function PageOne() {



  const { themeStretch } = useSettingsContext();

  return (
    <>
      
        <GeneralAnalytics />
    </>
  );
}