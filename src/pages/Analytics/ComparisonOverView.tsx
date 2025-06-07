// @mui
import { Card, CardHeader, Typography, LinearProgress, CardProps, Stack } from '@mui/material';
import Label from 'src/components/table/Label';
// utils

// ----------------------------------------------------------------------

type ItemProps = {
   label: string;
   amount: number;
   value: number;
};

interface Props extends CardProps {
   title?: string;
   subheader?: string;
}

export default function ComparisonOverView({ title, subheader, ...other }: Props) {
   return (
      <Card {...other} sx={{ height: 250, padding: 5 }} >
         <CardHeader title={title} subheader={subheader} />

         <Stack spacing={2}>
            <Stack direction="row" alignItems="center" mt={2}>
               <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                  First Template
               </Typography>
            </Stack>
            <LinearProgress
               variant="determinate"
               value={70}
               color={'success'}
               sx={{height: 10}}

            />
            <LinearProgress
               variant="determinate"
               value={20}
               color={'info'}
               sx={{height: 10}}
            />
            <LinearProgress
               variant="determinate"
               value={39}
               color={'warning'}
               sx={{height: 10}}
            />
         </Stack>
      </Card>
   );
}

// ----------------------------------------------------------------------
