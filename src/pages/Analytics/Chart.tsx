import merge from 'lodash/merge';
import { useState } from 'react';
// @ts-ignore
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box, TextField, CardProps } from '@mui/material';
// components
// import { BaseOptionChart } from '../../../../components/chart';
import BaseOptionChart from 'src/assets/chart/BaseOptionChart';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chartLabels: string[];
  chartColors: string[];
  chartData: {
    year?: string;
    data: {
      name: string;
      data: number[];
    }[];
  }[];
}

export default function AppAreaInstalled({
  title,
  subheader,
  chartLabels,
  chartColors,
  chartData,
  ...other
}: Props) {
  const [seriesData, setSeriesData] = useState('2019');

  const handleChangeSeriesData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesData(event.target.value);
  };

  const chartOptions = merge(BaseOptionChart(), {
    colors: chartColors,
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <TextField
            fullWidth
            value={seriesData}
            
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              display: 'none',
              '& fieldset': { border: '0 !important' },
              '& select': {
                pl: 1,
                py: 0.5,
                pr: '24px !important',
                typography: 'subtitle2',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 0.75,
                bgcolor: 'background.neutral',
              },
              '& .MuiNativeSelect-icon': {
                top: 4,
                right: 0,
                width: 20,
                height: 20,
              },
            }}
          >
            {/* {chartData.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))} */}
          </TextField>
        }
      />
      {chartData.map((item, index) => (
        <Box key={index} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {/* {item.year === seriesData && ( */}
            <ReactApexChart type="line" series={item.data} options={chartOptions} height={364}  />
          {/* )} */}
        </Box>
      ))}
    </Card>
  );
}
