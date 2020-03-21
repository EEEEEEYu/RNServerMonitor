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
  TouchableOpacity
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'



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
      fetch('http://192.168.1.4:5000/Login',{
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
          Alert.alert('用户名或密码错误！')
        }
        //登录成功，保存配置并且跳转到管理界面
        else{
          //保存本地配置,如果usernode为空则不会被存储，需要在取node时加if判断
          global.storage.save({
            key:'loginConfiguration',
            data:{
              Authority:responseJSON['Authority'],
              BindEmail:responseJSON['BindEmail'],
              NoticeByEmail:responseJSON['NoticeByEmail'],
              UserNode:responseJSON['Nodes']
            }
          })
          .then(()=>{this.props.navigation.navigate('DrawerNavigator')})
        }
      })
      .catch((error)=>{
        Alert.alert(error)
      })
    }
  }

  //首先验证输入是否正确
  _testlogin=()=>{
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
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("RegisterPage")}>
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
    borderRadius:10
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