import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Counter from './counter.js'

export default class Timer extends React.Component {
    render() {
        var btnName = this.props.countingState ? "PAUSE" : "UNPAUSE"
        return (
            <View>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <Button onPress={this.props.toggleCountingState} title={btnName} />
                    <Button onPress={this.props.resetCounter} title={"Reset"} />
                </View>
                <View style={styles.inputTextView}>
                    <Text style={styles.inputTitle}>Work Time:</Text>
                    <Text>Mins:</Text>
                    <TextInput keyboardType={"number-pad"} onChangeText={newMinutes => this.props.changeWorkTime.minutes(newMinutes)} value={this.props.workTime.minutes.toString()} style={styles.inputText}/>
                    <Text style={{marginLeft: 5}}>Secs:</Text>
                    <TextInput keyboardType={"number-pad"} onChangeText={newSeconds => this.props.changeWorkTime.seconds(newSeconds)} value={this.props.workTime.seconds.toString()} style={styles.inputText}/>
                </View>
                <View style={styles.inputTextView}>
                    <Text style={styles.inputTitle}>Break Time:</Text>
                    <Text>Mins:</Text>
                    <TextInput keyboardType={"number-pad"} onChangeText={newMinutes => this.props.changeBreakTime.minutes(newMinutes)} value={this.props.breakTime.minutes.toString()} style={styles.inputText}/>
                    <Text style={{marginLeft: 5}}>Secs:</Text>
                    <TextInput keyboardType={"number-pad"} onChangeText={newSeconds => this.props.changeBreakTime.seconds(newSeconds)} value={this.props.breakTime.seconds.toString()} style={styles.inputText}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputTitle: {
        marginRight: 10,
        fontWeight: "bold",
    },
    inputText: {
        borderColor: "grey",
        borderWidth: 1 ,
        height: 28,
        width: 35
    },
    inputTextView: {
        flexDirection: "row",
        justifyContent: "center", 
        marginTop: 10
    }
  });