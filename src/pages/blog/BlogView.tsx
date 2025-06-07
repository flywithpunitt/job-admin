// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Avatar, SpeedDial, Typography, SpeedDialAction, Container, Button, Stack, CircularProgress } from '@mui/material';
// @types
// components
import { useParams } from 'react-router';

import { PATH_DASHBOARD } from 'src/routes/paths';
import { useGetBlogByIdQuery } from 'src/services/blog';
import Page from '../Analytics/Page';
import EmptyContent from 'src/components/noDataFound';
import Iconify from 'src/components/iconify';
import { DataRouterStateContext } from 'react-router/dist/lib/context';

// ----------------------------------------------------------------------


const OverlayStyle = styled('h1')(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.4),
}));

const TitleStyle = styled('h1')(({ theme }) => ({
  ...theme.typography.h2,
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

const FooterStyle = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  post: any;
};

export default function BlogPostsDetails() {
  const { id } = useParams();
 
  const { data,isLoading } = useGetBlogByIdQuery(id);


  const hasContent = data?.description || data?.content;

  const element = data?.content;

  return (
    <>
    {isLoading ?
          <Stack direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress sx={{ mt: 5, fontSize: '2rem' }} />
          </Stack>
          :<>
      <Page title="Blog: Post">
        <Container>
          
        <Stack direction='row' justifyContent='space-between' display='flex' p={2}>
                <Typography variant="h2" component="h1" paragraph>
                   {data?.title}
                </Typography>
           
            </Stack>
        </Container>
      </Page>
      <Box sx={{ position: 'relative' }}>
        

        <FooterStyle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
                {data?.created_By}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
                {data?.created_At}
              </Typography>
            </Box>
          </Box>
        </FooterStyle>

        <OverlayStyle />
        {/* <Image alt="post cover" src={data?.coverImage} /> */}
        <Box component='img' src={data?.cover}  alt="post cover"/>
      </Box>

      {hasContent ? (
        <Container>
          <Box sx={{ mt: 5, mb: 10 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Description
            </Typography>

            <Typography variant="body1" sx={{ mb: 5, wordWrap: 'break-word' }}>
              {data?.description}
            </Typography>

            <Typography variant="h3" sx={{ mb: 2 }}>
              Content
            </Typography>
            <Typography variant="body1" sx={{ mb: 5, wordWrap: 'break-word' }}>
              <div dangerouslySetInnerHTML={{ __html: element as string }} />
            </Typography>
          </Box>
        </Container>
      ) : (
        <EmptyContent title="Empty content" />
      )}</>}
    </>
  );
}