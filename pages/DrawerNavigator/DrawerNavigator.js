import * as React from 'react';
import { 
  Button, 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Switch,
  TextInput,
  Modal,
  Alert
} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem,DrawerContent } from '@react-navigation/drawer';
import { NavigationContainer} from '@react-navigation/native'
import NodeManage from './NodeManage/NodeManagePage'
import BindMail from './BindMail/BindMailPage'
import ShowCharts from './ShowCharts/ShowCharts'
import ConfigureNodes from './ConfigureNodes/ConfigureNodesPage'
import ConfigureUser from './ConfigureUser/ConfigureUserPage'

const Drawer=createDrawerNavigator();

/*
需要双端保存的应用：用户是否通过邮箱提醒、用户通知邮箱、用户名
只在服务器保存的数据：
只在本地保存的数据：用户是否通过应用提醒
*/
export default class DrawerNavigator extends React.Component{

  state={
    emailSwitchOpen:false,
    appSwitchOpen:false
  }

  configuration=new Map();
  

  //组件加载完成后，获取路由参数和本地存储的<通过APP通知>，将其赋值给state
  componentDidMount(){
    //获取本地存储的<通过APP通知>设置。该设置是唯一仅在本地保存的设置
    global.storage.load({key:'appSwitchState'})
    .then(ret=>{this.setState({appSwitchOpen:ret.open})})
    //如果没有获取到本地存储的<通过APP通知>，将其默认设置为false
    .catch(err=>{this.setState({appSwitchOpen:false})})

    //加载在登录成功后本地保存的用户其他设置
    global.storage.load({key:'loginConfiguration'})
    .then(ret=>{
      console.log(ret)
      this.configuration.set('UserName',ret.UserName)
      this.configuration.set('UserLastLoginTime',ret.UserLastLoginTime)
      this.configuration.set('Authority',ret.Authority)
      this.configuration.set('BindEmail',ret.BindEmail)
      if(ret.NoticeByEmail) this.setState({emailSwitchOpen:true})
      this.configuration.set('Nodes',ret.Nodes)
    })
    //如果没有获取到本地存储的用户设置则返回
    .catch(err=>{
      Alert.alert('获取用户设置失败！返回登录界面')
      this.props.navigation.goBack()
    })


  }

  render(){
    return(
      <NavigationContainer>
        <Drawer.Navigator
           
          initialRouteName='NodeManage'
          drawerContent={(props)=>
          <DrawerContentScrollView {...props}>

            {/*用户名标签*/}
            <View style={styles.drawerLayer}>
              
              <View style={styles.usernameView}>
                <Text style={styles.usernameText}>{this.configuration.get('Authority')?'管理员:':'用户:'}</Text><Text style={styles.usernameText}>{this.configuration.get('UserName')}</Text>
              </View>

              <TouchableOpacity style={styles.mailView} onPress={()=>{props.navigation.jumpTo('BindMail')}}>
                <Text style={styles.mailText}>通知邮箱:</Text>
                <Text style={styles.mailText}>{this.configuration.get('BindEmail')}</Text>
              </TouchableOpacity>

              <View style={styles.notificationView}> 
                <Text style={styles.notificationText}>邮箱通知</Text>
                <Switch 
                  value={this.state.emailSwitchOpen} 
                  onValueChange={()=>{
                    //每次改变开关状态时，同时在本地保存，但是邮件通知还需要网络通信
                    fetch('http://192.168.1.4:5000/UserConfigure',{
                      method:'POST',
                      headers:{
                        Accept:'application/json',
                        'Content-Type':'application/json'
                      },
                      body:JSON.stringify({
                        UserEmail:global.UserEmail,
                        NoticeByEmail:this.state.emailSwitchOpen
                      })
                    })
                    .then((response)=>response.json())
                    .then((responseJSON)=>{
                      if(responseJSON['status']){
                        this.setState({emailSwitchOpen:!this.state.emailSwitchOpen})
                        global.storage.save({
                          key:'emailSwitchState',
                          data:{open:this.state.emailSwitchOpen}
                        })
                      }
                      else{
                        Alert.alert('更新设置失败！请检查网络')
                      }
                    })
                    .catch((error)=>{Alert.alert(error)})
                  }} 
                  style={{marginLeft:windowWidth*0.15}}
                />
              </View>

              <View style={styles.notificationView}>
                <Text style={styles.notificationText}>应用通知</Text>
                <Switch 
                  value={this.state.appSwitchOpen} 
                  onValueChange={()=>{
                    //每次改变开关状态时，同时在本地保存
                    this.setState({appSwitchOpen:!this.state.appSwitchOpen})
                    global.storage.save({
                      key:'appSwitchState',
                      data:{open:this.state.appSwitchOpen}
                    })
                  }} 
                  style={{marginLeft:windowWidth*0.15}}
                />
              </View> 

              <TouchableOpacity style={styles.mailView} onPress={()=>{props.navigation.jumpTo('ConfigureNodes')}}>
                <Text style={styles.mailText}>配置节点</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.mailView} onPress={()=>{props.navigation.jumpTo('ConfigureUser')}}>
                <Text style={styles.mailText}>管理用户</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.logoutView} onPress={()=>{props.navigation.goBack()}}>
                <Text style={styles.logoutText}>退出登录</Text>
              </TouchableOpacity>

            </View>

          </DrawerContentScrollView>}
          
        >

          <Drawer.Screen
            name='NodeManage'
            component={NodeManage}
          />
          <Drawer.Screen
            name='BindMail'
            component={BindMail}
          />
          <Drawer.Screen
            name='ShowCharts'
            component={ShowCharts}
          />
          <Drawer.Screen
            name='ConfigureNodes'
            component={ConfigureNodes}
          />
          <Drawer.Screen
            name='ConfigureUser'
            component={ConfigureUser}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}

const windowWidth=Dimensions.get('window').width
const windowHeight=Dimensions.get('window').height


const styles=StyleSheet.create({
  drawerLayer:{
    flexDirection:'column',
    justifyContent:'flex-start',
    flex:1
  },
  usernameView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:windowHeight*0.1
  },
  usernameText:{
    fontSize:windowWidth*0.08
  },
  mailView:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    height:windowHeight*0.08,
    marginLeft:windowWidth*0.05
  },
  mailText:{
    fontSize:windowWidth*0.05
  },
  notificationView:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    height:windowHeight*0.08,
    marginLeft:windowWidth*0.05
  },
  notificationText:{
    fontSize:windowWidth*0.05
  },
  logoutView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'red',
    marginTop:windowHeight*0.66-windowWidth*0.119,
    flex:1
  },
  logoutText:{
    fontSize:windowWidth*0.08,
    color:'white'
  }
})