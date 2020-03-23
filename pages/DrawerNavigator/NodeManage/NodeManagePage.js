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



export default class NodeManagePage extends React.Component{

  state={
    //添加状态码，0代表和节点正常通信，1代表手机未联网，2代表对应节点异常
    nodes:[
      {
        id:'0',
        ip:'192.168.1.4',
        port:'5000',
        name:'新的节点',
        statecode:0
      },
      {
        id:'1',
        ip:'192.168.14.34',
        port:'5000',
        name:'新的节点',
        statecode:1
      },
      {
        id:'2',
        ip:'192.168.14.34',
        port:'332',
        name:'新的节点',
        statecode:2
      }
    ],
    modalVisible:false,
    newnodeNameInput:null,
    newnodeIPInput:null,
    newnodePortInput:null,

    settingOpen:false,
    editidx:null
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
                  newnodeNameInput:this.state.nodes[item.id],
                  newnodeIPInput:this.state.nodes[item.id],
                  newnodePortInput:this.state.nodes[item.id],
                  editidx:item.id
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
              this.props.navigation.navigate('ShowCharts',{ID:item.id,IP:item.ip,port:item.port,Name:item.name})
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
      newNodeArray.push({
        id:newNodeArray.length.toString(),
        ip:this.state.newnodeIPInput,
        port:this.state.newnodePortInput,
        name:this.state.newnodeNameInput
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
    if(this.state.newnodeNameInput==null){Alert.alert('节点名称不能为空!')}
    else if(this.state.newnodeIPInput==null){Alert.alert('节点IP地址不能为空!')}
    else if(this.state.newnodePortInput==null){Alert.alert('节点端口不能为空!')}
    else{
      //采用深拷贝方法，避免直接改变原state
      let newNodeArray=this.state.nodes.slice(0)
      newNodeArray[this.state.editidx]={
        id:newNodeArray.length.toString(),
        ip:this.state.newnodeIPInput,
        port:this.state.newnodePortInput,
        name:this.state.newnodeNameInput
      }
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

  render(){
    return(
      <View>
        <FlatList 
          data={this.state.nodes}
          renderItem={this._renderItem}
          style={styles.list}
          keyExtractor={item=>item.id}
        />
        
        {/*底部菜单组件*/}
        <View style={styles.settingListButtonView }>
            <TouchableOpacity style={styles.bottomButton} onPress={()=>{this._setModalVisible(true)}}>
              <Icon name="ios-add-circle-outline" size={50} color='white'/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomButton} onPress={this._reverseSettingOpen}>
              <Icon name="ios-settings" size={50} color='white'/>
            </TouchableOpacity>
        </View>

        {/*弹出框组件*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          hardwareAccelerated={true}
        >
          <View style={styles.modalLayer}>
            <View style={styles.modalContainer}>

              <Text>新的节点</Text>

              <View style={styles.newnodeView}>
                <Text style={styles.inputNotification}>节点名称</Text>
                <TextInput 
                  style={styles.newnodeInput} 
                  onChangeText={(text)=>{
                    this.setState({newnodeNameInput:text})
                  }}
                />
              </View>

              <View style={styles.newnodeView}>
                <Text style={styles.inputNotification}>节点IP</Text>
                <TextInput 
                  style={styles.newnodeInput}
                  onChangeText={(text)=>{
                    this.setState({newnodeIPInput:text})
                  }}
                />
              </View>

              <View style={styles.newnodeView}>
                <Text style={styles.inputNotification}>节点端口号</Text>
                <TextInput 
                  style={styles.newnodeInput}
                  onChangeText={(text)=>{
                    this.setState({newnodePortInput:text})
                  }}
                />
              </View>

              {/*当前弹窗有新增与编辑两种状态，需要进行判断*/}
              <Button title="确定" onPress={()=>{
                if(this.state.editidx==null)return this._addNewNode
                else return this._editNode
              }}/>
              <Button title="关闭" onPress={()=>{
                this.setState({newnodeNameInput:null,newnodeIPInput:null,newnodePortInput:null,modalVisible:false})
              }}/>
            </View>
          </View>
        </Modal>

      </View>
    )
  }
}

const emojiMap=['emoji-happy','emoji-neutral','emoji-sad']
const emojiColorMap=['green','orange','red']


const styles=StyleSheet.create({
  //最底部设置按钮的样式
  bottomButton:{
    height:Dimensions.get('window').width/7,
    width:Dimensions.get('window').width/7,
    backgroundColor:'gray',
    borderColor:'gray',
    borderWidth:1,
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
    height: Dimensions.get('window').height*0.4,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  //包裹输入框和提示文字View的样式
  newnodeView:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginVertical:10
  },
  //输入提示文字的样式
  inputNotification:{
    marginHorizontal:10
  },
  //弹窗输入框的样式
  newnodeInput:{
    borderWidth:2,
    borderColor:'black',
    borderRadius:7,
    width:Dimensions.get('window').height*0.4-100,
    height:32,
    marginHorizontal:15
  }
})
