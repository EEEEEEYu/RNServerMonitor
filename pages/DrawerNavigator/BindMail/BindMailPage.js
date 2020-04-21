import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native'

import {TextInput} from 'react-native-gesture-handler'

export default class BindMailPage extends React.Component{

  state={
    Email:null
  }

  //组件挂载后，从全局存储中取出绑定的通知邮箱并将Email状态设置
  componentDidMount(){
    global.storage.load({key:'loginConfiguration'})
    .then(ret=>{this.setState({Email:ret.BindEmail})})
    .catch(err=>{Alert.alert('获取用户设置失败！')})
  }

  //点击确认键后调用的函数
  _confirm=()=>{
    console.log(global.UserEmail)
    fetch(global.ServerIPandPort+'/UserConfigure',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        UserEmail:global.UserEmail,
        UserBindEmail:this.state.Email
      })
    })
    //将响应转化为json
    .then((response)=>response.json())
    .then((responseJSON)=>{
      if(!responseJSON['status']){
        Alert.alert(responseJSON['message'])
      }
      else{
        //先读取本地的配置，然后将其赋值为新的配置
        global.storage.load({key:'loginConfiguration'})
        .then(ret=>{
          ret.BindEmail=this.state.Email
          global.storage.save({
            key:'loginConfiguration',
            data:ret
          })
          .then(()=>{Alert.alert('更新成功！')})
          .catch(err=>{Alert.alert('保存本地设置失败！')})
        })
        .catch(err=>{Alert.alert('读取本地设置失败！')})
      }
    })
    .catch((err)=>{
      Alert.alert('网络错误或服务器未开启！')
    })
  }

  render(){
    return(
      <View style={styles.layerView}>

        <View style={styles.headerView}>
          <Text style={styles.headerText}>通知邮箱设置</Text>
        </View>

        <View style={styles.inputView}>
          <Text style={styles.inputNotificationText}>邮箱</Text>
          <TextInput 
            style={styles.input} 
            defaultValue={this.state.Email}
            onChangeText={(text)=>{this.setState({Email:text})}}
          />
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.goBack()}>
            <Text style={{fontSize:windowWidth*0.05}}>返回</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={this._confirm}>
            <Text style={{fontSize:windowWidth*0.05}}>确认</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

const windowWidth=Dimensions.get('window').width
const windowHeight=Dimensions.get('window').height

const styles=StyleSheet.create({
  layerView:{
    flexDirection:'column',
    alignItems:'center',
    flex:1
  },
  headerView:{
    marginTop:windowHeight*0.2,
    marginBottom:windowHeight*0.12
  },
  headerText:{
    fontSize:windowHeight*0.05
  },
  inputView:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginBottom:windowHeight*0.12
  },
  inputNotificationText:{
    fontSize:windowWidth*0.08,
    marginHorizontal:windowWidth*0.07
  },
  input:{
    width:windowWidth*0.5,
    height:windowHeight*0.05,
    borderWidth:2,
    borderColor:'black'
  },
  buttonView:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    width:windowWidth
  },
  button:{
    height:windowWidth*0.1,
    width:windowHeight*0.15,
    borderWidth:2,
    borderColor:'black',
    justifyContent:'center',
    alignItems:'center'
  }
})