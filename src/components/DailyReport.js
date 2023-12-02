import React, { useRef,useEffect, useState } from "react";
import AvatarSelector from './AvatarSelector';
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import ApiService from '../service/ApiService';

export default function DailyReport() {
    const [bidenData, setBidenData] = useState([]);
    const [trumpData, setTrumpData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const bidendata = await ApiService.getData('/getBidenHourly');
              const trumpdata = await ApiService.getData('/getTrumpHourly');
              setBidenData(bidendata);
              setTrumpData(trumpdata);
            } catch (error) {
              console.error('Error fetching data', error);
            }
          };
          fetchData();

    }, []);
    const option = {
        title: {
          text: 'Biden vs Trump',
          subtext: 'Number of tweets per hour'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Biden', 'Trump']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: false }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',

            data: bidenData.map(d => d.hour)
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Biden',
            type: 'bar',
            data: bidenData.map(d => d.count),
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          },
          {
            name: 'Trump',
            type: 'bar',
            data: trumpData.map(d => d.count),
            markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' }
                ]
              },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            }
          }
        ]
      };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '120vh' 
        }}>
            <ReactEcharts
                option={option}
                style={{ width: '1000px', height: '600px' }}
            />
        </div>
    )
}