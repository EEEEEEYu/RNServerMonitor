import React from 'react'
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Dimensions
} from 'react-native'
import {AreaChart,Grid} from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class MyItem extends React.Component{
	render(){
		return(
			<TouchableOpacity style={styles.memoryItemView}>
				<View style={styles.memoryItemTextView}>
					<Text style={styles.memoryItemText}>{this.props.notificationText}</Text>
				</View>
				<View style={styles.memoryItemNumberView}>
					<Text style={styles.memoryItemNumber}>{this.props.numberText}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

export default class MemoryPage extends React.Component{

	state={
		data:[23,45,53,34,86,54,67,43,87,45,67,24,65]
	}

	render(){
		return(
			<View style={styles.layerView}>
				<Text>memory page</Text>
				<AreaChart
          style={{ flex:40 }}
          data={ this.state.data }
          contentInset={{ top: 30,bottom:30 }}
          curve={ shape.curveNatural }
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
        />

				{/*刻度尺 */}
        <View style={styles.rulerView}>
          <Text style={styles.rulerText}>60s</Text>
          <Text style={styles.rulerText}>50s</Text>
          <Text style={styles.rulerText}>40s</Text>
          <Text style={styles.rulerText}>30s</Text>
          <Text style={styles.rulerText}>20s</Text>
          <Text style={styles.rulerText}>10s</Text>
          <Text style={styles.rulerText}>0s</Text>
        </View>

				

				<View style={styles.memoryContentView}>

					<View style={styles.memoryLineView}>

						<TouchableOpacity style={styles.memoryItemView}>
							<Text>这里放入内存图标</Text>
						</TouchableOpacity>

						<MyItem notificationText='内存使用量' numberText='21.2%'/>

					</View>

					<View style={styles.memoryLineView}>
						
						<MyItem notificationText='交换使用量' numberText='21.2%'/>

						<MyItem notificationText='cache使用量' numberText='21.2%'/>

					</View>

				</View>
			</View>
		)
	}
}

const windowHeight=Dimensions.get('window').height
const windowWidth=Dimensions.get('window').width

const styles=StyleSheet.create({
	layerView:{
		flexDirection:'column',
		justifyContent:'flex-start',
		flex:1
	},
	//刻度尺view
	rulerView:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		backgroundColor:'rgba(134, 65, 244, 0.8)'
	},
	rulerText:{
		color:'white'
	},
	memoryContentView:{
		flex:50,
		flexDirection:'column',
		justifyContent:'flex-start',
		backgroundColor:'rgba(134, 65, 244, 0.8)'
	},
	memoryLineView:{
		flexDirection:'row',
		justifyContent:'center',
		height:windowHeight*0.12,
	},
	memoryItemView:{
		flex:1,
		flexDirection:'row',
		justifyContent:'flex-start',
		alignItems:'center',
		borderRadius:20,
		borderWidth:2,
		borderColor:'white',
		marginHorizontal:5,
		marginVertical:5
	},
	memoryItemTextView:{

	},
	memoryItemText:{

	},
	memoryItemNumberView:{

	},
	memoryItemNumber:{

	}
})