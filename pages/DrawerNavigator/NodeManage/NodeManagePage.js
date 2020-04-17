import React from 'react'
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Modal,
  Alert
} from 'react-native'

import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'


/*
  visible:boolean 
  name:string
  ip:string
  port:string
  confirmFunction:function
  setName:function
  setIp:function
  setPort:fuction
  setVisible:function
*/
//这是弹窗组件
class PopModal extends React.Component{
  render(){
    //分别渲染为添加节点弹窗和编辑节点弹窗
    if(this.props.editidx!=null&&this.props.settingOpen){
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
                  <Text style={styles.inputNotification}>节点名称</Text>
                </View>
                <TextInput 
                  style={styles.newnodeInput} 
                  onChangeText={(text)=>{
                    this.props.setName(text)
                  }}
                  defaultValue={this.props.name}
                />
              </View>

              <View style={styles.newnodeView}>
                <View style={styles.inputNotificationView}>
                  <Text style={styles.inputNotification}>节点IP</Text>
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
                  <Text style={styles.inputNotification}>节点端口号</Text>
                </View>
                <TextInput 
                  style={styles.newnodeInput}
                  onChangeText={(text)=>{
                    this.props.setPort(text)
                  }}
                  defaultValue={this.props.port}
                />
              </View>

              <Button title="确定" onPress={this.props.editNode}/>
              <Button title="关闭" onPress={()=>{
                this.props.setName(null)
                this.props.setIP(null)
                this.props.setPort(null)
                this.props.setVisible(false)
              }}/>
            </View>
          </View>
        </Modal>
      )
    }
    else{
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
                <Feather name='bookmark' size={35}/>
                <Text style={{fontSize:30,marginLeft:10}}>添加节点</Text>
              </View>

              <View style={styles.newnodeView}>
                <View style={styles.inputNotificationView}>
                  <Text style={styles.inputNotification}>节点名称</Text>
                </View>
                <TextInput 
                  style={styles.newnodeInput} 
                  onChangeText={(text)=>{
                    this.props.setName(text)
                  }}
                  defaultValue={this.props.name}
                />
              </View>

              <View style={styles.newnodeView}>
                <View style={styles.inputNotificationView}>
                  <Text style={styles.inputNotification}>节点IP</Text>
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
                  <Text style={styles.inputNotification}>节点端口号</Text>
                </View>
                <TextInput 
                  style={styles.newnodeInput}
                  onChangeText={(text)=>{
                    this.props.setPort(text)
                  }}
                  defaultValue={this.props.port}
                />
              </View>

              <Button title="确定" onPress={this.props.addNode}/>
              <Button title="关闭" onPress={()=>{
                this.props.setName(null)
                this.props.setIP(null)
                this.props.setPort(null)
                this.props.setVisible(false)
              }}/>
            </View>
          </View>
        </Modal>
      )
    }
  }
}

/*
需要双端保存的数据：
只在服务器保存的数据：
只在本地保存的数据：
 */

export default class NodeManagePage extends React.Component{

  state={
    //添加状态码，0代表和节点正常通信，1代表节点有过载的数据，2代表对应节点异常，3代表手机未联网
    nodes:[
      {id:'0',ip:'192.168.1.4',port:'5000',name:'新的节点',statecode:0,CPU:90,GPU:90,GMemory:90,Memory:90,overload:30,cooldown:180},
      {id:'1',ip:'192.168.14.34',port:'5000',name:'新的节点',statecode:1,CPU:90,GPU:90,GMemory:90,Memory:90,overload:30,cooldown:180},
      {id:'2',ip:'192.168.14.34',port:'332',name:'新的节点',statecode:2,CPU:90,GPU:90,GMemory:90,Memory:90,overload:30,cooldown:180}
    ],
    modalVisible:false,
    newnodeNameInput:null,
    newnodeIPInput:null,
    newnodePortInput:null,

    settingOpen:false,
    editidx:null
  }

  /*1、设置定时器，实时监测各个节点的状态。
    2、加载节点信息到state中
  */
  componentDidMount(){

  }

