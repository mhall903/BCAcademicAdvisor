import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react'
import ReactDOM from 'react-dom'

const { SubMenu } = Menu;

export default class SidebarV2 extends React.Component {

    state = {
        current: 'mail',
      };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
      };

  render() {
    return (
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item>
        <SubMenu icon={<SettingOutlined />} title="Navigation Three - Submenu">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="bcweb">
          <a href="https://www2.bellevuecollege.edu/classes/" target="_blank" rel="noopener noreferrer">
            Full Class List
          </a>
        </Menu.Item>
      </Menu>
    );
  }
}

