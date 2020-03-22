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


/*底部菜单栏的子组件*/
class SettingList extends React.Component{
  render(){
    if(this.props.open){
      return(
        <View style={styles.settingListButtonView}>
          <TouchableOpacity style={styles.bottomButton} onPress={()=>{this.props._setModalVisible(true)}}>
              <Icon name="ios-add-circle-outline" size={50} color='white'/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton}>
              <Feather name="edit" size={40} color='white'/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButton} onPress={()=>{this.props._setSettingListOpen(false)}}>
              <Icon name="ios-settings" size={50} color='white'/>
          </TouchableOpacity>
        </View>
      )
    }
    else{
      return(
        <View style={styles.bottomButtonView }>
            <TouchableOpacity style={styles.bottomButton} onPress={()=>{this.props._setSettingListOpen(true)}}>
              <Icon name="ios-settings" size={50} color='white'/>
            </TouchableOpacity>
        </View>
      )
    }
  }

}


export default class NodeManagePage extends React.Component{

  state={
    nodes:[
      {
        id:'1',
        url:'192.168.1.4:5000',
        name:'新的节点'
      },
      {
        id:'2',
        url:'192.168.14.34:5000',
        name:'新的节点'
      },
      {
        id:'3',
        url:'192.168.14.34:5000',
        name:'新的节点'
      }
    ],
    nextID:4,
    modalVisible:false,
    newnodeNameInput:null,
    newnodeIPInput:null,
    newnodePortInput:null,

    settingListOpen:false
  }

  /*Flatlist中渲染item的函数*/
  _renderItem=({item})=>{
    return (
      <View style={styles.nodeView}>
        {/*整体框架*/}
        <TouchableOpacity 
          style={styles.nodeButton}
          onPress={()=>{
            this.props.navigation.navigate('ShowCharts',{ID:item.id,URL:item.url,Name:item.name})
          }}
        >
          {/*节点网络状态图标*/}
          <View style={styles.buttonIconView}>
            <Entypo name='emoji-happy' size={30} color='green'/>
          </View>

          {/*节点信息*/}
          <View style={styles.buttonNodeInfoView}>
            <Text style={{fontSize:30}}>{item.name+item.id}</Text>
            <Text style={{fontSize:18}}>{item.url}</Text>
          </View>

          {/*节点编辑图标*/}
          <View style={styles.buttonIconView}>
            <Feather name='edit' size={40} onPress={()=>{Alert.alert('你点击了编辑')}}/>
          </View>

          {/*节点删除图标*/}
          <View style={styles.buttonIconView}>
            <Feather name='trash-2' size={40} onPress={()=>{Alert.alert('你点击了删除')}}/>
          </View>

          {/*节点详细信息图标*/}
          <View style={styles.buttonIconView}>
            <Entypo name='chevron-thin-right' size={40} onPress={()=>{Alert.alert('你点击了详细信息')}}/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  /*在弹窗中按下确定后调用的函数*/
  _addNewNode=()=>{
    if(this.state.newnodeNameInput==null){Alert.alert('节点名称不能为空!')}
    else if(this.state.newnodeIPInput==null){Alert.alert('节点IP地址不能为空!')}
    else if(this.state.newnodePortInput==null){Alert.alert('节点端口不能为空!')}
    else{
      //采用深拷贝方法，避免直接改变原state
      let newNodeArray=this.state.nodes.slice(0)
      console.log(this.state.nextID.toString())
      newNodeArray.push({
        id:this.state.nextID.toString(),
        url:this.state.newnodeIPInput+':'+this.state.newnodePortInput,
        name:this.state.newnodeNameInput
      })
      this.setState({
        nodes:newNodeArray,
        modalVisible:false,
        newnodeNameInput:null,
        newnodeIPInput:null,
        newnodePortInput:null
      })
      //更新下一个id
      let newNextID=this.state.nextID+1
      this.setState({nextID:newNextID})
    }
  }

  /*设置底部菜单打开状态的函数*/
  _setSettingListOpen=(open)=>{
    this.setState({settingListOpen:open})
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
        <SettingList 
          open={this.state.settingListOpen}  
          _setSettingListOpen={this._setSettingListOpen}
          _setModalVisible={this._setModalVisible}
        />

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

              <Button title="确定" onPress={this._addNewNode}/>
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
  //最底部包裹设置按钮View的样式
  bottomButtonView:{
    flexDirection:'column',
    justifyContent:'flex-start',
    right:Dimensions.get('window').width/14,
    top:Dimensions.get('window').height-Dimensions.get('window').width*(3/14+1/42),
    height:Dimensions.get('window').width*(1/7+1/42),
    position:'absolute'
  },
  //包裹添加、删除节点按钮View的样式
  settingListButtonView:{
    flexDirection:'column',
    justifyContent:'flex-start',
    right:Dimensions.get('window').width/14,
    top:Dimensions.get('window').height-Dimensions.get('window').width*8/14,
    position:'absolute',
    height:Dimensions.get('window').width*7/14
  },
  //显示节点框的样式
  nodeView:{
    flexDirection:'column',
    justifyContent:'center'
  },
  //节点样式
  nodeButton:{
    height:120,
    width:Dimensions.get('window').width,
    borderRadius:30,
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:10,

    shadowColor:'gray',
    shadowOffset:{height:1,width:1},
    shadowOpacity:1,
    shadowRadius:1
  },
  //节点信息View样式，占屏幕宽40%
  buttonNodeInfoView:{
    flexDirection:'column',
    alignItems:'flex-start',
    width:Dimensions.get('window').width*0.4
  },
  //节点状态、编辑、删除、详细信息图标外围View样式，占屏幕宽15%
  buttonIconView:{
    flexDirection:'row',
    justifyContent:'center',
    width:Dimensions.get('window').width*0.15
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
  },




})
