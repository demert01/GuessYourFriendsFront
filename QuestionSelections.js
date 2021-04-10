import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View, Button, Picker, ScrollView
} from 'react-native';


class QuestionsSelections extends React.Component{
	constructor(props){
		super(props);
		this.state={
			PickerValue: this.props.questionSets.length > 0 ? this.props.questionSets[0]._id : "",
			questionSets: this.props.questionSets
		}
		
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.questionSets !== prevProps.questionSets) {
			this.setState({PickerValue: this.props.questionSets.length > 0 ? this.props.questionSets[0]._id : "", questionSets: this.props.questionSets});
		}
	}

  render() {
    return (
      <View style={styles.container}>
        
		<Picker
		style={styles.dropdown}
		selectedValue={this.state.PickerValue}
		onValueChange={(itemValue,itemIndex) => {
			this.props.selectQuestionSet(itemValue);
			this.setState({PickerValue: itemValue});
		}}
		itemStyle={{color: "white", label: 'black', fontSize: 30, fontWeight: '800'}}
		>
			{
				this.state.questionSets.map((item, index) => (
					<Picker.Item key={index} label={item.name} value={item._id}/>
				))
			}
		</Picker>
        
      </View>
    );
  }
}
export default QuestionsSelections

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  dropdown: {
	width: '90%',
	marginBottom: '20%',
	height: 10,
	

	
  }
 
});
