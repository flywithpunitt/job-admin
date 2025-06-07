import merge from 'lodash/merge';

// @mui
import { Card, CardHeader, Box, CardProps } from '@mui/material';
// @ts-ignore
import ReactApexChart from 'react-apexcharts'
import BaseOptionChart from 'src/assets/chart/BaseOptionChart';
// components
// import { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chartLabels?: string[];
  chartColors?: string[];
  
  chartData: {
    name: string;
    type?: string;
    fill?: string;
    data: number[];
  }[];
}

export default function AnalyticsWebsiteVisits({
  title,
  subheader,
  chartColors,
  chartLabels,
  chartData,
  ...other
}: Props) {
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    colors: chartColors,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y: number) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}

