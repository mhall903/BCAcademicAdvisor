import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import {Auth} from 'aws-amplify';
import {Tabs, Row, Col,Card,Input, Form,Button,Select } from 'antd';
import homebackground from './bellevuecollege2.png';
import { Link ,BrowserRouter} from 'react-router-dom'
import RegisterPage from './RegisterPage';



      

export default function LoginPage() {
  /*  state = {
      loadings: [],
      username:[],
      password:[],
    }*/

    const [username, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [loadings, setLoadings] = useState("");

    const {TabPane} = Tabs;

const homeImage = {
  backgroundImage: 'url(' + homebackground + ')',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'noRepeat', 
          width: '100vw',
        height: '100vh'
}



    
    async function handleLogin(event){
      try{
        const user = await Auth.signIn(username,password);
        console.log(user);
      }catch(e){
        alert(e.message);
      }
    
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
          

      //const { loadings } = this.state;
        return (
          
          
            <div className="home" style={ homeImage }>
            <Row type="flex" justify="center" align="middle" >
            <Col  type = "flex" >
            <Card style={{ width: 500 }}>
            <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Login" key="1">
            <Form
                {...layout}
                ref={formRef}
                onFinish = {handleLogin}
                onFinishFailed={onFinishFailed }
                >
                <Row type="flex" justify="center" align="middle" >
                <Col  type = "flex" >
               
            

            <Form.Item
            onChange={e => setUser(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
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
          
            {/*<Link to ='/Console'> */}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
         {/*</Link> */}
            </Form.Item>
            <div style={{ margin: '24px 0' }} />
            </Col>
            </Row>
            </Form>
            </TabPane>
            <TabPane tab="Register" key="2">
                <RegisterPage></RegisterPage>
            </TabPane>
            </Tabs>
            </Card>
            </Col>
            </Row>
            </div>
            
        )
    }
