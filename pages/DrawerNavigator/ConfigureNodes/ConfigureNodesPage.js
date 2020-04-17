import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal
} from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { TextInput } from 'react-native-gesture-handler'

/*
visible:boolean

*/
//这是弹窗组件
class PopModal extends React.Component{
  render(){
    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        hardwareAccelerated={true}
      >
        <View style={styles.modalLayer}>
          <View style={styles.modalContainer}>

          <View style={styles.modalNotificationView}>
              <SimpleLineIcons name='wrench' size={35}/>
              <Text style={{fontSize:30,marginLeft:10}}>编辑节点</Text>
            </View>

            <View style={styles.newnodeView}>
              <View style={styles.inputNotificationView}>
                <Text style={styles.inputNotification}>CPU阈值</Text>
              </View>
              <TextInput 
                style={styles.newnodeInput} 
              />
            </View>

            <View style={styles.newnodeView}>
              <View style={styles.inputNotificationView}>
                <Text style={styles.inputNotification}>GPU阈值</Text>
              </View>
              <TextInput 
                style={styles.newnodeInput}
                onChangeText={(text)=>{
                  this.props.setIP(text)
                }}
                defaultValue={this.props.ip}
              />
            </View>

            <View style={styles.newnodeView}>
              <View style={styles.inputNotificationView}>
                <Text style={styles.inputNotification}>显存阈值</Text>
              </View>
              <TextInput 
                style={styles.newnodeInput}
              />
            </View>

            <View style={styles.newnodeView}>
              <View style={styles.inputNotificationView}>
                <Text style={styles.inputNotification}>内存阈值</Text>
              </View>
              <TextInput 
                style={styles.newnodeInput}
              />
            </View>

            <Button title="确定" onPress={this.props.editNode}/>
            <Button title="关闭" onPress={()=>{
              this.props.setVisible(false)
            }}/>
          </View>
        </View>
      </Modal>
    )
  }
}

export default class ConfigureUser extends React.Component{

  state={
    //添加状态码，0代表和节点正常通信，1代表节点有过载的数据，2代表对应节点异常，3代表手机未联网
    nodes:[
      {id:'0',ip:'192.168.1.4',port:'5000',name:'新的',statecode:0,CPU:90,GPU:90,GMemory:87,Memory:90,overload:30,cooldown:180},
      {id:'1',ip:'192.168.14.34',port:'5000',name:'新的节',statecode:1,CPU:90,GPU:90,GMemory:90,Memory:54,overload:30,cooldown:180},
      {id:'2',ip:'192.168.14.34',port:'332',name:'新的节点',statecode:2,CPU:90,GPU:65,GMemory:90,Memory:90,overload:30,cooldown:180}
    ],
    modalVisible:false
  }

  /*1、加载本地的节点信息数据到state中
    2、和NodeManage记得同步
   */
  componentDidMount(){

  }

  _setModalVisible=(open)=>{
    this.setState({modalVisible:open})
  }

  _renderItem=({item})=>{
    return(
      <View style={styles.nodeView}>
        <TouchableOpacity 
          style={styles.nodeButton}
          onPress={()=>{this._setModalVisible(true)}}
        >
          
          {/*第一个横行，放节点名和IP*/}
          <View style={styles.nodeHeaderView}>
            <Text>{item.name}</Text>
            <Text>{item.ip}:{item.port}</Text>
          </View>

          {/*第二个横行，放CPU、GPU、显存阈值*/}
          <View style={styles.nodeItemView}>
            <Text>{item.CPU}</Text>
            <Text>{item.GPU}</Text>
            <Text>{item.GMemory}</Text>
          </View>

          {/*第三个横行，放内存阈值和超时、冷却时间*/}
          <View style={styles.nodeItemView}>
            <Text>{item.Memory}</Text>
            <Text>{item.overload}</Text>
            <Text>{item.cooldown}</Text>
          </View>

        </TouchableOpacity>
      </View>
    )
  }

  render(){
    return(
      <View>

        <FlatList
          data={this.state.nodes}
          renderItem={this._renderItem}
          keyExtractor={item=>item.id}
        />

        <PopModal
          visible={this.state.modalVisible}
          setVisible={this._setModalVisible}
        />
        
      </View>
    )
  }
}

const windowWidth=Dimensions.get('window').width
const windowHeight=Dimensions.get('window').height

const styles=StyleSheet.create({
  //显示节点框的样式
  nodeView:{
    flexDirection:'column',
    justifyContent:'center'
  },
  //节点样式
  nodeButton:{
    height:Dimensions.get('window').width*0.382,
    width:Dimensions.get('window').width*0.96,
    borderRadius:Dimensions.get('window').width*0.1,
    borderWidth:2,
    backgroundColor:'white',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:Dimensions.get('window').height*0.015,
    marginHorizontal:Dimensions.get('window').width*0.02
  },
  nodeRowView:{
    flexDirection:'row',
    justifyContent:'center',
    flex:1
  },
  nodeHeaderView:{
    flex:40,
    flexDirection:'row',
    backgroundColor:'red'
  },
  nodeItemView:{  
    flex:20,
    flexDirection:'row',
    backgroundColor:'green'
  },
  //弹窗背景样式
  modalLayer: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center',
    padding: 32
  },
  //弹窗容器样式
  modalContainer: {
    flexDirection:'column',
    height: Dimensions.get('window').height*0.42,
    backgroundColor: 'white',
    justifyContent: 'flex-end'
  },
  //“编辑节点”提示的View
  modalNotificationView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  //包裹输入框和提示文字View的样式
  newnodeView:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    marginVertical:5
  },
  inputNotificationView:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    marginLeft:15
  },
  //输入提示文字的样式
  inputNotification:{
    fontSize:22
  },
  //弹窗输入框的样式
  newnodeInput:{
    borderWidth:2,
    borderColor:'black',
    borderRadius:8,
    width:Dimensions.get('window').height*0.4-100,
    height:40,
    marginHorizontal:15,
    fontSize:18,
    alignContent:'center'
  }
})