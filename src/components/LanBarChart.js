import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const LanBarChart = () => {
  const chartRef = useRef(null);
  let myChart = null;

  const getOption = () => {
    return ({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: [
          "German",
          "Indonesian",
          "Romanian",
          "English",
          "Danish",
          "Dutch",
          "French",
          "Vietnamese",
          "Spanish"
        ],
      },
      series: [
        {
          name: 'negetive',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
          name: 'neutural',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'positive',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        }
      ]
    });
  };

  useEffect(() => {
    myChart = echarts.init(chartRef.current);
    myChart.setOption(getOption());
  }, []);

  return <div ref={chartRef} style={{ top:'100px', width: '600px', height: '500px' }}></div>;
};

export default LanBarChart;
