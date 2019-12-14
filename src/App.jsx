import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: '',
      temp: '',
      light: '',
      move: '',
      motorOn: false,
    };
    this.setIp = this.setIp.bind(this);
    this.turnOn = this.turnOn.bind(this);
  }

  setIp(){
    const text = document.getElementById('ip').value;
    this.setState({
      ip: text,
    })
    console.log(this.state.ip);
  }

  componentDidUpdate(){
    axios.get(this.state.ip)
      .then(res => {
        const data = res.data;
        this.setState({
          temp: data.temperature,
          light: data.luminosity,
          move: data.proximity,
        })
      })
  }

  turnOn(){
    this.setState({
      motorOn: !this.state.motorOn,
    })
  }

  render(){
    const {temp, light, move, motorOn} = this.state;
    return (
      <div className="App">
        <input type="text" id="ip" placeholder="Digite o IP da placa" onChange={this.setIp}/>
        <div className="reads-container">
            <label className="text-label">Temperatura : </label>
            <p className="text-box">{temp}</p>
        </div>
        <div className="reads-container">
            <label className="text-label">Luminosidade : </label>
            <p className="text-box">{light}</p>
        </div>
        <div className="reads-container">
            <label className="text-label">Proximidade : </label>
            <p className="text-box">{move}</p>
        </div>

        <button type="submit" className="button-default" onClick={this.turnOn}>
          {motorOn ? 'Desligar ' : 'Ligar '}
          o motor
        </button>
      </div>
    );
  }
}

export default App;
