import React,{useState,useEffect} from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import geoJson from './USMapData.json'
import AvatarSelector from './AvatarSelector';
import ApiService from '../service/ApiService';

const data = [
  {name: 'Alabama',value: 1},
  {name: 'California',value: 0},
  {name: 'Ohio',value: 1},
]

echarts.registerMap('USA', geoJson, {
  Alaska: {     
    left: -149,
    top: 49,
    width: 23
  },
  Hawaii: {
    left: -141,
    top: 28,
    width: 5
  },
  'Puerto Rico': {     
    left: -76,
    top: 20,
    width: 2
  }
});


export default function USMapChart() {   

  const [selectedState, setSelectedState] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [mapData, setMapData] = useState([]);
  const [bidenData, setBidenData] = useState([]);
  const [trumpData, setTrumpData] = useState([]);
  const [competeData, setCompeteData] = useState([]);


  useEffect(() => {
    const fetchBidenData = async () => {
      try {
        const data = await ApiService.getData('/getBiden');
        setBidenData(data);
        setMapData(data); // default map data:biden
      } catch (error) {
        console.error('Fetching Biden data failed', error);
      }
    };

    const fetchTrumpData = async () => {
      try {
        const data = await ApiService.getData('/getTrump');
        setTrumpData(data);
      } catch (error) {
        console.error('Fetching Trump data failed', error);
      }
    };

    const fetchCompeteData = async () => {
      try {
        const data = await ApiService.getData('/getCompete');
        setCompeteData(data);
      } catch (error) {
        console.error('Fetching compete data failed', error);
      }
    };

    fetchBidenData();
    fetchTrumpData();
    fetchCompeteData();

  }, []);


  const mapOption = {
    tooltip: {
      trigger: 'item', 
      formatter: function (params) {
        return `${params.name}<br/>Tweet Number: ${params.value ? params.value.toLocaleString() : 'N/A'}`;
      }
    },
    visualMap: {
      left: '1200pt',
      top : '100pt',
      // min: 10,
      // max: 34512,    
      // inRange: {      
      //  color: ['#e6f598', '#fee08b', '#fdae61', '#f46d43', '#d53e4f', '#9e0142']
      // },
      // text: ['High', 'Low'],
      type: 'piecewise',
      pieces: [
        { min: 0, max: 100, color: '#e5f5e0' },
        { min: 100, max: 200, color: '#c7e9c0' },
        { min: 200, max: 300, color: '#a1d99b' },
        { min: 300, max: 400, color: '#74c476' },
        { min: 400, max: 500, color: '#41ab5d' },
        { min: 500, max: 1000, color: '#238b45' },
        { min: 1000, max: 1500, color: '#006d2c' },
        { min: 1500, max: 2000, color: '#00441b' },
        { min: 2000, max: 2500, color: '#003d1b' },
        { min: 2500, max: 3000, color: '#003315' },
        { min: 3000, max: 3500, color: '#002c0f' },
        { min: 3500, max: 5000, color: '#002109' },
        { min: 5000, max: 10000, color: '#001a06' },
        { min: 10000, max: 20000, color: '#001b03' },
        { min: 20000, color: '#001702' }
      ],

      calculable: true
    },
    
    series: [
      {
        id: 'tweets by state',
        type: 'map',
        roam: true,
        map: 'USA',
        animationDurationUpdate: 1000,
        universalTransition: true,
        scaleLimit: { 
          min: 0.5,    
          max: 8    
        },
        data: mapData,
      }
    ]
  };
  function processData(data){
    return data.map(item => ({
      name: item.name, 
      value: item.value,
      itemStyle: {
        color: item.value === 1 ? '#ff4d4d' : '#4d79ff', // Trump: red, Biden: blue
      }
    }));
  }
  function handleCompeteClick() {
    const processedData = processData(competeData)
    setMapData(processedData);
  }
  

  const handleMapClick = (params) => {
    setSelectedState(params.data);
    setShowPopup(true);
  };

  const handleAvatarSelection = (avatarType) => {
    console.log("选中的头像是: ", avatarType);
    // 这里您可以处理选中头像后的逻辑
    setMapData(avatarType === 'biden' ? bidenData : trumpData)
  };

  return (
    <div>
      <AvatarSelector onAvatarSelect={handleAvatarSelection} onCompeteClick={handleCompeteClick}/>
      <ReactEcharts
        option={mapOption}
        style={{ width: "100vw", height: "100vh" }}
        onEvents={{
          'click': handleMapClick,
        }}
      />
    {showPopup && selectedState && (
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          zIndex: 1001 // 确保弹窗在地图之上
        }}>
          <h3>{selectedState.name}</h3>
          <p>Tweets Number: {selectedState.value ? selectedState.value.toLocaleString() : 'N/A'}</p>
          <p>Trending words: {selectedState.value ? selectedState.value.toLocaleString() : 'N/A'}</p>

          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
    )}
    </div>
  );
};