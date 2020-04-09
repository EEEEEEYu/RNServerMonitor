import React from 'react'
import {
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  View,
  Dimensions,
  AsyncStorage,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Switch
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default class RegisterPage extends React.Component{

  state={
    UserName:null,
    UserEmail:null,
    UserPassword:null,
    UserConfirmPassword:null,
    UserAuthority:false
  }

  _register=()=>{
    if(this.state.UserName==null){
      Alert.alert('用户名不能为空！')
    }
    else if(this.state.UserEmail==null){
      Alert.alert('用户邮箱不能为空！')
    }
    else if(this.state.UserPassword==null){
      Alert.alert('密码不能为空！')
    }
    else if(this.state.UserConfirmPassword==null){
      Alert.alert('确认密码不能为空！')
    }
    else if(this.state.UserPassword!=this.state.UserConfirmPassword){
      Alert.alert('两次输入的密码不一致！')
    }
    else{
      fetch('http://192.168.1.4:5000/RegisterUser',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          UserName:this.state.UserName,
          UserEmail:this.state.UserEmail,
          UserPassword:this.state.UserPassword,
          UserAuthority:this.state.UserAuthority
        })
      })
      .then((response)=>response.json())
      .then((responseJSON)=>{
        this.setState({
          UserName:null,
          UserEmail:null,
          UserPassword:null,
          UserConfirmPassword:null
        })
        Alert.alert(responseJSON['message'])
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }

  render(){
    return(
      <ImageBackground 
            source={require('./../../assets/BackgroundImages/Register/RegisterBackground.jpg')}
            style={styles.backgroundImage}
      >
        {/*包裹整个输入区域的View*/}
        <SafeAreaView style={styles.allInputOuterlayer}>

          {/*包裹输入邮箱密码区域的View*/}
          <View style={styles.inputOuterlayer}>

            {/*包裹用户名区域的View*/}
            <View style={styles.inputView}>
              <Text style={styles.inputNotification}>用户名</Text>
              <TextInput 
                style={styles.textInput}
                onChangeText={(text)=>{
                  this.setState({
                    UserName:text
                  })
                }}
              />
            </View>

            {/*包裹邮箱区域的View*/}
            <View style={styles.inputView}>
              <Text style={styles.inputNotification}>邮箱</Text>
              <TextInput 
                style={styles.textInput}
                onChangeText={(text)=>{
                  this.setState({
                    UserEmail:text
                  })
                }}
              />
            </View>

            {/*包裹密码区域的View*/}
            <View style={styles.inputView}>
              <Text style={styles.inputNotification}>密码</Text>
              <TextInput 
                style={styles.textInput}
                onChangeText={(text)=>{
                  this.setState({
                    UserPassword:text
                  })
                }}
              />
            </View>
            {/*包裹确认密码区域的View*/}
            <View style={styles.inputView}>
              <Text style={styles.inputNotification}>确认密码</Text>
              <TextInput 
                style={styles.textInput}
                onChangeText={(text)=>{
                  this.setState({
                    UserConfirmPassword:text
                  })
                }}
              />
            </View>

            <View style={styles.switchView}>
              <Switch 
                value={this.state.UserAuthority} 
                onChange={()=>{this.setState({UserAuthority:!this.state.UserAuthority})}}
                style={styles.switch}
                //trackColor={{false:'black',true:'red'}}
              />
              <Text style={styles.switchText}>以管理员身份注册</Text>
            </View>
            
          </View>

          {/*包裹按钮区域的View*/}
          <View style={styles.buttonOuterlayer}>
             {/*包裹返回按钮区域的View*/}
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("LoginPage")}>
                <Text style={styles.buttonText}>返 回</Text>
              </TouchableOpacity>
            </View>

            {/*包裹注册按钮区域的View*/}
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={this._register}>
                <Text style={styles.buttonText}>注 册</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}

const styles=StyleSheet.create({
  backgroundImage:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center'
  },
  inputOuterlayer:{
    flexDirection:'column',
    justifyContent:'center',
    height:250,
    paddingBottom:80
  },
  inputView:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    padding:10
  },
  inputNotification:{
    fontSize:20,
    padding:8,
    color:'white'
  },
  buttonOuterlayer:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  buttonView:{
    borderColor:'white',
    borderWidth:1,
    justifyContent:'center',
    paddingHorizontal:20
  },
  buttonText:{
    fontSize:18,
    color:'white',
    paddingVertical:8,
    paddingHorizontal:20
  },
  textInput:{
    width:300,
    height:35,
    borderColor:'white',
    borderWidth:2,
    borderRadius:10,
    color:'white'
  },
  switchView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  switch:{
    borderColor:'white',
    borderWidth:2
  },
  switchText:{
    fontSize:15,
    color:"white"
  },
  allInputOuterlayer:{
    justifyContent:'center',
    flexDirection:'column',
    height:Dimensions.get('window').height/2
  }

})