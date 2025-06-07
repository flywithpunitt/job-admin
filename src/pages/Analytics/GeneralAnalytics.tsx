// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography, CircularProgress, } from "@mui/material";
// hooks

// components

import AnalyticsWidgetSummary from "./AnalyticsWidgetSummary";

import Page from "./Page";
import {  useMemo, useState } from "react";
import AppAreaInstalled from "./Chart";
import { useGetDashboardQuery } from "src/services";
import { Link } from "react-router-dom";
import { PATH_DASHBOARD } from "src/routes/paths";
import { useSettingsContext } from "src/components/settings";




// sections

// ----------------------------------------------------------------------


export default function GeneralAnalytics() {

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const d = new Date();
  let name = month[d.getMonth()];



  const { data,isLoading} = useGetDashboardQuery({})

//job
  const [currentDate, setCurrentDate] = useState([])
  const [jobCount, setJobCount] = useState([])
 
  //candidate
  const [currentCandidateDate, setCurrenCandidatetDate] = useState([])
  const [candidateCount, setCandidateCount] = useState([])

//employer
  const [currentEmployerDate, setCurrentEmployerDate] = useState([])
  const [employerCount, setEmployerCount] = useState([])

//application
  const [currentApplicationDate, setCurrentApplicationDate] = useState([])
  const [applicationCount, setApplicationCount] = useState([])


  let createdAt: any = []
  let jobArray: any = []

const jobData = useMemo(() => {
    const job = data?.job_trends?.map((item: any) => {
   
      
      createdAt.push(item.created)
      jobArray.push(item.count)
      setCurrentDate(createdAt)
      setJobCount(jobArray)
     
      
    })
  }, [data])


  let candidateDate: any = []
  let candidateArray: any = []

const canidateData = useMemo(() => {
    const candidtae = data?.candidate_trends?.map((item: any) => {
  
      
      candidateDate.push(item.created)
      candidateArray.push(item.count)
      setCurrenCandidatetDate(createdAt)
      setCandidateCount(jobArray)
     
      
    })
  }, [data])

  let employerDate: any = []
  let employerArray: any = []

const employerData = useMemo(() => {
    const employer = data?.employer_trends?.map((item: any) => {
   
    
      employerDate.push(item.created)
      employerArray.push(item.count)
      setCurrentEmployerDate(employerDate)
      setEmployerCount(employerArray)
    })
  }, [data])

  let applicationDate: any = []
  let applicationArray: any = []

const applicationData = useMemo(() => {
    const application = data?.application_trends?.map((item: any) => {
  

      applicationDate.push(item.created)
      applicationArray.push(item.count)
      setCurrentApplicationDate(applicationDate)
      setApplicationCount(applicationArray) 
    })
  }, [data])


  const { themeStretch } = useSettingsContext();



  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <>
        {
          isLoading ? <CircularProgress /> :  
          <Container maxWidth={themeStretch ? false : 'xl'}>  
           <Typography variant="h3" component="h3" paragraph>
        Dashboard
      </Typography>
           <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
          <Link to={PATH_DASHBOARD.candidates.list} style={{ textDecoration: 'none' }}> 
            <AnalyticsWidgetSummary
              title="Candidates"
              total={234}
              color="warning"
              icon={"vaadin:group"}
              value={data?.candidates}
            />
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <Link to={PATH_DASHBOARD.jobs.list} style={{ textDecoration: 'none' }}> 
            <AnalyticsWidgetSummary
              title="Job Listings"
              total={234}
              color="success"
              icon={"material-symbols:lists-rounded"}
              value={data?.listings}
            />
             </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <Link to={PATH_DASHBOARD.user.list} style={{ textDecoration: 'none' }}> 
            <AnalyticsWidgetSummary
              title="Users"
              total={234}
              color="error"
              icon={"clarity:employee-group-solid"}
              value={data?.users}
            />
             </Link>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppAreaInstalled
              title="Job Trend"
              subheader={`Trend of ${name}`}
              chartLabels={currentDate}
              chartColors={[
                theme.palette.success.main,
                theme.palette.error.main,
                theme.palette.info.main,
                theme.palette.warning.main
              ]}
              chartData={[
                {
                  data: [
                    { name: 'trends', data: jobCount },
                  
                  ],
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppAreaInstalled
              title="Candidate Trend"
              subheader={`Trend of ${name}`}
              chartLabels={currentCandidateDate}
              chartColors={[
                theme.palette.success.main,
                theme.palette.error.main,
                theme.palette.info.main,
                theme.palette.warning.main
              ]}
              chartData={[
                {
                  data: [
                    { name: 'trends', data: candidateCount },
                  
                  ],
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppAreaInstalled
              title="Employer trend"
              subheader={`Trend of ${name}`}
              chartLabels={currentEmployerDate}
              chartColors={[
                theme.palette.success.main,
                theme.palette.error.main,
                theme.palette.info.main,
                theme.palette.warning.main
              ]}
              chartData={[
                {
                  data: [
                    { name: 'trends', data: employerCount },
                  
                  ],
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppAreaInstalled
              title="Application Trends"
              subheader={`Trend of ${name}`}
              chartLabels={currentApplicationDate}
              chartColors={[
                theme.palette.success.main,
                theme.palette.error.main,
                theme.palette.info.main,
                theme.palette.warning.main
              ]}
              chartData={[
                {
                  data: [
                    { name: 'trends', data: applicationCount },
                  
                  ],
                },
              ]}
            />
          </Grid>
        </Grid>
        </Container>
        }
    
      </>
    </Page>
  );
}
