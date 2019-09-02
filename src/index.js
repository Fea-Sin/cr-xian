import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import OuiDom from './utils/ouiDomUtils';
import AppChart from './chart';
import SChart from './chartT';
import { sum } from 'simple-statistics';

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
    }, 0)
  }
  componentDidUpdate(prevProps, prevState) {
  }
  
  getChartData = () => {
    const { HHeader, VHeader, TData } = this.props;
    const CNodes = []
    const CLinks = []
    let nodesArr = VHeader.concat(HHeader)
    let VSumArr = TData.map(item => {
      return sum(item)
    })

    let total = TData.reduce( (acc, cur) => {
      return acc + sum(cur)
    }, 0)

    let HSumArr = []
    for (let i=0; i<HHeader.length; i++) {
      let arr = []
       for (let j=0; j<VHeader.length; j++) {
         arr.push(TData[j][i])
       }
       HSumArr.push( sum(arr) )
    }
    let nodesSum = VSumArr.concat(HSumArr)

    // nodes data
    for (let i=0; i<nodesArr.length; i++) {
      let nodeObj = {}
      nodeObj.id = i
      nodeObj.name = nodesArr[i]
      nodeObj.sum = nodesSum[i]
      nodeObj.percent = ( (nodesSum[i] / total)*100 ).toFixed(2)
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
    const { width, height, padding, outTitle, innerTitle } = this.props

    return (
      <div>
      {/* 数据可视化 */}
        {/* <AppChart /> */}
      {/* -弦图- */}
      {!this.state.loading && 
          <SChart 
            chartData={this.state.chartData}
            width={width}
            height={height}
            padding={padding}
            outTitle={outTitle}
            innerTitle={innerTitle}
          />
        }
      </div>
    )
  }
}

App.propTypes = {
  HHeader: PropTypes.array.isRequired,
  VHeader: PropTypes.array.isRequired,
  TData: PropTypes.arrayOf(PropTypes.array).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.arrayOf(PropTypes.number),
  outTitle: PropTypes.string,
  innerTitle: PropTypes.string,
}
App.defaultProps = {
  width: 550,
  height: 550,
  padding: [70, 50, 70, 50],
  outTitle: '地区销售合计百分比',
  innerTitle: '地区销售图',
}
export default App