  /*Flatlist中渲染item的函数*/
  _renderItem=({item})=>{

    //如果是处于编辑状态
    if(this.state.settingOpen){
      return (
        <View style={styles.nodeView}>
          {/*整体框架*/}
          <TouchableOpacity style={styles.nodeButton}>
            {/*节点网络状态图标*/}
            <View style={styles.buttonIconViewOpen}>
              <Entypo name={emojiMap[item.statecode]} size={30} color={emojiColorMap[item.statecode]}/>
            </View>
  
            {/*节点信息*/}
            <View style={styles.buttonNodeInfoViewOpen}>
              <Text style={{fontSize:30}}>{item.name+item.id}</Text>
              <Text style={{fontSize:18}}>{item.ip+':'+item.port}</Text>
            </View>
  
            {/*节点编辑图标*/}
            <View style={styles.buttonIconViewOpen}>
              <Feather name='edit' size={40} onPress={()=>{
                this.setState({
                  newnodeNameInput:this.state.nodes[parseInt(item.id)].name,
                  newnodeIPInput:this.state.nodes[parseInt(item.id)].ip,
                  newnodePortInput:this.state.nodes[parseInt(item.id)].port,
                  editidx:parseInt(item.id)
                })
                this._setModalVisible(true)
              }}/>
            </View>
  
            {/*节点删除图标*/}
            <View style={styles.buttonIconViewOpen}>
              <Feather name='trash-2' size={40} onPress={()=>{this._deleteNode(parseInt(item.id))}}/>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
    //如果处于一般状态
    else{
      return(
        <View style={styles.nodeView}>
          {/*整体框架*/}
          <TouchableOpacity 
            style={styles.nodeButton}
            onPress={()=>{
              this.props.navigation.navigate('ShowCharts',{ID:item.id,IP:item.ip,Port:item.port,Name:item.name})
            }}
          >
            {/*节点网络状态图标*/}
            <View style={styles.buttonIconViewClose}>
              <Entypo name={emojiMap[item.statecode]} size={30} color={emojiColorMap[item.statecode]}/>
            </View>
  
            {/*节点信息*/}
            <View style={styles.buttonNodeInfoViewClose}>
              <Text style={{fontSize:30}}>{item.name+item.id}</Text>
              <Text style={{fontSize:18}}>{item.ip+':'+item.port}</Text>
            </View>
  
            {/*节点详细信息图标*/}
            <View style={styles.buttonIconViewClose}>
              <Entypo name='chevron-thin-right' size={40}/>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  /*在弹窗中按下确定后调用的函数*/
  _addNewNode=()=>{
    if(this.state.newnodeNameInput==null){Alert.alert('节点名称不能为空!')}
    else if(this.state.newnodeIPInput==null){Alert.alert('节点IP地址不能为空!')}
    else if(this.state.newnodePortInput==null){Alert.alert('节点端口不能为空!')}
    else{
      //采用深拷贝方法，避免直接改变原state
      let newNodeArray=this.state.nodes.slice(0)
      //在数组末尾元素前插入元素，保证填充的尾部View能一直在尾部
      newNodeArray.push({
        id:newNodeArray.length.toString(),
        ip:this.state.newnodeIPInput,
        port:this.state.newnodePortInput,
        name:this.state.newnodeNameInput,
        statecode:2
      })
      this.setState({
        nodes:newNodeArray,
        modalVisible:false,
        newnodeNameInput:null,
        newnodeIPInput:null,
        newnodePortInput:null
      })
    }
  }

  //点击列表中删除图标后调用
  _deleteNode=(idx)=>{
    //深拷贝避免直接改变原state
    let newNodeArray=this.state.nodes.slice(0)
    newNodeArray.splice(idx,1)
    //删除某个元素后从idx索引开始向后遍历，将其后每个节点的index都减1
    for(let i=idx;i<newNodeArray.length;i++){
      newNodeArray[i].id=i.toString()
    }
    this.setState({
      nodes:newNodeArray
    })
  }

  _editNode=()=>{
    //对输入进行判断
    if(this.state.newnodeNameInput==null){Alert.alert('编辑时节点名称不能为空!')}
    else if(this.state.newnodeIPInput==null){Alert.alert('节点IP地址不能为空!')}
    else if(this.state.newnodePortInput==null){Alert.alert('节点端口不能为空!')}
    else{
      //采用深拷贝方法，避免直接改变原state
      let newNodeArray=this.state.nodes.slice(0)
      //edit函数中是修改对应位置的元素
      newNodeArray[this.state.editidx]={
        id:newNodeArray[this.state.editidx].id,
        ip:this.state.newnodeIPInput,
        port:this.state.newnodePortInput,
        name:this.state.newnodeNameInput,
        statecode:newNodeArray[this.state.editidx].statecode
      }
      //退出edit函数后将editidx设置为null
      this.setState({
        nodes:newNodeArray,
        modalVisible:false,
        newnodeNameInput:null,
        newnodeIPInput:null,
        newnodePortInput:null,
        editidx:null
      })
    }
  }

  /*反转当前编辑状态*/
  _reverseSettingOpen=()=>{
    this.setState({settingOpen:!this.state.settingOpen})
  }

  /*设置弹窗可见性的函数*/
  _setModalVisible=(visible)=>{
    this.setState({modalVisible:visible})
  }

  _setName=(name)=>{
    this.setState({newnodeNameInput:name})
  }

  _setIP=(ip)=>{
    this.setState({newnodeIPInput:ip})
  }

  _setPort=(port)=>{
    this.setState({newnodePortInput:port})
  }

  render(){
    return(
      <View>
        <FlatList 
          data={this.state.nodes}
          renderItem={this._renderItem}
          style={styles.list}
          keyExtractor={item=>item.id}
          ListFooterComponent={()=>{
            return(<View style={{backgroundColor:'white',height:300}}/>)
          }}
        />
        
        {/*底部菜单组件*/}
        <View style={styles.settingListButtonView }>
            <TouchableOpacity 
              style={styles.bottomButton} 
              //onPress={()=>{this._setModalVisible(true)}}
              onPress={()=>{this.props.navigation.openDrawer()}}
            >
              <Icon name="ios-add" size={50} color='black'/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomButton} onPress={this._reverseSettingOpen}>
              <Icon name="ios-settings" size={50} color='black'/>
            </TouchableOpacity>
        </View>

        
        {
          /*
            visible:boolean 
            name:string
            ip:string
            port:string
            confirmFunction:function
            setName:function
            setIp:function
            setPort:fuction
            setVisible:function
          */
        }
        <PopModal
          visible={this.state.modalVisible}
          editidx={this.state.editidx}
          name={this.state.newnodeNameInput}
          settingOpen={this.state.settingOpen}
          ip={this.state.newnodeIPInput}
          port={this.state.newnodePortInput}
          setName={this._setName}
          setIP={this._setIP}
          setPort={this._setPort}
          setVisible={this._setModalVisible}
          addNode={this._addNewNode}
          editNode={this._editNode}
        />

      </View>
    )
  }
}

const emojiMap=['emoji-happy','emoji-neutral','emoji-sad','emoji-neutral']
const emojiColorMap=['green','orange','red','gray']


const styles=StyleSheet.create({
  //最底部设置按钮的样式
  bottomButton:{
    height:Dimensions.get('window').width/7,
    width:Dimensions.get('window').width/7,
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:2,
    borderRadius:Dimensions.get('window').width/14,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginTop:Dimensions.get('window').width/42
  },
  //包裹添加、编辑节点按钮View的样式
  settingListButtonView:{
    flexDirection:'column',
    justifyContent:'flex-start',
    right:Dimensions.get('window').width/14,
    top:Dimensions.get('window').height-Dimensions.get('window').width*6/14,
    position:'absolute',
    height:Dimensions.get('window').width*5/14
  },
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
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:Dimensions.get('window').height*0.015,
    marginHorizontal:Dimensions.get('window').width*0.02
  },
  //处于编辑状态下节点信息View样式
  buttonNodeInfoViewOpen:{
    flexDirection:'column',
    alignItems:'flex-start',
    width:Dimensions.get('window').width*0.46,
    marginLeft:5
  },
  //处于编辑状态下节点状态、编辑、删除、详细信息图标外围View样式
  buttonIconViewOpen:{
    flexDirection:'row',
    justifyContent:'center',
    width:Dimensions.get('window').width*0.15
  },
  //处于正常状态下节点信息View样式
  buttonNodeInfoViewClose:{
    flexDirection:'column',
    alignItems:'flex-start',
    width:Dimensions.get('window').width*0.5,
    marginLeft:5
  },
  //处于正常状态下节点状态、编辑、删除、详细信息图标外围View样式
  buttonIconViewClose:{
    flexDirection:'row',
    justifyContent:'center',
    width:Dimensions.get('window').width*0.2
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
    height: Dimensions.get('window').height*0.4,
    backgroundColor: 'white',
    justifyContent: 'flex-end'
  },
  //表明当前是编辑还是新增提醒的外围View
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
    marginVertical:10
  },
  inputNotificationView:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    marginLeft:15
  },
  //输入提示文字的样式
  inputNotification:{
    fontSize:18
  },
  //弹窗输入框的样式
  newnodeInput:{
    borderWidth:2,
    borderColor:'black',
    borderRadius:8,
    width:Dimensions.get('window').height*0.4-100,
    height:40,
    marginHorizontal:15,
    fontSize:17,
    alignContent:'center'
  }
})
