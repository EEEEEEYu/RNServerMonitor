import React from 'react'
import {
  SafeAreaView,
  Text,
  Button,
  AsyncStorage,
  StyleSheet,
  View,
  Dimensions,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

/*登录页面中，用户的邮箱和密码双端存储*/

export default class LoginPage extends React.Component{

  state={
    UserEmail:null,
    UserPassword:null
  }

  //首先验证输入是否正确
  _login=()=>{
    if(this.state.UserEmail==null){
      Alert.alert('邮箱不能为空！')
    }
    else if(this.state.UserPassword==null){
      Alert.alert('密码不能为空！')
    }
    else{
      fetch(global.ServerIPandPort+'/Login',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          UserEmail:this.state.UserEmail,
          UserPassword:this.state.UserPassword
        })
      })
      //将响应转化为json
      .then((response)=>response.json())
      //对响应json进行处理
      .then((responseJSON)=>{
        //登陆失败
        if(responseJSON['status']==false){
          Alert.alert(responseJSON['message'])
        }
        //登录成功，保存配置并且跳转到管理界面
        else{
          //保存全局用户邮箱名，以供以后的操作使用
          global.UserEmail=this.state.UserEmail
          global.storage.save({
            key:'nodes',
            data:responseJSON['nodes']
          })
          //保存本地配置,如果usernode为空则不会被存储，需要在取node时加if判断
          global.storage.save({
            key:'loginConfiguration',
            data:{
              UserName:responseJSON['config']['UserName'],
              UserLastLoginTime:responseJSON['config']['UserLastLoginTime'],
              Authority:responseJSON['config']['Authority'],
              BindEmail:responseJSON['config']['UserBindEmail'],
              NoticeByEmail:responseJSON['config']['NoticeByEmail']
            }
          })
          .then(()=>{
            this.setState({UserEmail:null,UserPassword:null})
            this.props.navigation.navigate('DrawerNavigator')
          })
        }
      })
      .catch((error)=>{
        Alert.alert(error)
      })
    }
  }

  //首先验证输入是否正确
  _testlogin=()=>{
    global.UserEmail='468085999@qq.com'
    this.props.navigation.navigate('DrawerNavigator')
  }


  render(){
    return(
      <ImageBackground 
            source={require('./../../assets/BackgroundImages/Login/LoggingBackground.jpg')}
            style={styles.backgroundImage}
      >
        {/*包裹整个输入区域的View*/}
        <SafeAreaView style={styles.allInputOuterlayer}>
          <View style={styles.logoView}>
            <Image source={require('../../assets/Logo/LabLogo.png')} style={styles.logoImage}/>
          </View>

          {/*包裹输入邮箱密码区域的View*/}
          <View style={styles.inputOuterlayer}>

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
            
          </View>

          {/*包裹按钮区域的View*/}
          <View style={styles.buttonOuterlayer}>
             {/*包裹登录按钮区域的View*/}
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={()=>{
                this.setState({UserEmail:null,UserPassword:null})
                this.props.navigation.navigate("RegisterPage")
              }}>
                <Text style={styles.buttonText}>注 册</Text>
              </TouchableOpacity>
            </View>

            {/*包裹注册按钮区域的View*/}
            <View style={styles.buttonView}>
              <TouchableOpacity onPress={this._testlogin}>
                <Text style={styles.buttonText}>登 录</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
  }
}

const styles=StyleSheet.create({
  logoView:{
    flexDirection:'row',
    justifyContent:'center',
    paddingVertical:20
  },
  logoImage:{
    width:Dimensions.get('window').width/3,
    height:Dimensions.get('window').width/3*0.7
  },
  inputOuterlayer:{
    flexDirection:'column',
    justifyContent:'center',
    height:220,
    paddingBottom:50
  },
  inputView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    padding:20
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
  allInputOuterlayer:{
    justifyContent:'center',
    flexDirection:'column',
    height:Dimensions.get('window').height/2
  },
  backgroundImage:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center'
  }

})