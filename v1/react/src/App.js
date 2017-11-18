import React, { Component } from 'react';
import './App.css';
import Header from './containers/Header';
import Body from './containers/Body';
import {Container} from 'reactstrap';
import jquery from 'jquery';
class App extends Component {
    state = {
        data: []
    };
    componentDidMount = () => {
        this.serverRequest = jquery.get('./skillboard.json', function(result) {
            this.setState({
                data: result["data"]
            }); //setState
        }.bind(this));
    }; //componentDidMount
  render() {
    return (
        <Container fluid>
          <Header phone="(+84)0984 462 007" email="chuhailong89@gmail.com" />
            {this.state.data.length > 0 ? <Body data={this.state.data}/> : ''}
      </Container>
    );
  }
}

export default App;
