import React, { PureComponent } from 'react';
import DataSet from "@antv/data-set";
import { Chart, Tooltip, View, Coord, Geom, Label } from 'bizcharts'

class SChart extends PureComponent {
  render () {
    const { chartData } = this.props
    const data = chartData
    const ds = new DataSet();
    const dv = ds.createView().source(data, {
      type: "graph",
      edges: d => d.links,
      nodes: d => d.nodes,
    });

    dv.transform({
      type: "diagram.arc",
      sourceWeight: edges => edges.sourceWeight,
      targetWeight: edges => edges.targetWeight,
      weight: true,
      marginRatio: 0.3,
      thickness: 0.1,
    });
    const scale = {
      x: {
        sync: true
      },
      y: {
        sync: true
      }
    };       

    return (
      <div>
        <Chart
          data={data}
          height={550}
          width={550}
          scale={scale}
          padding={[70, 50, 70, 50]}
        >
          <Tooltip 
            showTitle={true} 
            inPlot={false}
          />
          <View data={dv.edges} axis={false}>
            <Coord type="polar" reflect="y" />
            <Geom
              type="edge"
              position="x*y"
              shape="arc"
              color="source"
              opacity={0.3}
              active={[true, { 
                highlight: true,
                style: {
                  fill: 'red'
                } 
              }]}
              tooltip={["lineX*lineY*sourceWeight", (lineX, lineY, sourceWeight) => {
                return {
                  title: `小微税优模型`,
                  name: `${lineY}-${lineX}：`,
                  value: `${sourceWeight}`
                }
              }]}
            />
          </View>
          <View data={dv.nodes} axis={false}>
            <Coord type="polar" reflect="y" />
            <Geom 
              type="polygon" 
              position="x*y" 
              color="id"
              tooltip={false}
              active={true}
            >
              <Label
                content="name"
                labelEmit={true}
                textStyle={{
                  fill: "black"
                }}
              />
            </Geom>
          </View>
        </Chart>
      </div>
    )
  }
}

export default SChart