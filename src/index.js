import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import OuiDom from './utils/ouiDomUtils';
import AppChart from './chart';
import SChart from './chartT';
import { Spin } from 'antd';

class App extends PureComponent {

  constructor(props) {
    super(props)
  }

  state = {
    chartData: {},
    loading: true,
  }

  componentDidMount() {
    this.getChartData()
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 1000)
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('component up date', prevState)
  }
  
  getChartData = () => {
    const { HHeader, VHeader, TData } = this.props;
    const CNodes = []
    const CLinks = []
    let nodesArr = VHeader.concat(HHeader)

    // nodes data
    for (let i=0; i<nodesArr.length; i++) {
      let nodeObj = {}
      nodeObj.id = i
      nodeObj.name = nodesArr[i]
      CNodes.push(nodeObj)
    }

    // links data
    if (HHeader.length > 0) {
      for (let i=0; i<HHeader.length; i++) {
        let offset = VHeader.length
  
        for (let j=0; j<VHeader.length; j++) {
          let listObj = {}
          let listObjT = {}
          listObj.source = i+offset
          listObj.target = j  
          listObj.lineX = HHeader[i]
          listObj.lineY = VHeader[j]
          listObj.sourceWeight = TData[j][i]
          listObj.targetWeight = TData[j][i]    
  
          CLinks.push(listObj)
        }
      }
    }
    const chartData = {
      nodes: CNodes,
      links: CLinks,
    }
    // console.log('和弦图----', chartData)
    this.setState({
      chartData,
    })
  }

  render () {
    
    return (
      <div>
        <Spin spinning={this.state.loading}>
          {!this.state.loading && <SChart chartData={this.state.chartData} />}
        </Spin>
      </div>
    )
  }
}

App.propTypes = {
  HHeader: PropTypes.array,
  VHeader: PropTypes.array,
  TData: PropTypes.arrayOf(PropTypes.array),
}
App.defaultProps = {

}
export default App