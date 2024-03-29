import React from 'react'
import {
  View,
  Text,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'

import {AreaChart,Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape'


//下方单个显示组件
class MyItem extends React.Component{
  render(){
    return(
      <TouchableOpacity style={styles.itemView} onPress={this.props.pressFunc}>
        <View style={styles.notificationTextView}>
          <Text style={styles.notificationText}>{this.props.notificationText}</Text>
        </View>
        <View style={{
          height:windowHeight*0.036,
          width:windowWidth*0.15,
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



export default class CPUPage extends React.Component{
  state={
    data:[
      {'userPercentage': 1.32,'sysPercentage': 1.7,'idlePercentage': 96.76,'cpuPercent': 15.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 2.43,'sysPercentage': 0.7,'idlePercentage': 93.76,'cpuPercent': 5.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 3.34,'sysPercentage': 0.7,'idlePercentage': 89.78,'cpuPercent': 9.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 4.35,'sysPercentage': 2.7,'idlePercentage': 84.78,'cpuPercent': 23.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 5.37,'sysPercentage': 2.7,'idlePercentage': 80.78,'cpuPercent': 63.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 8.33,'sysPercentage': 3.7,'idlePercentage': 70.78,'cpuPercent': 73.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 12.23,'sysPercentage': 3.7,'idlePercentage': 76.68,'cpuPercent': 53.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 15.26,'sysPercentage': 4.7,'idlePercentage': 45.68,'cpuPercent': 67.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 16.23,'sysPercentage': 4.7,'idlePercentage': 65.68,'cpuPercent': 34.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 16.24,'sysPercentage': 5.7,'idlePercentage': 42.68,'cpuPercent': 32.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 17.25,'sysPercentage': 5.7,'idlePercentage': 52.68,'cpuPercent': 23.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5},
      {'userPercentage': 18.26,'sysPercentage': 6.7,'idlePercentage': 56.68,'cpuPercent': 13.1,'1minLoadAvg': 11.75,'5minLoadAvg': 5.75,'15minLoadAvg': 3.5}
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
        {/*图表显示区域*/}
        <AreaChart
          style={{ flex:40 }}
          data={ this._transformDisplayData(this.state.data,this.state.displayName) }
          contentInset={{ top: 30,bottom:10 }}
          curve={ shape.curveNatural }
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        />

        <View style={{height:2,backgroundColor:'white'}}></View>

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

        <View style={{height:2,backgroundColor:'white'}}></View>

        <View style={styles.cpuContentView}>

          <View style={styles.lineView}>

            <TouchableOpacity style={styles.iconView} onPress={()=>{this.props.navigation.goBack()}}>
              <Image 
                source={require('../../../../assets/Icons/CPUIcon.png')} 
                style={{height:windowWidth*0.21,width:windowWidth*0.21}}
              />
            </TouchableOpacity>

            <MyItem 
              notificationText='使用率' 
              numberText={this.state.data[this.state.data.length-1]['cpuPercent']+'%'}
              numberColor={ this.state.data[this.state.data.length-1]['cpuPercent']<25?'green':
                            this.state.data[this.state.data.length-1]['cpuPercent']<75?'orange':'red'}
              pressFunc={()=>{this.setState({displayName:'cpuPercent'})}}
            />


          </View>

          <View style={styles.lineView}>

            <MyItem 
              notificationText='用户时间' 
              numberText={this.state.data[this.state.data.length-1]['userPercentage']+'%'}
              numberColor={ this.state.data[this.state.data.length-1]<25?'green':
                            this.state.data[this.state.data.length-1]<75?'orange':'red'}
              pressFunc={()=>{this.setState({displayName:'userPercentage'})}}
            />

            <MyItem 
              notificationText='系统时间' 
              numberText={this.state.data[this.state.data.length-1]['sysPercentage']+'%'}
              numberColor={ this.state.data[this.state.data.length-1]['sysPercentage']<25?'green':
                            this.state.data[this.state.data.length-1]['sysPercentage']<75?'orange':'red'}
              pressFunc={()=>{this.setState({displayName:'sysPercentage'})}}
            />

            
          </View>

          <View style={styles.lineView}>

            <MyItem 
              notificationText='空闲时间' 
              numberText={this.state.data[this.state.data.length-1]['idlePercentage']+'%'}
              numberColor={ this.state.data[this.state.data.length-1]['idlePercentage']<25?'green':
                            this.state.data[this.state.data.length-1]['idlePercentage']<75?'orange':'red'}
              pressFunc={()=>{this.setState({displayName:'idlePercentage'})}}
            />

            <MyItem 
              notificationText='1分钟内平均负载' 
              numberText={this.state.data[this.state.data.length-1]['1minLoadAvg']+'%'}
              numberColor={ this.state.data[this.state.data.length-1]['1minLoadAvg']<25?'green':
                            this.state.data[this.state.data.length-1]['1minLoadAvg']<75?'orange':'red'}
              pressFunc={()=>{this.setState({displayName:'1minLoadAvg'})}}
            />
            
          </View>

          <View style={styles.lineView}>

            <MyItem 
              notificationText='5分钟内平均负载' 
              numberText={this.state.data[this.state.data.length-1]['5minLoadAvg']+'%'}
              numberColor={ this.state.data[this.state.data.length-1]['5minLoadAvg']<25?'green':
                            this.state.data[this.state.data.length-1]['5minLoadAvg']<75?'orange':'red'}
              pressFunc={()=>{this.setState({displayName:'5minLoadAvg'})}}
            />

            <MyItem 
              notificationText='15分钟内平均负载' 
              numberText={this.state.data[this.state.data.length-1]['15minLoadAvg']+'%'}
              numberColor={ this.state.data[this.state.data.length-1]['15minLoadAvg']<25?'green':
                            this.state.data[this.state.data.length-1]['15minLoadAvg']<75?'orange':'red'}
              pressFunc={()=>{this.setState({displayName:'15minLoadAvg'})}}
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
  iconView:{
    height:windowHeight*0.11,
    width:windowWidth*0.49,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
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
  numberText:{
    fontSize:windowWidth*0.04,
    color:'white'
  }
})