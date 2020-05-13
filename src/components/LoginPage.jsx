import React from 'react';
import ReactDOM from 'react-dom';
import {Auth} from 'aws-amplify';
import {Tabs, Row, Col,Card,Input, Form,Button,Select } from 'antd';
import homebackground from './bellevuecollege2.png';
import { Link ,BrowserRouter} from 'react-router-dom'


const {TabPane} = Tabs;

const homeImage = {
  backgroundImage: 'url(' + homebackground + ')',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'noRepeat', 
          width: '100vw',
        height: '100vh'
}


function callback(key) {
    console.log(key);
  }

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

      

export default class LoginPage extends React.Component{
    state = {
      loadings: [],
    }
    formRef = React.createRef();

    enterLoading = index => {
      console.log(index);
      const newLoadings = [...this.state.loadings];
      newLoadings[index] = true;
      this.setState({
        loadings: newLoadings,
      });
      setTimeout(() => {
        newLoadings[index] = false;
        this.setState({ loadings: newLoadings });
      }, 5000);
      
    };

    

    render(){
      const { loadings } = this.state;
        return (
          
          
            <div className="home" style={ homeImage }>
            <Row type="flex" justify="center" align="middle" >
            <Col  type = "flex" >
            <Card style={{ width: 500 }}>
            <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Login" key="1">
            <Form
                {...layout}
                ref={this.formRef}
                onFinish = {onFinish}
                onFinishFailed={onFinishFailed }
                >
                <Row type="flex" justify="center" align="middle" >
                <Col  type = "flex" >
               
            

            <Form.Item
             name="E-mail_Login"
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
              ]}>
              <Input placeholder="E-mail address" />
             </Form.Item>
            <Form.Item
             name="Password_Login"
             label="Password"                    
             rules={[
                    {
                          required: true,
                          message: 'Please input your Password!',
                        },
                      ]}>
              <Input.Password placeholder="Password" />
             </Form.Item>
            <div style={{ margin: '24px 0' }} />

            <Form.Item {...tailLayout}>
            <Link to ='/Console'>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
         </Link>
            </Form.Item>
            <div style={{ margin: '24px 0' }} />
            </Col>
            </Row>
            </Form>
            </TabPane>


            <TabPane tab="Register" key="2">


               <Form
                {...layout}
                ref={this.formRef}
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
              ]}>
              <Input placeholder="E-mail address" />
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

        <Button htmlType="submit" type="primary" loading={loadings[0]} onClick={() => this.enterLoading(0)} >
          Submit
        </Button>

       

            </Form.Item>
            <div style={{ margin: '24px 0' }} />
            </Col>
            </Row>
            </Form>
            </TabPane>

            </Tabs>
            </Card>
            </Col>
            </Row>
            </div>
            
        )
    }
}