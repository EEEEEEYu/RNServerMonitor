import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert
} from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
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
                defaultValue={this.props.CPU}
                onChangeText={(text)=>{this.props.setCPU(text)}}
              />
              <Text style={{fontSize:windowWidth*0.05,marginLeft:windowWidth*0.01}}>%</Text>
            </View>

            <View style={styles.newnodeView}>
              <View style={styles.inputNotificationView}>
                <Text style={styles.inputNotification}>GPU阈值</Text>
              </View>
              <TextInput 
                style={styles.newnodeInput}
                onChangeText={(text)=>{this.props.setGPU(text)}}
                defaultValue={this.props.GPU}
              />
              <Text style={{fontSize:windowWidth*0.05,marginLeft:windowWidth*0.01}}>%</Text>
            </View>

            <View style={styles.newnodeView}>
              <View style={styles.inputNotificationView}>
                <Text style={styles.inputNotification}>显存阈值</Text>
              </View>
              <TextInput 
                style={styles.newnodeInput}
                defaultValue={this.props.GMemory}
                onChangeText={(text)=>{this.props.setGMemory(text)}}
              />
              <Text style={{fontSize:windowWidth*0.05,marginLeft:windowWidth*0.01}}>%</Text>
            </View>

            <View style={styles.newnodeView}>
              <View style={styles.inputNotificationView}>
                <Text style={styles.inputNotification}>内存阈值</Text>
              </View>
              <TextInput 
                style={styles.newnodeInput}
                defaultValue={this.props.Memory}
                onChangeText={(text)=>{this.props.setMemory(text)}}
              />
              <Text style={{fontSize:windowWidth*0.05,marginLeft:windowWidth*0.01}}>%</Text>
            </View>

            <View style={styles.newnodeView}>
              <View style={styles.inputNotificationView}>
                <Text style={styles.inputNotification}>过载时间</Text>
              </View>
              <TextInput 
                style={styles.newnodeInput}
                defaultValue={this.props.Overload}
                onChangeText={(text)=>{this.props.setOverload(text)}}
              />
              <Text style={{fontSize:windowWidth*0.05,marginLeft:windowWidth*0.01}}>s</Text>
            </View>

            <View style={styles.newnodeView}>
              <View style={styles.inputNotificationView}>
                <Text style={styles.inputNotification}>邮件冷却</Text>
              </View>
              <TextInput 
                style={styles.newnodeInput}
                defaultValue={this.props.Cooldown}
                onChangeText={(text)=>{this.props.setCooldown(text)}}
              />
              <Text style={{fontSize:windowWidth*0.05,marginLeft:windowWidth*0.01}}>s</Text>
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
      {id:'0',NodeID:0,ip:'192.168.1.4',port:'5000',name:'新的',statecode:0,CPU:90,GPU:90,GMemory:87,Memory:90,overload:30,cooldown:180},
      {id:'1',NodeID:1,ip:'192.168.14.34',port:'5000',name:'新的节',statecode:1,CPU:90,GPU:90,GMemory:90,Memory:54,overload:30,cooldown:180},
      {id:'2',NodeID:2,ip:'192.168.14.34',port:'332',name:'新的节点',statecode:2,CPU:90,GPU:65,GMemory:90,Memory:90,overload:30,cooldown:180}
    ],
    modalVisible:false,

    //当前的输入
    CPUInput:null,
    GPUInput:null,
    MemoryInput:null,
    GMemoryInput:null,
    OverloadInput:null,
    CooldownInput:null,
    currentNodeID:null
  }

  /*1、加载本地的节点信息数据到state中
    2、和NodeManage记得同步
   */
  componentDidMount(){

  }

  //设置弹窗可见性
  _setModalVisible=(open)=>{this.setState({modalVisible:open})}

  _setCPU=(val)=>{this.setState({CPUInput:val})}

  _setGPU=(val)=>{this.setState({GPUInput:val})}

  _setGMemory=(val)=>{this.setState({GMemoryInput:val})}

  _setMemory=(val)=>{this.setState({MemoryInput:val})}

  _setOverload=(val)=>{this.setState({Overload:val})}

  _setCooldown=(val)=>{this.setState({CooldownInput:val})}

  //点击弹窗的确认后调用的函数
  //首先发起网络请求，在数据库中同步设置，然后再改变本地设置
  _confirm=(idx)=>{
    fetch(global.ServerIPandPort+'/ManagerConfigure',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        UserEmail:global.UserEmail,
        NodeID:this.state.currentNodeID,
        CPUThreshold:this.state.CPUInput,
        GPUThreshold:this.state.GPUInput,
        GMemoryThreshold:this.state.GMemoryInput,
        MemoryThreshold:this.state.MemoryInput,
        OverLoadTime:this.state.OverloadInput,
        CoolDownTime:this.state.CooldownInput
      })
    })
    //将响应转化为json
    .then((response)=>response.json())
    .then((responseJSON)=>{
      //如果返回失败，显示错误信息
      if(!responseJSON['status']){
        Alert.alert(responseJSON['message'])
      }
      //返回成功，则修改本地的设置
      else{
        this.state.nodes[idx].CPU=this.state.CPUInput
        this.state.nodes[idx].GPU=this.state.GPUInput
        this.state.nodes[idx].Gmemory=this.state.GMemoryInput
        this.state.nodes[idx].Memory=this.state.MemoryInput
        this.state.nodes[idx].overload=this.state.OverloadInput
        this.state.nodes[idx].cooldown=this.state.CooldownInput
        global.storage.save({
          key:'nodes',
          data:this.state.nodes
        })
        .then(()=>{Alert.alert('修改成功！')})
        .catch((err)=>{Alert.alert('保存本地配置时出现错误！')})
      }
    })
  }


  _renderItem=({item})=>{
    return(
      <View style={styles.nodeView}>
        <TouchableOpacity 
          style={styles.nodeButton}
          onPress={()=>{
            this.setState({
              CPUInput:this.state.nodes[parseInt(item.id)].CPU,
              GPUInput:this.state.nodes[parseInt(item.id)].GPU,
              MemoryInput:this.state.nodes[parseInt(item.id)].Memory,
              GMemoryInput:this.state.nodes[parseInt(item.id)].GMemory,
              OverloadInput:this.state.nodes[parseInt(item.id)].overload,
              CooldownInput:this.state.nodes[parseInt(item.id)].cooldown,
              currentNodeID:this.state.nodes[parseInt(item.id)].NodeID
            })
            this._setModalVisible(true)
          }}
        >
          
          {/*第一个横行，放节点名和IP*/}
          <View style={styles.nodeHeaderView}>
            <Text style={styles.nodeHeaderText}>{item.name}</Text>
            <Text style={styles.nodeItemText}>{item.ip}:{item.port}</Text>
          </View>

          {/*第二个横行，放CPU、GPU、显存阈值*/}
          <View style={styles.nodeRowView}>
            
            <View style={styles.nodeItemView}>
              <Text style={styles.nodeItemText}>CPU阈值</Text>
              <Text style={styles.nodeItemText}>{item.CPU}%</Text>
            </View>

            <View style={styles.nodeItemView}>
              <Text style={styles.nodeItemText}>GPU阈值</Text>
              <Text style={styles.nodeItemText}>{item.GPU}%</Text>
            </View>

            <View style={styles.nodeItemView}>
              <Text style={styles.nodeItemText}>显存阈值</Text>
              <Text style={styles.nodeItemText}>{item.GMemory}%</Text>
            </View>
          </View>

          {/*第三个横行，放内存阈值和超时、冷却时间*/}
          <View style={styles.nodeRowView}>

            <View style={styles.nodeItemView}>
              <Text style={styles.nodeItemText}>内存阈值</Text>
              <Text style={styles.nodeItemText}>{item.Memory}%</Text>
            </View>

            <View style={styles.nodeItemView}>
              <Text style={styles.nodeItemText}>过载时间</Text>
              <Text style={styles.nodeItemText}>{item.overload}s</Text>
            </View>

            <View style={styles.nodeItemView}>
              <Text style={styles.nodeItemText}>冷却时间</Text>
              <Text style={styles.nodeItemText}>{item.cooldown}s</Text>
            </View>
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
          ListFooterComponent={()=>{
            return(<View style={{backgroundColor:'white',height:300}}/>)
          }}
        />

        {/*底部菜单组件*/}
        <View style={styles.settingListButtonView }>
            <TouchableOpacity style={styles.bottomButton} onPress={()=>this.props.navigation.goBack()}>
              <Ionicons name="md-arrow-round-back" size={45} color='black'/>
            </TouchableOpacity>
        </View>

        <PopModal
          visible={this.state.modalVisible}
          setVisible={this._setModalVisible}
          CPU={String(this.state.CPUInput)}
          GPU={String(this.state.GPUInput)}
          Memory={String(this.state.MemoryInput)}
          GMemory={String(this.state.GMemoryInput)}
          Overload={String(this.state.OverloadInput)}
          Cooldown={String(this.state.CooldownInput)}
          setCPU={this._setCPU}
          setGPU={this._setGPU}
          setGMemory={this._setGMemory}
          setMemory={this._setMemory}
          setOverload={this._setOverload}
          setCooldown={this._setCooldown}
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
    height:windowWidth*0.382,
    width:windowWidth*0.96,
    borderRadius:windowWidth*0.1,
    borderWidth:2,
    backgroundColor:'white',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:windowHeight*0.015,
    marginHorizontal:windowWidth*0.02
  },
  //头部节点名的View
  nodeHeaderView:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:windowHeight*0.013
  },
  //标题的文字样式
  nodeHeaderText:{
    fontSize:windowWidth*0.08
  },
  //下两行的View
  nodeRowView:{  
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:windowHeight*0.013
  },
  //每一项的View
  nodeItemView:{
    flexDirection:'row',
    justifyContent:'center',
    marginHorizontal:windowWidth*0.01
  },
  nodeItemText:{
    fontSize:windowWidth*0.045,
    marginHorizontal:windowWidth*0.005
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
    height: windowHeight*0.55,
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
    justifyContent:'flex-start',
    alignItems:'center',
    marginVertical:5
  },
  inputNotificationView:{
    flexDirection:'row',
    justifyContent:'flex-start',
    marginHorizontal:windowWidth*0.08
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
    width:windowWidth*0.35,
    height:40,
    fontSize:18,
    alignContent:'center'
  },
  //包裹添加、编辑节点按钮View的样式
  settingListButtonView:{
    flexDirection:'column',
    justifyContent:'flex-end',
    right:windowWidth/14,
    top:windowHeight-windowWidth*4/14,
    position:'absolute',
    height:windowWidth*2/14
  },
  //最底部设置按钮的样式
  bottomButton:{
    height:windowWidth/7,
    width:windowWidth/7,
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:2,
    borderRadius:windowWidth/14,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    marginTop:windowWidth/42
  }
})