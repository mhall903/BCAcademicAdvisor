import { Card, Col, Row, Progress} from "antd";
import {
  CheckCircleTwoTone,
  MinusSquareTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import React from "react";
import "./Degree.css";
import { API } from "aws-amplify";

export default class Degree extends React.Component {
  constructor(props) {
    super();
    this.state = {
      Marker: new Map(),
      Per: 0,
      Progess: [],
      Classes: [],
      DegreeF: props.pDegree,
      Type: "",
      RequireNum: 0,
    };
  }
  /**
   * Marker: the state of the icon
   * Per: Percentage of the progress bar
   * Progress: How many classes are choosed
   * Classes: Classes 
   * DegreeF: Degree
   * Type: Type of classes, like core, or social science
   * RequireNum: How many of classes of this type is needed for the degree
   */

  updateMarker = (k, v) => {
    this.setState((this.state.Marker = new Map(this.state.Marker.set(k, v))));
  };

  handleClick = (i) => {
    const temp = this.state.Progess;
    if (temp.indexOf(i) === -1) {
      temp.push(i);
      //Save the current chosen class
      this.updateMarker(i, <CheckCircleTwoTone twoToneColor="#52c41a" />); //Change the Icon
    } else {
      temp.splice(temp.indexOf(i), 1);
      this.setState({
        Progress: temp,
      });
      this.updateMarker(i, <MinusSquareTwoTone />);
    }
    this.setState({
      Per: this.state.Progess.length / this.state.RequireNum,
    });
  };

  getMarker(i) {
    if (this.state.Marker.get(i) === undefined) {
      return <CloseCircleTwoTone twoToneColor="#eb2f96" />;
    } else {
      return this.state.Marker.get(i);
    }
  }
  /**
   * Init
   */
  componentDidMount() {
    this.setState({
      DegreeF: this.props.pDegree,
      Type: this.props.cType,
    });
    this.GetClassInfo();
  }

  /**
   * Update the class list when degree is choosed
   */
  async GetClassInfo() {
    try {
      const returnedDegrees = await API.get(
        "bcadmin",
        `/degree/${this.state.DegreeF}`
      );
      var requirements = returnedDegrees[0].requirements[0];
      console.log(this.state.Type);
      /**
       *  May have better solution then if else, might change later
       */
      if (this.state.Type === "core") {
        requirements.core_num++;
        this.setState({
          Marker: new Map(),
          Progess: [],
          Per: 0,
          Classes: requirements.core,
          RequireNum: requirements.core_num,
        });
        console.log(this.state.RequireNum);
      } else if (this.state.Type === "upper") {
        requirements.upper_num++;
        this.setState({
          Marker: new Map(),
          Progess: [],
          Per: 0,
          Classes: requirements.upper,
          RequireNum: requirements.upper_num,
        });
      } else if (this.state.Type === "diversity") {
        requirements.diversity_num++;
        this.setState({
          Marker: new Map(),
          Progess: [],
          Per: 0,
          Classes: requirements.diversity,
          RequireNum: requirements.diversity_num,
        });
      } else if (this.state.Type === "social") {
        requirements.social_num++;
        this.setState({
          Marker: new Map(),
          Progess: [],
          Per: 0,
          Classes: requirements.social,
          RequireNum: requirements.social_num,
        });
      } else if (this.state.Type === "gened") {
        requirements.gened_num++;
        this.setState({
          Marker: new Map(),
          Progess: [],
          Per: 0,
          Classes: requirements.gened,
          RequireNum: requirements.gened_num,
        });
      }
    } catch (e) {
      console.log(`Failed to load degree information: ${e.message}`);
      console.log(e);
    }
  }

  render() {
    return (
      <div className="C">
        <Progress percent={this.state.Per * 100}></Progress>

        <div className="site-card-wrapper">
          <Row gutter={16}>
            {this.state.Classes.map((c, i) => (
              <Col span={8} key={i}>
                <Card
                  className="custom-card"
                  title={this.getMarker(i)}
                  size="default"
                  color="red"
                  hoverable="true"
                  key={i}
                  id={i}
                  onClick={() => this.handleClick(i)}
                >
                  {c}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}
