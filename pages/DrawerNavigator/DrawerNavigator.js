import * as React from 'react';
import { 
  Button, 
  View,
  Text,
  CheckBox
} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import NodeManage from './NodeManage/NodeManagePage'
import BindPhone from './BindPhone/BindPhonePage'
import BindMail from './BindMail/BindMailPage'
import ShowCharts from './ShowCharts/ShowCharts'
import { Switch } from 'react-native-gesture-handler';


const Drawer = createDrawerNavigator({
  NodeManage:{
    screen:NodeManage
  },
  BindMail:{
    screen:BindMail
  },
  BindPhone:{
    screen:BindPhone
  },
  ShowCharts:{
    screen:ShowCharts
  }
},{
  initialRouteName:'NodeManage',
  contentComponent:(props)=>(
    <View>
      <Text>用户名</Text>
      <Button title="手机" onPress={()=>{props.navigation.navigate("BindPhone")}}></Button>
      <Button title="邮箱" onPress={()=>{props.navigation.navigate("BindMail")}}></Button>
      <Switch onValueChange/>
    </View>
  )
  
});

export default DrawerNavi=createAppContainer(Drawer)