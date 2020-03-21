import * as React from 'react';
import { 
  Button, 
  View,
  Text,
  CheckBox,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer} from '@react-navigation/native'
import NodeManage from './NodeManage/NodeManagePage'
import BindPhone from './BindPhone/BindPhonePage'
import BindMail from './BindMail/BindMailPage'
import ShowCharts from './ShowCharts/ShowCharts'
import { Switch } from 'react-native-gesture-handler';

const Drawer=createDrawerNavigator();


export default class DrawerNavigator extends React.Component{

  state={
    switchon2:false,
    switchon3:false
  }

  
  render(){
    return(
      <NavigationContainer>
        <Drawer.Navigator
           
          initialRouteName='NodeManage'
          drawerContent={(props)=>
          <DrawerContentScrollView {...props}>
            {/*用户名标签*/}
            <DrawerItem label="用户名" labelStyle={styles.labels}/>


            <TouchableOpacity style={styles.mailOuterLayer}>
              <Text style={styles.mailText}>已绑定邮箱:</Text>
              <Text style={styles.mailText}>未绑定</Text>
            </TouchableOpacity>

            <View style={styles.switchOuterLayer}> 
              <Text style={styles.switchText}>邮箱通知</Text>
              <Switch value={this.state.switchon2} onValueChange={()=>{this.setState({switchon2:!this.state.switchon2})}}/>
            </View>

            <View style={styles.switchOuterLayer}>
              <Text style={styles.switchText}>应用通知</Text>
              <Switch value={this.state.switchon3} onValueChange={()=>{this.setState({switchon3:!this.state.switchon3})}}/>
            </View> 

            <TouchableOpacity style={styles.logoutOuterLayer}>
              <Text style={styles.logoutText}>退出登录</Text>
            </TouchableOpacity>
            

          </DrawerContentScrollView> 
          }
        >


          <Drawer.Screen
            name='NodeManage'
            component={NodeManage}
          />
          <Drawer.Screen
            name='BindPhone'
            component={BindPhone}
          />
          <Drawer.Screen
            name='BindMail'
            component={BindMail}
          />
          <Drawer.Screen
            name='ShowCharts'
            component={ShowCharts}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}


const styles=StyleSheet.create({
  labels:{
    fontSize:20
  },
  mailOuterLayer:{
    flexDirection:'row',
    justifyContent:'flex-start'
  },
  mailText:{
    fontSize:20,
    paddingVertical:20,
    paddingLeft:15
  },
  switchText:{
    fontSize:20,
    paddingLeft:15,
    paddingVertical:20
  },
  switchOuterLayer:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  logoutOuterLayer:{
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  logoutText:{
    color:'white',
    fontSize:20,
    paddingVertical:15
  }
})