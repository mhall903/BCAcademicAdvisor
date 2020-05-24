import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Auth } from "aws-amplify";
import {
  Tabs,
  Row,
  Col,
  Card,
  Input,
  Form,
  Button,
  Select,
  Alert,
  Modal,
} from "antd";
import homebackground from "./bellevuecollege2.png";
import { Link, BrowserRouter, Redirect, useHistory } from "react-router-dom";

export default function Register() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loadings, setLoadings] = useState("");
  const [err, setErr] = useState("");
  const [showWarning, setWarning] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const history = useHistory();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //send Register info to Cognito
  async function handleRegister(event) {
    try {
      const userInfo = {
        username: email,
        password: password,
        attributes: {
          email: email,
        },
      };
      const user = await Auth.signUp(userInfo);
      ConfirmWindow();
    } catch (e) {
      //alert(e.message);
      console.log(e.message);
      setErr(e.message);
      warningTrigger();
    }
  }

  //Jump to confirm page, might need to make another version for those who miss this page
  function ConfirmWindow() {
    history.push({ pathname: "/Success", state: { email: email } });
  }

  //Warning
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

  //Super not useful loading ui
  var enterLoading = (index) => {
    console.log(index);
    const newLoadings = [...loadings];
    newLoadings[index] = true;
    /*this.setState({
      loadings: newLoadings,
    });*/
    setLoadings(newLoadings);
    /*setTimeout(() => {
      newLoadings[index] = false;
      //this.setState({ loadings: newLoadings });
      setLoadings(newLoadings)
    }, 5000);*/
  };
  return (
    <div>
      <Warning warn={showWarning}></Warning>
      <Form
        {...layout}
        ref={formRef}
        onFinish={handleRegister}
        onFinishFailed={onFinishFailed}
      >
        <Row type="flex" justify="center" align="middle">
          <Col type="flex">
            <Form.Item
              name="E-mail_Register"
              label="E-mail address"
              onChange={(e) => setEmail(e.target.value)}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
                {
                  pattern: /^([A-Za-z0-9_\-\.])+\@(bellevuecollege.edu)$/,
                  message: "You need to use a BC email address",
                },
              ]}
            >
              <Input placeholder="E-mail address" />
            </Form.Item>
            <Form.Item
              name="Password_Register1"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
                {
                  min: 6,
                  message: "Your password need to be longer then 6 characters",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (
                      !value ||
                      getFieldValue("Password_Register1") === value
                    ) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div style={{ margin: "24px 0" }} />

            <Form.Item {...tailLayout}>
              <Button
                htmlType="submit"
                type="primary"
                loading={loadings[0]}
                onClick={() => enterLoading(0)}
              >
                Submit
              </Button>
            </Form.Item>
            <div style={{ margin: "24px 0" }} />
          </Col>
        </Row>
      </Form>
    </div>
  );
}
