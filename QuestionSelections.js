import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,Picker
} from 'react-native';


class QuestionsSelections extends React.Component{
	constructor(){
		super();
		this.state={
			PickerValue:''
			
		}
		
	};
	clickme=()=>{
		var data = this.state.PickerValue;
		if(data==""){
			alert("Option Not Selected!");
		}else{
			alert(data);
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
		<Picker.Item label="Select Question Categories" value=""/>
		<Picker.Item label="Kids" value="Kids" />
		<Picker.Item label="Adults" value="Adults"/>
    <Picker.Item label="Sports" value="Sports"/>
    <Picker.Item label="Animals" value="Animals"/>
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
