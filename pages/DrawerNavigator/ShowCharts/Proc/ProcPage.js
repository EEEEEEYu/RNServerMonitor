import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions
} from 'react-native'

import Entypo from 'react-native-vector-icons/Entypo'

class CollapsibleList extends React.Component{

  _renderItem=({item})=>{
    return(
      <View style={styles.procRowView}>

        <View style={{
          flex:15,
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Text style={styles.procItemText}>{item.pid}</Text>
        </View>

        <View style={{
          flex:30,
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Text style={styles.procItemText}>{item.user}</Text>
        </View>

        <View style={{
          flex:40,
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Text style={styles.procItemText}>{item.name}</Text>
        </View>

        <View style={{
          flex:15,
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Text style={styles.procItemText}>{item.cpu}</Text>
        </View>
      </View>
    )
  }

  render(){
    if(this.props.open){
      return(
        <View>

          {/*折叠框头 */}
          <TouchableOpacity 
            style={styles.collapsibleListHeader}
            onPress={this.props.touchFunc}
          >
            
            <View style={styles.HeaderIconView}>
              <Entypo name='chevron-thin-down' size={50} color='black'/>
            </View>

            <View style={styles.headerNotificationView}>
              <Text style={styles.headerNotificationText}>{this.props.notificationText}</Text>
            </View>

          </TouchableOpacity>

          {/*表头 */}
          <View style={styles.itemHeaderView}>

            <View style={{
              flex:15,
              height:windowHeight*0.05,
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center',
              borderColor:'black',
              borderBottomWidth:2
            }}>
              <Text style={styles.itemHeaderText}>{this.props.header[0]}</Text>
            </View>

            <View style={{
              flex:30,
              height:windowHeight*0.05,
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center',
              borderColor:'black',
              borderLeftWidth:2,
              borderBottomWidth:2
            }}>
              <Text style={styles.itemHeaderText}>{this.props.header[1]}</Text>
            </View>

            <View style={{
              flex:40,
              height:windowHeight*0.05,
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center',
              borderColor:'black',
              borderLeftWidth:2,
              borderBottomWidth:2
            }}><Text style={styles.itemHeaderText}>{this.props.header[2]}</Text></View>
            
            <View style={{
              flex:15,
              height:windowHeight*0.05,
              flexDirection:'row',
              justifyContent:'center',
              alignItems:'center',
              borderColor:'black',
              borderLeftWidth:2,
              borderBottomWidth:2
            }}><Text style={styles.itemHeaderText}>{this.props.header[3]}</Text></View>
          
          </View>

          {/*显示应用的部分 */}
          <FlatList
            renderItem={this._renderItem}
            data={this.props.data}
            keyExtractor={(item)=>String(item.pid)}
          />

        </View>
      )
    }
    else{
      return(
        <View>
          <TouchableOpacity 
            style={styles.collapsibleListHeader}
            onPress={this.props.touchFunc}
          >
            
            <View style={styles.HeaderIconView}>
              <Entypo name='chevron-thin-right' size={50} color='black'/>
            </View>

            <View style={styles.headerNotificationView}>
              <Text style={styles.headerNotificationText}>{this.props.notificationText}</Text>
            </View>

          </TouchableOpacity>



        </View>
      )
    }
  }
}

export default class ProcPage extends React.Component{

  state={
    CPUData:[
      {
        pid:2231,
        user: "yhw",
        cpu: 44.3,
        name: "code"
      },
      {
        pid:2221,
        user: "yhw",
        cpu: 2.3,
        name: "Xorg"
      },
      {
        pid:1647,
        user: "yhw",
        cpu: 1.9,
        name: "gnome-shell"
      }
    ],
    MemData:[],
    GPUData:[],
    CPUOpen:true,
    GPUOpen:false,
    MemOpen:false
  }

  _reverseCPUListOpen=()=>{
    this.setState({CPUOpen:!this.state.CPUOpen})
  }

  _reverseGPUListOpen=()=>{
    this.setState({GPUOpen:!this.state.GPUOpen})
  }

  _reverseMemListOpen=()=>{
    this.setState({MemOpen:!this.state.MemOpen})
  }

  render(){
    return(
      <View style={styles.layerView}>

        <CollapsibleList 
          open={this.state.CPUOpen}
          touchFunc={this._reverseCPUListOpen}
          notificationText='CPU使用前十'
          data={this.state.CPUData}
          header={['PID','所属用户','应用名','比例']}
        />

        <CollapsibleList 
          open={this.state.GPUOpen}
          touchFunc={this._reverseGPUListOpen}
          notificationText='内存使用前十'
          data={this.state.MemData}
          header={['PID','所属用户','应用名','比例']}
        />

        <CollapsibleList 
          open={this.state.MemOpen}
          touchFunc={this._reverseMemListOpen}
          notificationText='显存使用前十'
          data={this.state.GPUData}
          header={['PID','所属用户','应用名','用量']}
        />

      </View>
    )
  }
}

const windowHeight=Dimensions.get('window').height
const windowWidth=Dimensions.get('window').width

const styles=StyleSheet.create({
  layerView:{
    flex:1,
    flexDirection:'column'
  },
  //折叠列表表头样式
  collapsibleListHeader:{
    flexDirection:'row',
    justifyContent:'flex-start',
    height:windowHeight*0.1,
    backgroundColor:'white',
    borderBottomColor:'black',
    borderBottomWidth:2
  },
  //折叠列表状态图标样式
  HeaderIconView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:windowWidth*0.05
  },
  //折叠列表提示文字View样式
  headerNotificationView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:50
  },
  //折叠列表提示文字样式
  headerNotificationText:{
    fontSize:30,
    color:'black'
  },
  //进程条目表头View的样式
  itemHeaderView:{
    flexDirection:'row',
    justifyContent:'center'
  },
  //进程条目表头中提示文字View的样式
  itemHeader:{
    flex:1,
    height:windowHeight*0.05,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderColor:'black',
    borderLeftWidth:2,
    borderBottomWidth:2
  },
  //进程条目表头提示文字的样式
  itemHeaderText:{
    fontSize:18
  },
  //每一个进程的行View样式
  procRowView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderColor:'black',
    borderBottomWidth:2,
  },
  //每个进程中每一项的样式
  procItemView:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  procItemText:{
    fontSize:18
  }
})