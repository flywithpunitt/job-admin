import { Link, Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Button, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';
import { Column } from 'src/components/table';

import { useQuery } from '@apollo/client';
import Iconify from 'src/components/iconify/Iconify';
import { PATH_DASHBOARD } from 'src/routes/paths';

import RecipeReviewCard from './BlogCard';
import Card from 'src/theme/overrides/Card';
import NoDataBanner from 'src/components/NoDataBanner';
import { useGetBlogQuery } from 'src/services';



// ----------------------------------------------------------------------

const Blog = () => {
  const { themeStretch } = useSettingsContext();

const { data ,isLoading} = useGetBlogQuery({})




  return (
    <>
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <Stack direction='row' justifyContent='space-between' display='flex' p={5}>
      <Typography variant="h3" component="h3" paragraph>
          Blog
        </Typography>
        <Button
          sx={{ height: 45 }}
          variant="contained"
          component={RouterLink}
          // to={''}
          to={PATH_DASHBOARD.blog.new}
          startIcon={<Iconify icon={'eva:plus-fill'} />}
        >
          New Blog
        </Button>
      </Stack>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        {isLoading ?
          <Stack direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress sx={{ mt: 5, fontSize: '2rem' }} />
          </Stack>
          :
          <Grid container spacing={3}>
            {
              data?.data?.length == 0 ?
                <Stack direction="row" justifyContent="center" alignItems="center" margin='auto'>
                  <NoDataBanner text='No Blog Available !' />
                </Stack>
                :
                <>
                  {data?.data.map((data: any, index: number) => {
                   
                    
                    return (
                      <Grid item md={6} lg={4} sm={6} key={index}>
                        {/* <Link to={PATH_DASHBOARD.blog.view(data.id)} style={{ textDecoration: 'none' }}> */}
                        <RecipeReviewCard card={data?.id} title={data.title}
                          updateAt={data.createdAt} src={data.cover} description1={data.description} status={data?.status} />
                          {/* </Link> */}
                      </Grid>
                    )
                  })}
                </>
            }

          </Grid>
          
        }
        <Box></Box>
      </Container>
    </>
  );
}

export default Blog
