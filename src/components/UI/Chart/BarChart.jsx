import React from 'react';
import ReactApexChart from 'react-apexcharts';

const _ = require('lodash');

export default function BarChart({ series, options, height }) {
  const chartOptions = {
    plotOptions: {
      bar: { horizontal: true, barHeight: '80%', borderRadius: 2 },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff'],
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
  };

  return <ReactApexChart type="bar" series={series} options={_.merge(chartOptions, options)} height={height} />;
}
