import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const LanBarChart = () => {
  const chartRef = useRef(null);
  let myChart = null;

  const getOption = () => {
    return {
      title: {
        text: 'language'
      },
      tooltip: {},
      xAxis: {
        data: ['english', 'germany', 'spanish', 'french', 'chinese', 'japanese']
      },
      yAxis: {},
      series: [{
        name: 'tweets by language',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };
  };

  useEffect(() => {
    myChart = echarts.init(chartRef.current);
    myChart.setOption(getOption());
  }, []);

  return <div ref={chartRef} style={{ width: '600px', height: '400px' }}></div>;
};

export default LanBarChart;
