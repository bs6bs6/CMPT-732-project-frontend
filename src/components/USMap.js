import React,{useRef,useState,useEffect} from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import geoJson from './USMapData.json'
import AvatarSelector from './AvatarSelector';
import ApiService from '../service/ApiService';
import WordCloud from "./WordCloud";

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
const initData = [
  { name: 'Alabama', value: 4822023 },
  { name: 'Alaska', value: 731449 },
  { name: 'Arizona', value: 6553255 },
  { name: 'Arkansas', value: 2949131 },
  { name: 'California', value: 38041430 },
  { name: 'Colorado', value: 5187582 },
  { name: 'Connecticut', value: 3590347 },
  { name: 'Delaware', value: 917092 },
  { name: 'District of Columbia', value: 632323 },
  { name: 'Florida', value: 19317568 },
  { name: 'Georgia', value: 9919945 },
  { name: 'Hawaii', value: 1392313 },
  { name: 'Idaho', value: 1595728 },
  { name: 'Illinois', value: 12875255 },
  { name: 'Indiana', value: 6537334 },
  { name: 'Iowa', value: 3074186 },
  { name: 'Kansas', value: 2885905 },
  { name: 'Kentucky', value: 4380415 },
  { name: 'Louisiana', value: 4601893 },
  { name: 'Maine', value: 1329192 },
  { name: 'Maryland', value: 5884563 },
  { name: 'Massachusetts', value: 6646144 },
  { name: 'Michigan', value: 9883360 },
  { name: 'Minnesota', value: 5379139 },
  { name: 'Mississippi', value: 2984926 },
  { name: 'Missouri', value: 6021988 },
  { name: 'Montana', value: 1005141 },
  { name: 'Nebraska', value: 1855525 },
  { name: 'Nevada', value: 2758931 },
  { name: 'New Hampshire', value: 1320718 },
  { name: 'New Jersey', value: 8864590 },
  { name: 'New Mexico', value: 2085538 },
  { name: 'New York', value: 19570261 },
  { name: 'North Carolina', value: 9752073 },
  { name: 'North Dakota', value: 699628 },
  { name: 'Ohio', value: 11544225 },
  { name: 'Oklahoma', value: 3814820 },
  { name: 'Oregon', value: 3899353 },
  { name: 'Pennsylvania', value: 12763536 },
  { name: 'Rhode Island', value: 1050292 },
  { name: 'South Carolina', value: 4723723 },
  { name: 'South Dakota', value: 833354 },
  { name: 'Tennessee', value: 6456243 },
  { name: 'Texas', value: 26059203 },
  { name: 'Utah', value: 2855287 },
  { name: 'Vermont', value: 626011 },
  { name: 'Virginia', value: 8185867 },
  { name: 'Washington', value: 6897012 },
  { name: 'West Virginia', value: 1855413 },
  { name: 'Wisconsin', value: 5726398 },
  { name: 'Wyoming', value: 576412 },
  { name: 'Puerto Rico', value: 3667084 }
];
initData.sort(function (a, b) {
  return a.value - b.value;
});

