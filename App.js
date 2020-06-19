//Daphne Jonkers Both
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Vibration } from 'react-native';

class PomodoroTimer extends React.Component{
    state={
        myInterval : null,
        minutes: 25, 
        seconds:0,
        worktime: true,
        status: "Work"
    }

    countDown = () => {
      const { seconds, minutes } = this.state
        if (seconds > 0) {
            this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                  if (this.state.worktime) {
                    this.setState({minutes : 5, seconds:0, worktime: false, status: "Relax"})
                    Vibration.vibrate()
                    }
                  else {
                    this.setState({minutes : 25, seconds:0, worktime: true, status: "Work"})
                    Vibration.vibrate()
                    }
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
    }
    startTimer = () => {
        this.setState({myInterval : setInterval(this.countDown,1000)})
    }
    stopTimer = () => {
        clearInterval(this.state.myInterval)
    }

    restartTimer = () => {
      clearInterval(this.intervalId);
      this.setState({minutes : 25, seconds:0, worktime: true})
    }

    render(){
        return(
          <View style={styles.container}>
            <Text style = {styles.banner}>{this.state.status}</Text>
            <Text style = {styles.timer}> {this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}`:this.state.seconds}</Text>
            <View style = {styles.buttons}>
              <Button style={styles.buttons} title="Start" onPress={this.startTimer}>Start</Button>
              <Button style={styles.buttons} title="Pause" onPress={this.stopTimer}>Pause</Button>
              <Button style={styles.buttons} title="Restart" onPress={this.restartTimer}>Reset</Button>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 76,

  },
  buttons: {
    flexDirection: 'row',
  },
  banner:{ 
    fontSize: 50
    },
});


class App extends React.Component{
    render(){
        return <PomodoroTimer/>
    }
}

export default App;



