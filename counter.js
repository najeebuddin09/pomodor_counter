import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {vibrate} from './utils';

export default class Counter extends React.Component {
    constructor(Props){
        super(Props);
        let interval;
        this.state = {
            seconds: Props.time.seconds,
            minutes: Props.time.minutes,
        };
    }

    componentDidMount() {
        //console.log(this.props.countingState)
        if (this.props.countingState){
            this.interval = setInterval(this.dec,1000)
        }
        //console.log("inside the componentdidmount funciton "+this.interval)
    }

    dec = () => {
        this.setState(prevState => ({seconds: prevState.seconds - 1}),
        () => {
            if (this.state.seconds < 0){
                this.setState(prevState => ({minutes: prevState.minutes - 1}))
                this.setState({seconds: 60})
            }
        })
    }

    componentWillUnmount() {
        //console.log("component is unmounted")
        clearInterval(this.interval)
    }

    shouldComponentUpdate(nextProps, nextState){
        //console.log("seconds: "+nextState.seconds+" minutes: "+nextState.minutes)
        //console.log("inside the shouldcomponentupdate function "+ this.interval)
        //console.log("prop: "+this.props.continueCounting+" Nextprop: "+nextProps.continueCounting)
        if (nextState.minutes === 0 && nextState.seconds < 0){
            //console.log("inside the shouldcomponentupdate function "+ this.interval)
            clearInterval(this.interval)
            //console.log("component did not update")
            vibrate()
            this.props.toggleTimer()
            return false
        }
        if (this.props.continueCounting && !nextProps.continueCounting){    //pause
            clearInterval(this.interval)
        }
        if (!this.props.continueCounting && nextProps.continueCounting){     //unpause
            this.interval = setInterval(this.dec,1000)
        }
        return true
    }

    render() {
        return (
            <View style={{alignItems: "center"}}>
                <Text style={{fontSize:40}}>{this.state.minutes}:{this.state.seconds}</Text>
            </View>
        )
    }
}