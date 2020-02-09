import {
  AsyncStorage
} from 'react-native'

export default class MyStorage{
  multiget(keyArray){
    return AsyncStorage.multiGet(keyArray).then((value)=>{
      return value
    })
  }
}