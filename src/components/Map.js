import React, { useRef,useEffect, useState } from "react";
import USAMap from "react-usa-map";
import statesJson from "../assets/states.json";

import Button from "@mui/material/Button";

export default function Map() {
  const states = statesJson;
  
  const [colorMap, setColorMap] = useState({});
  const [showBubble, setShowBubble] = useState(false); 
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0 }); 
  const [data, setData] = useState(''); 
  const mapRef = useRef(null);

  const mapHandler = (e) => {
    const cur = e.target.dataset.name;
    console.log(e.target.title);
    if(showBubble===false){
      const newColorMap = {...colorMap};
      newColorMap[cur] = { fill: "#FF69B4"};
      setColorMap(newColorMap);
      console.log(newColorMap);
      const mapRect = mapRef.current.getBoundingClientRect();

      const bubbleX = e.pageX - mapRect.left;
      const bubbleY = e.pageY - mapRect.top;
      setBubblePosition({ x: bubbleX, y: bubbleY });
      const newData = `${states[cur]}`;
      setData(newData);
      setShowBubble(true);
    }else{
      const newColorMap = {...colorMap};
      delete newColorMap[cur];
      setColorMap(newColorMap);
      console.log(newColorMap);     
      setShowBubble(false);

    }
    // 获取地图元素的位置

    
  };


  return (
    <div ref={mapRef} style={{ position: 'relative' }}>
      <USAMap customize={colorMap} onClick={mapHandler} />
      {showBubble && (
          <div
          style={{
            position: 'absolute',
            left: bubblePosition.x,
            top: bubblePosition.y,
            border: '1px solid black',
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // 半透明黑色背景
            color: 'white', // 白色文本
            padding: '10px',
            borderRadius: '10px', // 圆角边框
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' // 阴影效果
          }}
        >
          {data}
          <br />
          <a
            href="#" // 链接地址，或者可以使用 onClick 事件处理函数打开模态窗口
            style={{ color: 'lightblue' }} // 设置链接样式
            onClick={(e) => {
              e.preventDefault();
              // 打开新窗口的逻辑
            }}
          >
            查看详情
          </a>
        </div>
      )}
      
    </div>
    
  );
}
