import { Result, Button, input, Alert } from "antd";
import React from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

export default class RegisterSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //email: props.location.state,
      email:props.email,
      code: "",
      err: "",
      showWarning: false,
    };
    this.Confirm = this.Confirm.bind(this);
    this.Warning = this.Warning.bind(this);
  }

  Warning(props) {
    console.log(props);
    if (!props) {
      return null;
    }
    return (
      <div>
        <Alert type="error" message={this.state.err} banner />
      </div>
    );
  }

  warningTrigger() {
    this.setState({ showWarning: true });
  }

  //send userID and confirm number to Cognito
  async Confirm() {
    try {
      
      /*const user = */await Auth.confirmSignUp(
        this.props.email,
        this.state.code
      );
      this.setState({ Redirect: true });
    } catch (e) {
      this.setState({ err: e.message });
      this.warningTrigger();
    }
  }

  render() {
    return (
      <div>
        <Result
          status="success"
          title="Last Step: Confirm Your E-mail!"
          subTitle="Your confirmation number has been sent to your mail box"
          extra={[
            <div>
              {this.Warning(this.state.showWarning)}
              <input
                maxLength={6}
                onChange={(e) => this.setState({ code: e.target.value })}
              ></input>
              &nbsp;
              <Button type="primary" key="Submit" onClick={this.Confirm}>
                Submit
              </Button>
              <Button type="primary" key="console" Link to="/Login">
                <Link to="/Login">Return</Link>
              </Button>
            </div>,
          ]}
        />
      </div>
    );
  }
}
