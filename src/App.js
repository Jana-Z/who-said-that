import React from 'react';
import slytherin from './img/icons/slytherin.svg';
import gryffindor from './img/icons/gryffindor.svg';
import ravenclaw from './img/icons/ravenclaw.svg';
import hufflepuff from './img/icons/hufflepuff.svg';
import happy from './img/icons/happy.svg';
import sad from './img/icons/sad.svg';
import background from './img/map2.jpg';
import { quotes } from './quotes';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function QuizFeedback(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{
        width: '40%',
        marginLeft: '30%',
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{width: '100%', textAlign: 'center'}}
        >
          {props.result ?
          <>That was true.</>
          :<>That was wrong :(</>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{width: '100%', textAlign: 'center'}}>
        {props.result ?
          <>
            <img width="100" height="100" src={happy} alt="" style={{ marginBottom: '1em' }}/>
            <h4>This quote was said by {props.author}.</h4>
            <Button variant="outline-dark" onClick={props.getNewQuote}>Get next quote</Button>
          </>
        :
          <img width="100" height="100" src={sad} alt="" />
        }
      </Modal.Body>
    </Modal>
  );
}


class App extends React.Component {

  constructor(props) {
    super(props);
    var random_sample = quotes[parseInt(Math.random() * quotes.length)]
    this.state = { 
      quote: random_sample.quote,
      author: random_sample.author,
      house: random_sample.house,
      result: undefined,
      show_quizFeedback: false,
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
            show_quizFeedback: false,
            quote: random_sample.quote,
            author: random_sample.author,
            house: random_sample.house,
            result: undefined,
          }
        }
      }
    });
  }

  checkHouse(house) {
    if (house === this.state.house) {
      this.setState({
        result: true,
        show_quizFeedback: true,
      })
    }
    else {
      this.setState({
        result: false,
        show_quizFeedback: true,
      })
    }
  }

  render() {
    const button_style = {
      marginRight: '1em',
      cursor: 'pointer'
    }
    return (
      <div style={{
          width: '100%',
          height: '100%',
          background: `url(${background}) no-repeat center center fixed`,
          WebkitBackgroundSize: 'cover',
          MozBackgroundSize: 'cover',
          OBackgroundSize: 'cover',
          backgroundSize: 'cover',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'}}>
        <div style={{
            backgroundColor: '#ffeecc',
            border: '3px solid black',
            width: '50%',
            // height: '10em',
            padding: '2em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center'}}>
          <h1>"{this.state.quote}"</h1>
          <div style={{display:'flex'}}>
            <div style={button_style} onClick={() => this.checkHouse("Gryffindor")}>
              <img width="50" height="70" src={gryffindor} alt="Gryffindor" />
            </div>
            <div style={button_style} onClick={() => this.checkHouse("Slytherin")}>
              <img width="50" height="70" src={slytherin} alt="Slytherin" />
            </div>
            <div style={button_style} onClick={() => this.checkHouse("Ravenclaw")}>
              <img width="50" height="70" src={ravenclaw} alt="Ravenclaw" />
            </div>            
            <div style={button_style} onClick={() => this.checkHouse("Hufflepuff")}>
              <img width="50" height="70" src={hufflepuff} alt="Hufflepuff" />
            </div>          
          </div>

          <QuizFeedback
              show={this.state.show_quizFeedback}
              onHide={() => this.setState({show_quizFeedback: false})}
              result={this.state.result}
              getNewQuote={() => this.getNewQuote()}
              author={this.state.author}
          />
        </div>
      </div>
    )
  }
}

export default App;
