import React, { useRef, useEffect,useState } from 'react';
import * as echarts from 'echarts';
import ApiService from '../service/ApiService';
import biden from '../assets/svg/joe-biden.svg';
import trump from '../assets/svg/trump.svg';

const LanBarChart = () => {
  const chartRef = useRef(null);
  let myChart = null;
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [bidenData, setBidenData] = useState([]);
  const [trumpData, setTrumpData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseBiden = await ApiService.getData('/getBidenState');
      const responseTrump = await ApiService.getData('/getTrumpState');

      setBidenData(transformDataToSeries(responseBiden));
      setTrumpData(transformDataToSeries(responseTrump));
      setCurrentData(transformDataToSeries(responseBiden));

    };
    fetchData();

  }, []);
  
  const transformDataToSeries = (data) => {
    const negativeData = [];
    const neutralData = [];
    const positiveData = [];
    const categories = [];
  
    data.forEach(item => {

      categories.push(item.state);
      negativeData.push(item.negative);
      neutralData.push(item.neutral);
      positiveData.push(item.positive);
    });
    return {
      negativeData,
      neutralData,
      positiveData,
      categories
    }
  };
  // 切换数据展示
  const handleAvatarClick = (avatarType) => {
   
    if (avatarType === 'biden') {
      setCurrentData(bidenData);
      console.log(currentData);
    } else {
      setCurrentData(trumpData);
      console.log(currentData);
    }
    setSelectedAvatar(avatarType);
};
const getAvatarStyle = (avatarType) => ({
  width: 100,
  height: 100,
  borderRadius: '50%',
  cursor: 'pointer',
  border: selectedAvatar === avatarType ? '3px solid #007bff' : 'none',
});
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
        type: 'value', 
      },
      yAxis: {
        type: 'category',
        data: currentData.categories
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
          data: currentData.negativeData
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
          data: currentData.neutralData
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
          data: currentData.positiveData
        }
      ]
    });
  };

  useEffect(() => {
    myChart = echarts.init(chartRef.current);
    // 侦听 currentData 的变化来更新图表
    myChart.setOption(getOption());
  }, [selectedAvatar]);
  
  return (<div>
    <div style={{
              position: 'absolute',
              top: '20%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '20px', 
              zIndex: 1001 
        }}>
            <img 
                src={biden}
                alt="Joe Biden Avatar"
                style={getAvatarStyle('biden')}
                onClick={() => handleAvatarClick('biden')} 
            />
            <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // Center items horizontally in the flex container
                        justifyContent: 'center', // Center items vertically in the flex container
            }}>

            </div>
            <img 
                src={trump}
                alt="Donald Trump Avatar"
                style={getAvatarStyle('trump')}
                onClick={() => handleAvatarClick('trump')} 
            />
        </div>
    <div ref={chartRef} style={{ top:'100px', width: '600px', height: '500px' }}></div>
  </div>
  )
  ;
};

export default LanBarChart;
