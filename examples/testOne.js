import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Testone from 'cr-xian';
import { Table } from 'antd';
import 'antd/dist/antd.css'; 
import '../assets/index.less';

const reactContainer = document.getElementById('__react-content');
const bodyContainer = document.getElementsByTagName('body')
bodyContainer[0].style.padding = '10px'
reactContainer.style.cssText = `
                                border: 1px solid #11d0bc;
                                padding: 10px;
                                margin-bottom: 10px;
                               `;

const dataSource = [
  {
    key: '1',
    address: '华北',
    zhangsan: '20',
    lisi: '18',
    xiaoming: '42',
  }, {
    key: '2',
    address: '华南',
    zhangsan: '63',
    lisi: '51',
    xiaoming: '130',
  }
];

const columns = [
  {
    title: '地区',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '张三',
    dataIndex: 'zhangsan',
    key: 'zhangsan',
  }, {
    title: '李四',
    dataIndex: 'lisi',
    key: 'lisi',
  }, {
    title: '小明',
    dataIndex: 'xiaoming',
    key: 'xiaoming',
  }
]

const HHeader = ['张三', '李四', '小明']
const VHeader = ['华北', '华南']
const TData = [[20, 18, 42], [63, 51, 130]]

function render(container) {
  ReactDOM.render(
    <div>
      <h2>弦图</h2>
      <div style={{lineHeight: '40px'}}>表格可视化为弦图</div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <div style={{lineHeight: '40px'}}>将表格转化为弦图</div>
      <div style={{width: 800, height: 800, margin: '0 auto'}}>
        <Testone 
          HHeader={HHeader} VHeader={VHeader} TData={TData}
          width={500}
          height={500}
        />
      </div>

    </div>, container
  )
}

render(reactContainer)