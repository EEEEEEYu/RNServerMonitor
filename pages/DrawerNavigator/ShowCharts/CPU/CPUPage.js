import React from 'react'
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import {AreaChart,Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape'



export default class CPUPage extends React.Component{
  state={
    data:[ 50, 10, 40, 95, 14, 24, 85, 91, 35, 53, 53, 24, 50, 20, 80 ]
  }
  

  componentDidMount(){
    this.testtimer=setInterval(()=>{
      newArray=this.state.data.splice(0)
      newArray.push(newArray[0])
      newArray=newArray.splice(1,newArray.length)
      this.setState({data:newArray})
    },4000)
  }


  componentWillUnmount(){
    this.testtimer&&clearInterval(this.testtimer);
  }

  render(){



    return(
      <View style={styles.layerView}>
        <Text>cpu page</Text>
        <AreaChart
          style={{ height: 250 }}
          data={ this.state.data }
          contentInset={{ top: 30,bottom:20 }}
          curve={ shape.curveNatural }
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                
        />

        <View style={styles.rulerView}>
          <Text>60s</Text>
          <Text>50s</Text>
          <Text>40s</Text>
          <Text>30s</Text>
          <Text>20s</Text>
          <Text>10s</Text>
          <Text>0s</Text>
        </View>

        <View style={styles.cpuContentView}>

          <View style={styles.lineView}>

            <TouchableOpacity>
              <Text>用户时间占比</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text>系统时间占比</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.lineView}>

            <TouchableOpacity>
              <Text>空闲时间占比</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text>CPU使用率</Text>
            </TouchableOpacity>
            
          </View>

          <View style={styles.lineView}>

            <TouchableOpacity>
              <Text>1分钟平均负载</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text>5分钟平均负载</Text>
            </TouchableOpacity>
            
          </View>

          <View style={styles.lineView}>

            <TouchableOpacity>
              <Text>15分钟平均负载</Text>
            </TouchableOpacity>
            
          </View>
          
        </View>

      </View>
    )
  }
}

const styles=StyleSheet.create({
  //整体View的样式
  layerView:{
    flexDirection:'column',
    justifyContent:'flex-start'
  },
  //刻度尺的View
  rulerView:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  //下方显示各个监控指标的View
  cpuContentView:{
    flexDirection:'column',
    justifyContent:'flex-start'
  },
  //每一行指标（2个）的View
  lineView:{
    flexDirection:'row',
    justifyContent:'space-evenly'
  }
})