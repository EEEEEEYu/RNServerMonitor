import React from 'react'
import {
  SafeAreaView,
  Text,
  Button,
  CheckBox,
  StyleSheet,
  View,
  Dimensions,
  AsyncStorage,
  Alert
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default class RegisterPage extends React.Component{
    state={
      UserName:null,
      EmailOrPhone:null,
      Password:null,
      ConfirmPassword:null
    }

  _storeDataRegister= async (PairArray)=>{
    try{
      await AsyncStorage.multiSet(PairArray);
    }catch(error){
      Alert.alert(error);
    }
  }



  _register=()=>{
    if(this.state.UserName==null){
      Alert.alert('用户名不能为空!')
    }
    else if(this.state.EmailOrPhone==null){
      Alert.alert('邮箱或手机不能为空!')
    }
    else if(this.state.Password==null){
      Alert.alert('密码不能为空!')
    }
    else if(this.state.ConfirmPassword==null){
      Alert.alert('确认密码不能为空!')
    }
    else{
      if(this.state.Password!==this.state.ConfirmPassword){
        Alert.alert('两次输入的密码不一致!')
      }
      else{
        const arr=[['@UserName:'+this.state.EmailOrPhone,this.state.UserName],['@UserPassword:'+this.state.EmailOrPhone,this.state.Password]]
        console.log('注册:'+arr)
        this._storeDataRegister(arr)
        Alert.alert('注册成功!')
      }
    }
  }

  render(){
    return(
      <SafeAreaView>
        <Text>注册页面</Text>
        <View>

          <View style={styles.inputView}>
            <Text>用户名</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(text)=>{
                this.setState({
                  UserName:text
                })
              }}
            />
          </View>

          <View style={styles.inputView}>
            <Text>邮箱/手机</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(text)=>{
                this.setState({
                  EmailOrPhone:text
                })
              }}
            />
          </View>

          <View style={styles.inputView}>
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

          <View style={styles.inputView}>
            <Text>确认密码</Text>
            <TextInput 
              style={styles.textInput}
              onChangeText={(text)=>{
                this.setState({
                  ConfirmPassword:text
                })
              }}
            />
          </View>

        </View>
        <Button title='注册' onPress={this._register}/>
        <Button title='返回' onPress={()=>this.props.navigation.navigate('LoginPage')}/>
        <Text>{this.state.UserName}</Text>
        <Text>{this.state.EmailOrPhone}</Text>
        <Text>{this.state.Password}</Text>
        <Text>{this.state.ConfirmPassword}</Text>
      </SafeAreaView>
    )
  }
}

const styles=StyleSheet.create({
  inputView:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  textInput:{
    width:Dimensions.get("window").width*2/3,
    height:35,
    borderColor:'black',
    borderWidth:1
  }
})