import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import {Auth} from 'aws-amplify';
import {Tabs, Row, Col,Card,Input, Form,Button,Select } from 'antd';
import homebackground from './bellevuecollege2.png';
import { Link ,BrowserRouter} from 'react-router-dom'

export default function Register() {

    const [username, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [loadings, setLoadings] = useState("");



    
            const onFinish = values => {
                console.log('Success:',values);
            };
            const onFinishFailed  = errorInfo => {
                console.log('Failed:',errorInfo)
            }
               
            const layout = {
                labelCol: {
                  span: 0,
                },
                wrapperCol: {
                  span: 20,
                },
              };
              const tailLayout = {
                wrapperCol: {
                  offset: 8,
                  span: 16,
                },
              };
    

              var formRef = React.createRef();


             var enterLoading = index => {
                console.log(index);
                const newLoadings = [...loadings];
                newLoadings[index] = true;
                /*this.setState({
                  loadings: newLoadings,
                });*/
                setLoadings(newLoadings)
                setTimeout(() => {
                  newLoadings[index] = false;
                  //this.setState({ loadings: newLoadings });
                setLoadings(newLoadings)
                }, 5000);
                
              };
    
    return (
        <Form
        {...layout}
        ref={formRef}
        onFinish = {onFinish}
        onFinishFailed={onFinishFailed }
        >
        <Row type="flex" justify="center" align="middle" >
        <Col  type = "flex" >
       
    

    <Form.Item
     name="E-mail_Register"
     label="E-mail address"                    
     rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        },
        {
          pattern: /^([A-Za-z0-9_\-\.])+\@(bellevuecollege.edu)$/,
          message: 'You need to use a BC email address',
        },
      ]}>
      <Input placeholder="E-mail address" />
     </Form.Item>

     <Form.Item
      name="First name"
      label="First name"                    
      rules={[
             {
                   required: true,
                   message: 'Please input your First name!',
                 },
               ]}>
       <Input placeholder="First name" />
    </Form.Item>
  <Form.Item
      name="Last name"
      label="Last name"                    
      rules={[
             {
                   required: true,
                   message: 'Please input your Last name!',
                 },
               ]}>
       <Input placeholder="Last name" />
    </Form.Item>

    <Form.Item
     name="Password_Register1"
     label="Password"                    
     rules={[
            {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}>
      <Input.Password placeholder="Password" />
      
     </Form.Item>

  

     <Form.Item
name="confirm"
label="Confirm Password"
dependencies={['password']}
hasFeedback
rules={[
  {
    required: true,
    message: 'Please confirm your password!',
  },
  ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue('Password_Register1') === value) {
        return Promise.resolve();
      }

      return Promise.reject('The two passwords that you entered do not match!');
    },
  }),
]}
>
  <Input.Password />
  </Form.Item>

     <Form.Item 
     name= "status"
     label="Choose your status "
     rules={[
        {
              required: true,
              message: 'Please choose your status!',
            },
          ]}>
      <Select>
    <Select.Option value="1">Current Student</Select.Option>
    <Select.Option value="2">Future Student</Select.Option>
    <Select.Option value="3">International Student</Select.Option>
    <Select.Option value="4">Others</Select.Option>
  </Select>
  
</Form.Item>
    <div style={{ margin: '24px 0' }} />
    


    <Form.Item {...tailLayout}>

<Button htmlType="submit" type="primary" loading={loadings[0]} onClick={() => enterLoading(0)} >
  Submit
</Button>



    </Form.Item>
    <div style={{ margin: '24px 0' }} />
    </Col>
    </Row>
    </Form>
    )


}
