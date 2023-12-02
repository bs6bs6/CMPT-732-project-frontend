import React from "react";
import ReactEcharts from "echarts-for-react";
import 'echarts-wordcloud';

const mockData = [
    {name: 'Farrah Abraham',value: 366},
    {name: 'Faham',value: 666},
    {name: 'F Abraham',value: 466},
]
    

export default function WordCloud(props){
    const { wordCloudData } = props;
    console.log("wordCloudData: ", wordCloudData)
    const getOption = () => {
        return {
          series: [{
            type: 'wordCloud',
            gridSize: 2,
            sizeRange: [12, 50],
            rotationRange: [-90, 90],
            shape: 'pentagon',
            width: '100%',
            height: '100%',
            drawOutOfBound: false,
            textStyle: {
              normal: {
                color: function() {
                  return 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                  ].join(',') + ')';
                }
              }
            },
            data: wordCloudData
          }]
        };
      };
      

      return (
        <div>
          <ReactEcharts option={getOption()} style={{ height: '400px', width: '100%' }} />
        </div>
      );
}