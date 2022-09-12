import numeral from 'numeral';
import Chart from 'react-apexcharts';
import { Box, Grid, Typography, Card } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const ChartLine = () => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#7783DB'],
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      enabled: false
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    }
  };

  const chartSeries = [{ data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30] }];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
    />
  );
};

const data = {
  sales: {
    actualYear: 152996,
    lastYear: 121420
  },
  profit: {
    actualYear: 32100,
    lastYear: 25200
  },
  cost: {
    actualYear: 99700,
    lastYear: 68300
  }
};

const HomeOverview = (props) => (
  <Card {...props}>
    <Grid container>
      <Grid
        item
        md={4}
        xs={12}
        sx={{
          alignItems: 'center',
          border:{
            md: `1px solid rgba(145, 158, 171, 0.24)`
          },
          display: 'flex',
          justifyContent: 'space-between',
          p: 3
        }}
      >
        <div>
          <Typography
            color="textSecondary"
            variant="overline"
          >
            Total Balance
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {numeral(data.sales.actualYear).format('$0,0.00')}
          </Typography>
          
        </div>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: 54,
            width: 177
          }}
        >
          <ChartLine />
        </Box>
      </Grid>
      <Grid
        item
        md={4}
        xs={12}
        sx={{
          alignItems: 'center',
          border: {
            md: `1px solid rgba(145, 158, 171, 0.24)`
          },
          display: 'flex',
          justifyContent: 'space-between',
          p: 3
        }}
      >
        <div>
          <Typography
            color="textSecondary"
            variant="overline"
          >
            24h Portfolio Change
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {numeral(data.cost.actualYear).format('$0,0.00')}
          </Typography>
          
        </div>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: 54,
            width: 177
          }}
        >
          <ChartLine />
        </Box>
      </Grid>
      <Grid
        item
        md={4}
        xs={12}
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          p: 3,
          border: {
            md: `1px solid rgba(145, 158, 171, 0.24)`
          },
        }}
      >
        <div>
          <Typography
            color="textSecondary"
            variant="overline"
          >
            Total Profit Loss
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {numeral(data.profit.actualYear).format('$0,0.00')}

          </Typography>
          
        </div>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: 54,
            width: 177
          }}
        >
          <ChartLine />
        </Box>
      </Grid>
    </Grid>
  </Card>
);

export default HomeOverview;