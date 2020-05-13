import { Transfer, Switch, Table, Tag } from 'antd';
import difference from 'lodash/difference';
import React from 'react';
import { Drawer, Button,Affix,Divider} from 'antd';

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps} showSelectAll={false}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter(item => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

//this.state.course = this.props;
const mockTags = ['cat', 'dog', 'bird'];
//const mockTags = this.state.course;
//console.log(this.props)
const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 4 === 0,
    tag: mockTags[i % 3],
  });
}

//const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const leftTableColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
  {
    dataIndex: 'tag',
    title: 'Tag',
    render: tag => <Tag>{tag}</Tag>,
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];
const rightTableColumns = [
  {
    dataIndex: 'key',
    title: 'Name',
  },
];


/**
 * 
 * Bascially using the antd api, and insert data to it.
 * 
 * Also, output the data when the user click "selected"
 * 
 */


export default class Trans extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      targetKeys: [],
      disabled: false,
      showSearch: false,
      course:[]
    };
    
  }

  onChange = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  triggerDisable = disabled => {
    this.setState({ disabled });
  };

  triggerShowSearch = showSearch => {
    this.setState({ showSearch });
  };
  state = { visible: false };
  showDrawer = () => {
    this.setState({
        visible: true,
    });
  };
  onClose = () => {
    this.setState({
        visible: false,
    });
  };



  
  
  render() {
    var arr = Object.keys(this.props).map(key => this.props[key]);
    const mockData = [];

    // Render class data
    for (let i = 0; i < arr.length; i++) {
      for (let x = 0; x < arr[i].length; x++) {
        console.log()
        mockData.push({
          key: arr[i][x].slug + " " + arr[i][x].id,
          title: arr[i][x].slug,
          description: arr[i][x].title,
          //disabled: i % 4 === 0,
          tag: arr[i][x].id
        });
      }
    }

    /*
    // Render slug data 
    for (let i = 0; i < arr.length; i++) {
      mockData.push({
        key: arr[i].slug,
        title: arr[i].slug,
        description: arr[i].title,
        //disabled: i % 4 === 0,
        tag: arr[i].coursePrefixes
      });
    }
    */

    /*
    for (let i = 0; i < arr.length; i++) {
      mockData.push({
        key: arr[i].dep+" "+arr[i].no,
        title: arr[i].dep+arr[i].no,
        description: arr[i].name,
        //disabled: i % 4 === 0,
        tag: arr[i].dep,
      });
    }
    */

    const { targetKeys, disabled, showSearch } = this.state;
    return (
        <div>
          <h1 style={{ color:"#FF8F59", fontSize: '35px', fontWeight: 200, textAlign: 'center' }}>Course Management</h1>

          <Divider>How to Use</Divider>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
          <Divider>Classes</Divider>
    
          <div>
            <Button type="primary"style={{ background: "#FF8F59", borderColor: "#ff7a45" }} onClick={this.showDrawer}   >Selected</Button>
            <Drawer
                    title="Selected courses:"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                {console.log(this.state.targetKeys)}
                {this.state.targetKeys.map(item => {
                  return  <div>
                            <h5>{item}</h5>
                          </div>
                  })
                }
                
            </Drawer>

          </div>  
        <TableTransfer
          dataSource={mockData}
          targetKeys={Object.keys(this.state.targetKeys).map(key => this.state.targetKeys[key])}
          disabled={disabled}
          showSearch={showSearch}
          onChange={this.onChange}
          filterOption={(inputValue, item) =>
            item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
          }
          leftColumns={leftTableColumns}
          rightColumns={rightTableColumns}
          
        />
        <Switch
          unCheckedChildren="showSearch"
          checkedChildren="showSearch"
          checked={showSearch}
          onChange={this.triggerShowSearch}
          style={{ marginTop: 16 }}
          defaultChecked={showSearch}
        />
      </div>
    );
  }
}

