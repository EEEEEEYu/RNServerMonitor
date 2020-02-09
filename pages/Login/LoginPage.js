import React from 'react'
import {
  SafeAreaView,
  Text,
  Button,
  AsyncStorage,
  StyleSheet,
  View,
  Dimensions,
  Alert
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'


export default class LoginPage extends React.Component{
  state={
    EmailOrPhone:null,
    Password:null,
    show1:null,
    show2:null
  }


  _getDataLogin=async (KeyArray)=>{
    try{
      const value=await AsyncStorage.multiGet(KeyArray);
      if(value!==null){
        console.log('获取成功')
        return value
      }
      else{
        console.log('获取失败0')
        return null
      }
    }
    catch(error){
      console.log('获取失败1')
    }
  }

  _login=()=>{
    if(this.state.EmailOrPhone==null){
      Alert.alert('邮箱或手机不能为空!')
    }
    else if(this.state.Password==null){
      Alert.alert('密码不能为空!')
    }
    else{
      const arr=['@UserName:'+this.state.EmailOrPhone,'@UserPassword:'+this.state.EmailOrPhone]
      this._getDataLogin(arr)
      .then((response)=>{
        console.log(response);
        this.props.navigation.navigate("DrawerNavigator")
      })


      //const password=this._getDataLogin('@UserPassword:0')

      /*
      if(phone===this.state.EmailOrPhone){
        if(password===this.state.password){
          Alert.alert('登录成功!欢迎'+this._getDataLogin('@UserName:0'));
          this.props.navigation.navigate("DrawerNavigator")
        }
        else{
          Alert.alert('密码错误!')
        }
      }
      else{
        Alert.alert('该用户不存在!')
      }*/
    }
  }

  render(){
    return(
      <SafeAreaView>
        <Text>登录页面</Text>

        <View>
          <View style={styles.InputView}>
            <Text>邮箱/手机号</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(text)=>{
                this.setState({
                  EmailOrPhone:text
                })
              }}
            />
          </View>
          <View style={styles.InputView}>
            <Text>密码</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(text)=>{
                this.setState({
                  Password:text
                })
              }}
            />
          </View>
        </View>


        <View style={styles.buttonView}>
          <Button title="登录" onPress={()=>this._login()}/>
          <Button title="注册" onPress={()=>this.props.navigation.navigate("RegisterPage")}/>
        </View>
        <Text>{this.state.EmailOrPhone}</Text>
        <Text>{this.state.Password}</Text>
        <Text>{this.state.show1}</Text>
        <Text>{this.state.show2}</Text>
      </SafeAreaView>
    )
  }
}

const styles=StyleSheet.create({
  inputView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  
  buttonView:{
    flexDirection:'column',
    justifyContent:'center'
  },
  textInput:{
    width:Dimensions.get("window").width*2/3,
    height:35,
    borderColor:'black',
    borderWidth:1
  }

})