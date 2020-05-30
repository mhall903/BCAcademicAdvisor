import { Select, Card, Col, Row } from "antd";
import React, { useState } from "react";
import SidebarV2 from "./SidebarV2";
import "./DegreePage.css";
//import { Component } from 'react';
import DegreeChooser from "./DegreeChooser";

const { Option } = Select;

export default function DegreePage() {
  const [Class, setClass] = useState([]);

  function Callback(dataFromChild) {
    GetClassInfo(dataFromChild);
  }

  /*
  function GetClassInfo(){

  }
*/

  function GetClassInfo(Degree) {
    //Hard Coded Version
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
      <DegreeChooser Callback={Callback.bind(this)}></DegreeChooser>
      <div class="box">
        <div class="left">
          <SidebarV2></SidebarV2>
        </div>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {Class.map((c) => (
              <Col span={8}>
                <Card>{c}</Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
