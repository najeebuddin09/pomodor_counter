import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Counter from './counter.js'
import Inputs from './inputs.js'
import { string, number } from 'prop-types';

console.disableYellowBox = true;    // ignoring the warning for deprecated componentWillmount function

export default class Timer extends React.Component {
    constructor(){
        //console.log("----------App started!-----------")
        super();
        this.state = {
            hasError: false,
            countingState: true,
            timerToShow: true,                 // true - break timer , false - work timer
            workTimerTitle: "Work Timer",
            breakTimerTitle: "Break Timer",
            workTimer: {
                seconds: 0,
                minutes: 25,
            },
            breakTimer: {
                seconds: 0,
                minutes: 5,
            },
        };
        let key = 123;
        //console.log("key inside the constructor: "+key)
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentWillMount(){
        /*
            this function is deprecated and gives warning but i set key to certain value
            inside this function because otherwise the local variables of the constructor
            are undefined inside the render method and the key should be a part of the state but inorder to put key to state i have to change a lot of code so i am leaving it here for now.
        */
        this.key = 123  
        //console.log("value of key inside componentDidMount function: "+ this.key)
    }

    toggleTimer = () => {
        //console.log("In timer toggle function: "+this.key)
        this.key = Math.floor(Math.random()*1000)
        this.setState(prevState => ({timerToShow: !prevState.timerToShow}))
    }

    toggleCountingState = () => {
        //console.log("Key inside counting state toggle function: "+this.key)
        this.setState(prevState => ({countingState: !prevState.countingState}))
    }

    resetCounter = () => {
        //console.log("reset button pressed")
        this.key = Math.floor(Math.random()*1000)
        
        this.setState({
            countingState: true         //to force the component to render with new instance
        })
    }

    
    changeWorkTimeSeconds = (newSeconds) => {
        newSeconds = parseInt(newSeconds,10)
        if (isNaN(newSeconds)) {newSeconds = ""}
        //console.log(this.state.timerToShow)
        if (this.state.timerToShow) {
            this.key = Math.floor(Math.random()*1000)
            //console.log("key changed")
        } 
        this.setState({workTimer: {seconds: newSeconds, minutes: this.state.workTimer.minutes}})
    }

    changeWorkTimeMinutes = (newMinutes) => {
        newMinutes = parseInt(newMinutes,10)
        if (isNaN(newMinutes)) {newMinutes = ""}
        //console.log(this.state.timerToShow)
        if (this.state.timerToShow) {
            this.key = Math.floor(Math.random()*1000)
            //console.log("key changed")
        } 
        this.setState({workTimer: {seconds: this.state.workTimer.seconds, minutes: newMinutes}})
    }

    changeBreakTimeSeconds = (newSeconds) => {
        newSeconds = parseInt(newSeconds,10)
        if (isNaN(newSeconds)) {newSeconds = ""}
        console.log(this.state.timerToShow)
        if (!this.state.timerToShow) {
            this.key = Math.floor(Math.random()*1000)       // to create new instance of timer
            //console.log("key changed")
        } 
        this.setState({breakTimer: {seconds: newSeconds, minutes: this.state.breakTimer.minutes}})
    }

    changeBreakTimeMinutes = (newMinutes) => {
        newMinutes = parseInt(newMinutes,10)
        if (isNaN(newMinutes)) {newMinutes = ""}
        //console.log(this.state.timerToShow)
        if (!this.state.timerToShow) {
            this.key = Math.floor(Math.random()*1000)
            //console.log("key changed")
        } 
        this.setState({breakTimer: {seconds: this.state.breakTimer.seconds, minutes: newMinutes}})
    }

    render() {
        let mode = this.state.timerToShow ? this.state.workTimer : this.state.breakTimer
        let title = this.state.timerToShow ? this.state.workTimerTitle : this.state.breakTimerTitle
        //console.log("key inside render function: "+this.key)
        if (!this.state.hasError){
            return (
                <View>
                    <Text style={{fontSize:40}}>
                        {title}
                    </Text>
                    <View>
                        <Counter countingState={this.state.countingState} continueCounting={this.state.countingState} time={{seconds: mode.seconds, minutes: mode.minutes}} toggleTimer={this.toggleTimer} key={this.key}/>
                    </View>
                    <View>
                        <Inputs countingState={this.state.countingState} resetCounter={this.resetCounter} toggleCountingState={this.toggleCountingState}  changeWorkTime={{seconds: this.changeWorkTimeSeconds, minutes: this.changeWorkTimeMinutes}} changeBreakTime={{seconds: this.changeBreakTimeSeconds, minutes: this.changeBreakTimeMinutes}} workTime={this.state.workTimer} breakTime={this.state.breakTimer}/>
                    </View>
                </View>
            )
        }else{
            return(
                <View>
                    <Text>Error!</Text>
                </View>
            )
        }
    }
}