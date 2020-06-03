import {Collapse } from "antd";
import React, { useState, useEffect } from "react";
import "./DegreePage.css";
import DegreeChooser from "./DegreeChooser";
import Degree from "./Degree";

export default function DegreePage() {
  //const [test,setTest] = useState();

  const { Panel } = Collapse;
  const [De, setDe] = useState("");

  /*
De: Degree
*/


  /*
  Callback: get the data from DegreeChooser
  */
  function Callback(dataFromChild) {
    setDe(dataFromChild);
  }
 //Update state and send it as props to Degree.jsx
  useEffect(() => {
    console.log("De" + De);
    RenderDegree();
  }, [De]);

  function RenderDegree() {
    //Render all Degrees
    //Not sure if each Degree requrie differently, may change
    return (
      <div>
        <Collapse bordered={false} defaultActiveKey={["0"] }>
          <Panel header="Core Classes" key="1">
            <Degree cType={"core"} pDegree={De} key="1">1</Degree>
          </Panel>
          <Panel header="Upper Classes" key="2">
            <Degree cType={"upper"} pDegree={De} key="2">2</Degree>
          </Panel>
          <Panel header="diversity Classes" key="3">
            <Degree cType={"diversity"} pDegree={De} key="3">3</Degree>
          </Panel>
          <Panel header="Social Science Classes" key="4">
            <Degree cType={"social"} pDegree={De} key="4">4</Degree>
          </Panel>
          <Panel header="General Education requirements" key="5">
            <Degree cType={"gened"} pDegree={De} key="5">5</Degree>
          </Panel>
        </Collapse>
      </div>
    );
  }

  return (
    <div>
      <div className="box">
        <div className="left">
        
        <DegreeChooser Callback={Callback.bind(this)}></DegreeChooser>
        <RenderDegree></RenderDegree>
        <div>

        </div>
      </div>
      </div>
    </div>
  );
}
