import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: '节点组1',
    content: '节点1'
  },
  {
    title: '节点组2',
    content: 'Lorem ipsum...34'
  },
  {
    title:"节点组3",
    content:"empty1"
  },
  {
    title:"节点组4",
    content:"empty2"
  }
];

export default class AccordionView extends Component {
  state = {
    activeSections: [],
  };

  /*_renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };*/

  _renderHeader = section => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  _renderContent = section => {
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <View>
        <View style={styles.picture}>
          <Text>在这里插入图片</Text>
        </View>
        <Accordion
          sections={SECTIONS}
          activeSections={this.state.activeSections}
          //renderSectionTitle={this._renderSectionTitle}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          onChange={this._updateSections}
        />
      </View>
    );
  }
}

const styles=StyleSheet.create({
  picture:{
    width:Dimensions.get('window').width,
    height:300,
    justifyContent:'center',
    alignItems:'center'
  },
  header:{
    width:Dimensions.get('window').width,
    height:40,
    backgroundColor:'gray'
  },
  headerText:{
    fontSize:15
  },
  content:{
    backgroundColor:"red",
    height:30
  }
})