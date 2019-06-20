import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import { Button } from 'reactstrap';
import ErrorMessage from '../errorMessage/';
import CharacterPage from '../characterPage/';


export default class App extends Component {
    state = {
        showRandomChar: true,
        error: false
    };
    
    componentDidCatch(){
      console.log('error');
      this.setState({
        error: true
      })
    }
    toggleRandomChar = () => {
      this.setState((state) => {
        return {
          showRandomChar: !state.showRandomChar
        }
      });
    };

    
    
    render() {

    const char = this.state.showRandomChar ? <RandomChar/> : null;
    
    if (this.state.error){
      return <ErrorMessage/>
    }
    return (
      <> 
        <Container>
            <Header />
            <Button color="secondary" onClick={this.toggleRandomChar}>Random Character</Button>
        </Container>
        <Container>
            <Row>
              <Col lg={{size: 5, offset: 0}}>
                  {char}  
              </Col>
            </Row>
            <CharacterPage/>
        </Container>
      </>
    )
}
}


