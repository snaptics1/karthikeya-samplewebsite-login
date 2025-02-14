import React from "react";
import Chart from "react-apexcharts";

const PolarAreaChart = () => {
  const options = {
    series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
    chart: {
      type: 'polarArea',
    },
    stroke: {
      colors: ['#fff']
    },
    fill: {
      opacity: 0.8
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div id="chart">
      <Chart options={options} series={options.series} type="polarArea" />
    </div>
  );
};

export default PolarAreaChart;
