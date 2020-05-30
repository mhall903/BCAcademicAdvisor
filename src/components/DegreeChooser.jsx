import { Select } from 'antd';
import React from 'react';
import DegreePage from './DegreePage';




const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  //load class list here
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default class DegreeChooser extends React.Component{

constructor(props){
  super(props);
  this.state={
    degree:'',
  }
}

handleChange = (value) =>  {
  console.log(`selected ${value}`);
  this.setState({degree:value});
  this.props.Callback(value);
}
render(){
return(<Select style={{ width: '100%' }} placeholder="Select a Degree" onChange={this.handleChange}>
{children}
</Select>);
}
}