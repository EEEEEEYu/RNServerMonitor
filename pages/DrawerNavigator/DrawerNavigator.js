import * as React from 'react';
import { 
  Button, 
  View,
  Text,
  CheckBox
} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer} from '@react-navigation/native'
import NodeManage from './NodeManage/NodeManagePage'
import BindPhone from './BindPhone/BindPhonePage'
import BindMail from './BindMail/BindMailPage'
import ShowCharts from './ShowCharts/ShowCharts'
import { Switch } from 'react-native-gesture-handler';

const Drawer=createDrawerNavigator();

function CustomDrawerContent(props){
  return (
    <DrawerContentScrollView {...props}>
            <DrawerItemList {...props}/>
            <Switch value={this.state.switchon} onValueChange={()=>{
              this.setState({
                switchon:!this.state.switchon
              })
            }}/>
  </DrawerContentScrollView> 
  )
}

export default class DrawerNavigator extends React.Component{

  state={
    switchon1:false,
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
            <DrawerItem label="用户名"/>
            <DrawerItem label="已绑定手机:" onPress={()=>props.navigation.navigate("BindPhone")}/>
            <DrawerItem label="已绑定邮箱:" onPress={()=>props.navigation.navigate("BindMail")}/>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
              <Text>通过短信提醒</Text>
              <Switch value={this.state.switchon1} onValueChange={()=>{this.setState({switchon1:!this.state.switchon1})}}/>
            </View>

            <View style={{flexDirection:'row',justifyContent:'center'}}> 
              <Text>通过邮箱提醒</Text>
              <Switch value={this.state.switchon2} onValueChange={()=>{this.setState({switchon2:!this.state.switchon2})}}/>
            </View>

            <View style={{flexDirection:'row',justifyContent:'center'}}>
              <Text>通过应用提醒</Text>
              <Switch value={this.state.switchon3} onValueChange={()=>{this.setState({switchon3:!this.state.switchon3})}}/>
            </View>
            

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
