import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Tabs, Row, Col, Card, Input, Form, Button, Alert } from "antd";
import homebackground from "./bellevuecollege2.png";
import { useHistory } from "react-router-dom";
import RegisterPage from "./RegisterPage";

export default function LoginPage() {

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [err, setErr] = useState("");
  const [showWarning, setWarning] = useState(false);

  const { TabPane } = Tabs;

  //Background
  const homeImage = {
    backgroundImage: "url(" + homebackground + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "noRepeat",
    width: "100vw",
    height: "100vh",
  };

  //use this to redirect page
  function redirectToConsole() {
    history.push({ pathname: "/Console", state: { username: username } });
  }

  //Warning when something goes wrong
  function Warning(props) {
    if (!props.warn) {
      return null;
    }
    return (
      <div>
        <Alert type="error" message={err} banner />
      </div>
    );
  }

  function warningTrigger() {
    setWarning(true);
  }

  //Send the login info to Cognito
  async function handleLogin(event) {
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      redirectToConsole();
    } catch (e) {
      setErr(e.message);
      warningTrigger();
    }
  }

  //Legacy,record the current page when switch
  function callback(key) {
    //console.log(key);
  }


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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

  

  return (
    <div className="home" >
      <Row type="flex" justify="center" align="middle">
        <Col type="flex">
          <Card style={{ width: 500 }}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Login" key="1">
                <Warning warn={showWarning}></Warning>
                <Form
                  {...layout}
                  ref={formRef}
                  onFinish={handleLogin}
                  onFinishFailed={onFinishFailed}
                >
                  <Row type="flex" justify="center" align="middle">
                    <Col type="flex">
                      <Form.Item
                        onChange={(e) => setUser(e.target.value)}
                        name="E-mail_Login"
                        label="E-mail address"
                        rules={[
                          {
                            type: "email",
                            message: "The input is not valid E-mail!",
                          },
                          {
                            required: true,
                            message: "Please input your E-mail!",
                          },
                        ]}
                      >
                        <Input placeholder="E-mail address" />
                      </Form.Item>
                      <Form.Item
                        onChange={(e) => setPassword(e.target.value)}
                        name="Password_Login"
                        label="Password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Password!",
                          },
                        ]}
                      >
                        <Input.Password placeholder="Password" />
                      </Form.Item>
                      <div style={{ margin: "24px 0" }} />

                      <Form.Item {...tailLayout}>
                        {/*<Link to ='/Console'> */}
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                        {/*</Link> */}
                      </Form.Item>
                      <div style={{ margin: "24px 0" }} />
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
  );
}
