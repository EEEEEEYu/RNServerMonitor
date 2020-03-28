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

class MyItem extends React.Component{
  render(){
    return(
      <TouchableOpacity style={styles.itemView}>
        <View style={styles.notificationTextView}>
          <Text style={styles.notificationText}>{this.props.notificationText}</Text>
        </View>
        <View style={{
          height:windowHeight*0.036,
          width:60,
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center',
          borderRadius:windowHeight*0.018,
          backgroundColor:this.props.numberColor
        }}>
          <Text style={styles.numberText}>{this.props.numberText}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const numberColorMap={

}


export default class CPUPage extends React.Component{
  state={
    data:[
      {'userPercentage': 1.362,'sysPercentage': 1.703,'idlePercentage': 96.768,'cpuPercent': 15.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 1.362,'sysPercentage': 1.703,'idlePercentage': 96.768,'cpuPercent': 5.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 1.362,'sysPercentage': 1.703,'idlePercentage': 96.768,'cpuPercent': 9.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 1.362,'sysPercentage': 1.703,'idlePercentage': 96.768,'cpuPercent': 23.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 1.362,'sysPercentage': 1.703,'idlePercentage': 96.768,'cpuPercent': 63.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 1.362,'sysPercentage': 1.703,'idlePercentage': 96.768,'cpuPercent': 73.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 1.362,'sysPercentage': 1.703,'idlePercentage': 96.768,'cpuPercent': 53.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 1.362,'sysPercentage': 1.703,'idlePercentage': 96.768,'cpuPercent': 67.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 1.362,'sysPercentage': 1.703,'idlePercentage': 96.768,'cpuPercent': 34.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 1.362,'sysPercentage': 1.703,'idlePercentage': 96.768,'cpuPercent': 32.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 1.362,'sysPercentage': 1.703,'idlePercentage': 96.768,'cpuPercent': 23.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 1.362,'sysPercentage': 1.703,'idlePercentage': 96.768,'cpuPercent': 13.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5}
    ],
    displayName:'cpuPercent'
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

  _transformDisplayData=(data,name)=>{
    let temp=new Array(data.length)
    for(let i=0;i<data.length;i++){
      temp[i]=data[i][name]
    }
    return temp
  }

  render(){
    return(
      <View style={styles.layerView}>
        <Text>cpu page</Text>
        {/*图表显示区域*/}
        <AreaChart
          style={{ flex:40 }}
          data={ this._transformDisplayData(this.state.data,this.state.displayName) }
          contentInset={{ top: 30,bottom:30 }}
          curve={ shape.curveNatural }
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        />

        {/*刻度尺 */}
        <View style={styles.rulerView}>
          <Text style={styles.rulerText}>60s</Text>
          <Text style={styles.rulerText}>50s</Text>
          <Text style={styles.rulerText}>40s</Text>
          <Text style={styles.rulerText}>30s</Text>
          <Text style={styles.rulerText}>20s</Text>
          <Text style={styles.rulerText}>10s</Text>
          <Text style={styles.rulerText}>0s</Text>
        </View>

        <View style={styles.cpuContentView}>

          <View style={styles.lineView}>

            <TouchableOpacity style={styles.itemView}>
              <Text>待显示的CPU图标</Text>
            </TouchableOpacity>

            <MyItem 
              notificationText='使用率' 
              numberText='5.5%' 
              numberColor={this.state.usertime<25?'green':this.state.usertime<75?'orange':'red'}
            />


          </View>

          <View style={styles.lineView}>

            <MyItem 
              notificationText='用户时间' 
              numberText='5.5%' 
              numberColor={this.state.usertime<25?'green':this.state.usertime<75?'orange':'red'}
            />

            <MyItem 
              notificationText='系统时间' 
              numberText='3.5%'
              numberColor={this.state.systime<25?'green':this.state.systime<75?'orange':'red'}
            />

            
          </View>

          <View style={styles.lineView}>

            <MyItem 
              notificationText='空闲时间' 
              numberText='3.5%'
              numberColor={this.state.idletime<25?'green':this.state.idletime<75?'orange':'red'}
            />

            <MyItem 
              notificationText='1分钟内平均负载' 
              numberText='3.5%'
              numberColor={this.state.idletime<25?'green':this.state.idletime<75?'orange':'red'}
            />
            
          </View>

          <View style={styles.lineView}>

            <MyItem 
              notificationText='5分钟内平均负载' 
              numberText='3.5%'
              numberColor={this.state.idletime<25?'green':this.state.idletime<75?'orange':'red'}
            />

            <MyItem 
              notificationText='15分钟内平均负载' 
              numberText='3.5%'
              numberColor={this.state.idletime<25?'green':this.state.idletime<75?'orange':'red'}
            />
            
          </View>
          
        </View>

      </View>
    )
  }
}

const windowHeight=Dimensions.get('window').height
const windowWidth=Dimensions.get('window').width

const styles=StyleSheet.create({
  //整体View的样式
  layerView:{
    flexDirection:'column',
    justifyContent:'flex-start',
    flex:1
  },
  //刻度尺的View
  rulerView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'rgba(134, 65, 244, 0.8)'
  },
  rulerText:{
    color:'white'
  },
  //下方显示各个监控指标的View
  cpuContentView:{
    flexDirection:'column',
    justifyContent:'flex-start',
    backgroundColor:'rgba(134, 65, 244, 0.8)',
    flex:50
  },
  //每一行指标（2个）的View
  lineView:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    height:windowHeight*0.12
  },
  //单个监控指标的View
  itemView:{
    height:windowHeight*0.11,
    width:windowWidth*0.49,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    borderRadius:20,
    borderColor:'white',
    borderWidth:2
  },
  notificationTextView:{
    flexDirection:'row',
    justifyContent:'flex-start',
    width:windowWidth*0.23,
    alignItems:'center'
  },
  notificationText:{
    fontSize:windowWidth*0.052,
    color:'white'
  },
  //包裹数字的View，根据数字的值改变颜色 
  numberView:{
    height:windowHeight*0.036,
    width:60,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:windowHeight*0.018
  },

  numberText:{
    fontSize:windowHeight*0.024,
    color:'white'
  }
})