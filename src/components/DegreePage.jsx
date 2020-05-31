import { Card, Col, Row, Progress } from "antd";
import {
  CheckCircleTwoTone,
  MinusSquareTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import React, { useState } from "react";
import SidebarV2 from "./SidebarV2";
import "./DegreePage.css";
import DegreeChooser from "./DegreeChooser";


export default function DegreePage() {
  const [Classes, setClass] = useState([]);
  const [Progess, setProgess] = useState([]);
  const [Per, setPer] = useState();
  const [Marker, setMarker] = useState(new Map());
  const updateMarker = (k, v) => {
    setMarker(new Map(Marker.set(k, v)));
  };

/*
Per:  Progress percentage
Progress: Save the selected classes
Marker: Showing what icon
*/



  function getMarker(i) {
    console.log(Marker.get(i));
    if (Marker.get(i) === undefined) {
      return <CloseCircleTwoTone twoToneColor="#eb2f96" />;
    } else {
      return Marker.get(i);
    }
  }

  /*
  Callback: get the data from DegreeChooser
  */
  function Callback(dataFromChild) {
    GetClassInfo(dataFromChild);
  }

  const handleClick = (i) => {
    const temp = Progess;
    if (temp.indexOf(i) == -1) {
      temp.push(i);
      setProgess(temp); //Save the current chosen class
      updateMarker(i, <CheckCircleTwoTone twoToneColor="#52c41a" />); //Change the Icon
    } else {
      temp.splice(temp.indexOf(i), 1);
      setProgess(temp);
      updateMarker(i, <MinusSquareTwoTone />);
    }
    setPer(Progess.length / Classes.length); //Change the progress bar
  };

  //TODO:
  //Change Hardcoded data to Dynamic one
  function GetClassInfo(Degree) {
    setMarker(new Map());
    setProgess([]);
    setPer(0);
    if (Degree === "a10") {
      setClass(["CS100 TEST1", "CS200 TEST2", "CS300 TEST3"]);
    } else if (Degree === "b11") {
      setClass(["MATH100 TEST1", "MATH200 TEST2", "MATH300 TEST3"]);
    } else {
      setClass([
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
        "Place Holder",
      ]);
    }
  }

  return (
    <div>
      <div class="box">
        <div class="left">
          <SidebarV2></SidebarV2>
        </div>
        <DegreeChooser Callback={Callback.bind(this)}></DegreeChooser>
        <Progress percent={Per * 100} />
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {Classes.map((c, i) => (
              <Col span={8}>
                <Card
                  title={getMarker(i)}
                  size="default"
                  color="red"
                  hoverable="true"
                  key={i}
                  onClick={() => handleClick(i)}
                >
                  {c}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
