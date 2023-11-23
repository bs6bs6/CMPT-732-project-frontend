import React, { useEffect, useState } from "react";
import USAMap from "react-usa-map";
import statesJson from "../assets/states.json";

import Button from "@mui/material/Button";

export default function Map() {
  const states = statesJson.data;
  const [condition, setCondition] = useState({
    ongoing: false,
    end: false,
    progNum: 0,
    correctCnt: 0,
    falseCnt: 0,
    failed: false,
    quizMode: null
  });
  const [quizArray, setQuizArray] = useState(states);
  const [msg, setMsg] = useState("");
  const [qAbbreviation, setqAbbreviation] = useState(null);
  const [aAbbreviation, setaAbbreviation] = useState(null);
  const [colorMap, setColorMap] = useState({});

  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    setQuizArray((quizArray) => shuffle(quizArray));
    console.log("shuffled");
  }, [condition.end]);

  useEffect(() => {
    setqAbbreviation(quizArray[condition.progNum].attributes.abbreviation);
  }, [quizArray, condition.progNum]);

  const mapHandler = (e) => {
    const { ongoing, end, progNum, correctCnt, falseCnt, failed } = condition;
    if (end || progNum >= 50) return;
    if (ongoing) {
      const guessAbbreviation = e.target.dataset.name;
      setaAbbreviation(guessAbbreviation);
      const qName = quizArray[condition.progNum].attributes.name;
      if (guessAbbreviation === qAbbreviation) {
        setMsg(`You Got It Right! It was ${qName}.`);
        const nextProgNum = progNum + 1;
        if (failed)
          setCondition({ ...condition, failed: false, progNum: nextProgNum });
        else {
          setCondition({
            ...condition,
            correctCnt: correctCnt + 1,
            progNum: nextProgNum
          });
        }
      } else {
        setMsg(`Not Correct! That State Uses This Sign. Try Again.`);
        if (!failed) {
          setCondition({ ...condition, falseCnt: falseCnt + 1, failed: true });
        }
        const newColorMap = colorMap;
        newColorMap[guessAbbreviation] = { fill: "#000" };
        setColorMap(newColorMap);
        console.log(newColorMap);
      }
    }
  };

  const startSession = () => {
    setCondition({ ...condition, ongoing: true, progNum: 0, end: false });
  };

  return (
    <div>
      <USAMap customize={colorMap} onClick={mapHandler} />
      <br></br>
      {condition.ongoing && qAbbreviation ? (
        <img src={`/images/highway/${qAbbreviation}.PNG`} alt="quizImage" />
      ) : (
        "check"
      )}
      <br></br>
      {msg}
      {condition.ongoing && aAbbreviation ? (
        <img src={`/images/highway/${aAbbreviation}.PNG`} alt="quizImage" />
      ) : (
        ""
      )}
      <br></br>
      {`Correct: ${condition.correctCnt}`}
      {`Missed: ${condition.falseCnt}`}
      <br></br>
      <Button onClick={startSession}>Start</Button>
    </div>
  );
}