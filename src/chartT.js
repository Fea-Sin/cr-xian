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
    
    const { width, height, padding, outTitle, innerTitle } = this.props
    console.log('out---', outTitle, 'inner----', innerTitle)

    return (
      <div>
        <Chart
          data={data}
          height={height}
          width={width}
          scale={scale}
          padding={padding}
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
                  title: `${outTitle}`,
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
              tooltip={["name*sum*percent", (name, sum, percent) => {
                return {
                  title: `${innerTitle}`,
                  name: `${name}：`,
                  value: `合计: ${sum} 百分比: ${percent}`
                }
              }]}
              active={[true, { 
                highlight: true,
                style: {
                  fill: 'red'
                } 
              }]}

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