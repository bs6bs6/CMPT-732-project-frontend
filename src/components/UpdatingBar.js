import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import ApiService from '../service/ApiService';

const UpdatingBar = () => {
    const chartRef = useRef(null);
    const myChart = useRef(null);
    const updateFrequency = 1000;
    const dimension = 0;

    const countryColors = {
      Germany: '#00008b',
      India: '#f00',
      Romania: '#ffde00',
      Denmark: '#002a8f',
      Netherlands: '#003580',
      France: '#ed2939',
      Spain: '#003897',
      'Viet Nam': '#000',
      Norway: '#ef2b2d',
      'United States': '#b22234'
      };

    useEffect(() => {
        myChart.current = echarts.init(chartRef.current);

        Promise.all([
            fetch('/flags.json').then(response => response.json()),
            ApiService.getData('/getCumulative')
        ]).then(([flags, data]) => {
            // const years = data.map(item => item[4]).filter((value, index, self) => self.indexOf(value) === index);
            const years = [...new Set(data.map(item => item.date))].sort();
            const startYear = years[0];

            const getFlag = (countryName) => {
                console.log(countryName);
                if (!countryName) {
                    return '';
                }
                const flag = flags.find((item) => item.name === countryName);
                return flag ? flag.emoji : '';
            };

            const option = {
                grid: {
                  top: 10,
                  bottom: 30,
                  left: 150,
                  right: 80
                },
                xAxis: {
                  type:'log',
                  max: 'dataMax',
                  axisLabel: {
                    formatter: function (n) {
                      return Math.round(n) + '';
                    }
                  }
                },
                dataset: {
                  // source: data.slice(1).filter(function (d) {
                  //   return d[4] === startYear;
                  // })
                  source: data.filter(d => d.date === startYear).map(d => [d.cumulative, d.language])
                },
                yAxis: {
                  type: 'category',
                  // type:'log',
                  inverse: true,
                  max: 10,
                  axisLabel: {
                    show: true,
                    fontSize: 14,
                    formatter: function (value) {
                      return value + '{flag|' + getFlag(value) + '}';
                    },
                    rich: {
                      flag: {
                        fontSize: 25,
                        padding: 5
                      }
                    }
                  },
                  animationDuration: 300,
                  animationDurationUpdate: 300
                },
                series: [
                  {
                    realtimeSort: true,
                    seriesLayoutBy: 'column',
                    type: 'bar',
                    itemStyle: {
                      color: function (param) {
                        return countryColors[param.name] || '#5470c6';
                      }
                    },
                    encode: {
                      x: dimension,
                      y: 3
                    },
                    label: {
                      show: true,
                      precision: 1,
                      position: 'right',
                      valueAnimation: true,
                      fontFamily: 'monospace'
                    }
                  }
                ],
                // Disable init animation.
                animationDuration: 0,
                animationDurationUpdate: updateFrequency,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear',
                graphic: {
                  elements: [
                    {
                      type: 'text',
                      right: 160,
                      bottom: 60,
                      style: {
                        text: startYear,
                        font: 'bolder 80px monospace',
                        fill: 'rgba(100, 100, 100, 0.25)'
                      },
                      z: 100
                    }
                  ]
                }
              };

            myChart.current.setOption(option);

            const updateYear = (year) => {
              let source = data.filter(d => d.date === year).map(d => [d.cumulative, d.language]);
              option.series[0].data = source;
              option.graphic.elements[0].style.text = year;
              myChart.current.setOption(option);
          };

            for (let i = 0; i < years.length - 1; ++i) {
                setTimeout(() => updateYear(years[i + 1]), i  * updateFrequency);
            }
        });

        return () => {
            if (myChart.current) {
                myChart.current.dispose();
            }
        };
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div ref={chartRef} style={{ width: '1000px', height: '400px' }} />
        </div>
    );
}
export default UpdatingBar;
