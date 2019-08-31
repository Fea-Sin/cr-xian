import React, { PureComponent } from 'react';
import DataSet from "@antv/data-set";
import { Chart, Tooltip, View, Coord, Geom, Label, Legend, Axis } from 'bizcharts';
import axios from 'axios';


class AppChart extends PureComponent {

  state = {
    dvForAll: [],
  }

  componentDidMount () {
    this.setData()
  }

  setData = () => {
    const ds = new DataSet({
      state: {
        currentState: '华南'
      }
    })
    axios.get('//39.107.35.212/csv/population-by-age.csv')
      .then(response => {
        const dvForAll = ds.createView('stateTest')
          .source(response.data, {
            type: 'csv',
          })

        dvForAll.transform({
          type: 'map',
          callback(row) {
            row['小明'] = Number(row['小明'])
            row['张三'] = Number(row['张三'])
            row['李四'] = Number(row['李四'])

            return row
          }
        })

        dvForAll.transform({
          type: 'percent',
          fields: '小明',
          dimension: 'state',
          as: 'percent-小明',
        })
        // dvForAll.transform({
        //   type: 'percent',
        //   fields: ['张三'],
        //   dimension: 'state',
        //   as: 'percent-张三',
        // })        
        // dvForAll.transform({
        //   type: 'percent',
        //   fields: ['李四'],
        //   dimension: 'state',
        //   as: 'percent-李四',
        // })
        dvForAll.transform({
          type: 'fold',
          fields: ['张三', '李四', '小明'],
          key: '姓名',
          value: '销量'
        })
        console.log('data set 处理后的数据----transform', dvForAll)

        this.setState({
          dvForAll,
        })
      })

  }

  render () {
    return (
      <div>
        <Chart
          data={this.state.dvForAll}
          height={400}        
        >
          <Legend />
          <Tooltip />
          <Axis name='姓名' />
          <Axis name="销量" />
          <Geom 
            type='intervalStack' 
            position='姓名*销量'
            color='state'
          />
        </Chart>
      </div>
    )
  }
}

export default AppChart;