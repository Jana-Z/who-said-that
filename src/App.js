import React from 'react';
import { quotes } from './quotes';

class App extends React.Component {

  constructor(props) {
    super(props);
    var random_sample = quotes[parseInt(Math.random() * quotes.length)]
    this.state = { 
      quote: random_sample.quote,
      author: random_sample.author,
      house: random_sample.house,
      result: undefined,
    }
    this.checkHouse = this.checkHouse.bind(this);
    this.getNewQuote = this.getNewQuote.bind(this);
  }

  getNewQuote() {
    this.setState(state => {
      while (true) {
        var random_sample = quotes[parseInt(Math.random() * quotes.length)]
        if (random_sample.quote !== state.quote) {
          return {
            quote: random_sample.quote,
            author: random_sample.author,
            house: random_sample.house,
            result: undefined,
          }
        }
      }
    });
  }

  checkHouse(e) {
    let value = e.currentTarget.value;
    if (value === this.state.house) {
      this.setState({
        result: true,
      })
    }
    else {
      this.setState({
        result: false,
      })
    }
  }

  render() {
    return (
      <>
        <h1>"{this.state.quote}"</h1>
        <button value="Gryffindor" onClick={this.checkHouse}>Gryffindor</button>
        <button value="Slytherin" onClick={this.checkHouse}>Slytherin</button>
        <button value="Ravenclaw" onClick={this.checkHouse}>Ravenclaw</button>
        <button value="Hufflepuff" onClick={this.checkHouse}>Hufflepuff</button>
        {this.state.result === undefined ? <></> : 
          this.state.result ? 
          <p>That was true. This quote was said by {this.state.author}. <button onClick={this.getNewQuote}>Get next quote</button></p> :
          <p>That was wrong :(</p>}
      </>
    )
  }
}

export default App;
