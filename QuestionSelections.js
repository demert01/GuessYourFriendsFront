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
			PickerValue:'',
			questionSets: this.props.questionSets
		}
		
	};
	clickme=()=>{
		var data = this.state.PickerValue;
		if(data==""){
			alert("Option Not Selected!");
		}else{
			alert(data);
		}
		
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.questionSets !== prevProps.questionSets) {
			this.setState({questionSets: this.props.questionSets});
		}
	}

  render() {
    return (
      <View style={styles.container}>
        
		<Picker
		style={{width:'80%'}}
		selectedValue={this.state.PickerValue}
		onValueChange={(itemValue,itemIndex) => this.setState({PickerValue:itemValue})}
		>
			{
				this.state.questionSets.map((item, index) => (
					<Picker.Item label={item.name} value={item._id}/>
				))
			}
		</Picker>
		<Button title="Select" onPress={this.clickme}/>
        
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
 
});
