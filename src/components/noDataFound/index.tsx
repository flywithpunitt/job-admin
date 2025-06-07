// @mui
import { styled } from '@mui/material/styles';
import { Typography, Box, BoxProps, Stack } from '@mui/material';
//
// import Image from './Image';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  title: string;
  img?: string;
  description?: string;
}

export default function EmptyContent({ title, description, img, ...other }: Props) {
  return (
    <RootStyle {...other}>
      <Stack direction='column' alignContent='center' justifyContent='center' alignItems='center' display='flex'>
      <Box component='img' src='/nodata.png' />
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
      </Stack>
    </RootStyle>
  );
}
