import { Select } from "antd";
import React from "react";
import {API} from 'aws-amplify'
import DegreePage from "./DegreePage";

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  //load class list here
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default class DegreeChooser extends React.Component {
  constructor(props) {
    super(props);
    console.log("entering chooser");
    this.state = {
      degree: "",
    };
  }

  componentDidMount() {
    console.log("Pulling degree information");
    this.pullDegrees();
  }

  async pullDegrees() {
    try {
      const returnedDegrees = await this.loadDegrees();

      // name of degree
      console.log(returnedDegrees[0].degree);

      // array of requirements 
      console.log(returnedDegrees[0].requirements);

      // Requirements contain the list of potential classes
      // and the number of classes that are required to complete the requirement
      var requirements = returnedDegrees[0].requirements[0];
      console.log(`Core requirements: ${requirements.core_num}`);
      console.log(requirements.core);

      console.log(`Upper Level Elective requirements: ${requirements.upper_num}`);
      console.log(requirements.upper);

      console.log(`Free Elective requirements: ${requirements.free_num}`);
      console.log(requirements.free);

      // The diversity requirements have all the available options but only require 1
      console.log(`Diversity requirements: ${requirements.diversity_num}`);
      console.log(requirements.diversity);

      console.log(`Humanities requirements: ${requirements.humanities_num}`);
      console.log(requirements.humanities);

      console.log(`Social Science requirements: ${requirements.social_num}`);
      console.log(requirements.social);

      console.log(`General Education requirements: ${requirements.gened_num}`);
      console.log(requirements.gened);

      console.log(`Lab Credit requirements: ${requirements.lab_num}`);
      console.log(requirements.lab);
    }
    catch (e) {
      console.log(`Failed to load degree information: ${e.message}`);
      console.log(e);
    }
  }

  loadDegrees() {
    console.log("Loading degrees");
    var deg = "CS";
    return API.get("bcadmin", `/degree/${deg}`);
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({ degree: value });
    this.props.Callback(value);
  };
  render() {
    return (
      <Select
        style={{ width: "100%" }}
        showSearch="true"
        placeholder="Select a Degree"
        onChange={this.handleChange}
      >
        {children}
      </Select>
    );
  }
}