export default function USMapChart() {
  
  const [selectedState, setSelectedState] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [mapData, setMapData] = useState([]);
  const [bidenData, setBidenData] = useState([]);
  const [trumpData, setTrumpData] = useState([]);
  const [competeData, setCompeteData] = useState([]);
  const [option, setOption] = useState(null);
  const [isMap, setIsMap] = useState(true);
  const [wordCloudData, setWordCloudData] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState('biden'); 
  const [isCompete, setIsCompete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bidenData = await ApiService.getData('/getBiden');
        const trumpData = await ApiService.getData('/getTrump');
        const competeData = await ApiService.getData('/getCompete');

        setMapData(bidenData || initData); 
        setBidenData(bidenData); 
        setTrumpData(trumpData);
        setCompeteData(competeData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let mapOption;
    if(isCompete){
       mapOption = {
        tooltip: {
          trigger: 'item', 
          formatter: function (params) {
            return `${params.name}<br/>Winner: ${params.value>0 ? "Trump" : 'Biden'}`;
          }
        },
        visualMap: {
          left: 'right',
          top : '100pt',
          type: 'piecewise',
          pieces: [
            { min: 0, max: 200, color: '#9ebcda' },   
            { min: 200, max: 300, color: '#8c6bb1' }, 
            { min: 300, max: 500, color: '#88419d' }, 
            { min: 500, max: 1000, color: '#4d004b' }, 
            { min: 1000, max: 1500, color: '#4d004b' }, 
            { min: 1500, max: 2500, color: '#810f7c' }, 
            { min: 2500, max: 3000, color: '#8c6bb1' }, 
            { min: 3000, max: 3500, color: '#8c96c6' }, 
            { min: 3500, max: 5000, color: '#9ebcda' }, 
            { min: 5000, max: 10000, color: '#6baed6' }, 
            { min: 10000, max: 20000, color: '#4292c6' }, 
            { min: 20000, color: '#2171b5' } 
          ],
    
          calculable: true
        },
        
        series: [
          {
            id: 'tweets',
            type: 'map',
            roam: true,
            map: 'USA',
            animationDurationUpdate: 1000,
            universalTransition: true,
            scaleLimit: { 
              min: 0.5,    
              max: 8    
            },
            data: mapData
          }
        ]
      };
    }else{
       mapOption = {
        tooltip: {
          trigger: 'item', 
          formatter: function (params) {
            return `${params.name}<br/>Tweet Number: ${params.value ? params.value.toLocaleString() : 'N/A'}`;
          }
        },
        visualMap: {
          left: 'right',
          top : '100pt',
          type: 'piecewise',
          pieces: [
            { min: 0, max: 200, color: '#9ebcda' },   
            { min: 200, max: 300, color: '#8c6bb1' }, 
            { min: 300, max: 500, color: '#88419d' }, 
            { min: 500, max: 1000, color: '#4d004b' }, 
            { min: 1000, max: 1500, color: '#4d004b' }, 
            { min: 1500, max: 2500, color: '#810f7c' }, 
            { min: 2500, max: 3000, color: '#8c6bb1' }, 
            { min: 3000, max: 3500, color: '#8c96c6' }, 
            { min: 3500, max: 5000, color: '#9ebcda' }, 
            { min: 5000, max: 10000, color: '#6baed6' }, 
            { min: 10000, max: 20000, color: '#4292c6' }, 
            { min: 20000, color: '#2171b5' } 
          ],
    
          calculable: true
        },
        
        series: [
          {
            id: 'tweets',
            type: 'map',
            roam: true,
            map: 'USA',
            animationDurationUpdate: 1000,
            universalTransition: true,
            scaleLimit: { 
              min: 0.5,    
              max: 8    
            },
            data: mapData
          }
        ]
      };
    }
    console.log(mapOption);
    console.log(isCompete);
    const barOption = {
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        axisLabel: {
          rotate: 30
        },
        data: mapData.map(function (item) {
          return item.name;
        })
      },
      animationDurationUpdate: 1000,
      series: [{
        type: 'bar',
        id: 'tweets',
        itemStyle: {color : '#4292c6'},
        data: mapData.map(function (item) {
          return item.value;
        }),
        universalTransition: true,
      }]
    };
    if(isMap){
      setOption(mapOption);
    }else{
      setOption(barOption);
    }
  },[mapData,isMap,isCompete])

 
  const echartsRef = useRef(null); // 

  useEffect(() => {
    if (echartsRef.current) {
      const echartsInstance = echartsRef.current.getEchartsInstance();

      const onClick = (params) => {
        if (params.componentType === 'series' && params.seriesType === 'map') {
          handleMapClick(params);
        }
      };
      echartsInstance.on('click', onClick);

      return () => {
        echartsInstance.off('click', onClick);
      };
    }
  }, [echartsRef.current]); 

  const transformDataToWordCloudFormat = (data) => {
    const transformedData = [];
    for (const word in data.words) {
      if (data.words.hasOwnProperty(word)) {
        transformedData.push({
          name: word,
          value: data.words[word]
        });
      }
    }
  
    return transformedData;
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
    setIsCompete(true);
  }
  
  const fetchWords = async (state, candidate) => {
    try {

        let wordsData = await ApiService.getWords({ state, candidate });
        wordsData = transformDataToWordCloudFormat(wordsData);
        setWordCloudData(wordsData);
    } catch (error) {
        console.error('Error fetching word data', error);
    }
  };


  useEffect(() => {

    if (selectedState && selectedAvatar) {
        fetchWords(selectedState.name, selectedAvatar);
    }
  }, [selectedState]); 

  const handleMapClick = (params) => {
    setSelectedState(params.data);
    setShowPopup(true);
  };

  const handleAvatarSelection = (avatarType) => {

    setMapData(avatarType === 'biden' ? bidenData : trumpData)
    setSelectedAvatar(avatarType);
    setIsCompete(false);
  };

  const handleChecked = () => {
    setIsMap(!isMap)
  }

  return (
    <div>
      <AvatarSelector onAvatarSelect={handleAvatarSelection} onCompeteClick={handleCompeteClick} onChecked = {handleChecked}/>
      {option && <ReactEcharts
        ref = {echartsRef}
        option={option}
        style={{ width: "100vw", height: "100vh" }}
      />}
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
          zIndex: 1001,
          minWidth: "300px", 
          maxWidth: "600px", 
          minHeight: "200px", 
          maxHeight: "400px", 
          // overflow: "auto" 
        }}>
          <h3>{selectedState.name}</h3>
          {!isCompete&&(<p>Tweets Number: {selectedState.value ? selectedState.value.toLocaleString() : 'N/A'}</p>) }         
          {wordCloudData.length>1&&<div style={{ marginTop: "-80px" }}><WordCloud wordCloudData={wordCloudData}/></div>}

          <button onClick={() => setShowPopup(false)} style={{
            position: "absolute",
            top: 0,
            right: 0,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "10px",
            fontSize: "20px"
          }}>×</button>

        </div>
    )}
     
    </div>
  );
};