import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import { Button } from 'reactstrap';
import ErrorMessage from '../errorMessage/';
import GotService from '../../services/gotService';
import {CharacterPage, BookPage, HousePage} from '../pages';

import {BrowserRouter as Router, Route} from 'react-router-dom';
export default class App extends Component {
    gotService = new GotService();
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

    const char = this.state.showRandomChar ? <RandomChar interval={4000}/> : null;
    
    if (this.state.error){
      return <ErrorMessage/>
    }
    return (
      <Router>
        <div className="app"> 
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
                <Route path='/' exact component={() => <h1>Welcome to GOT DB</h1>}/>
                <Route path='/characters' component={CharacterPage}/>
                <Route path='/houses' component={HousePage}/>
                <Route path='/books' exact component={BookPage}/>
                {/* <Route path='/book/:id' render={
                  () => <BooksItem/>
                }/> */}
              {/* <Row>
                <Col md='6'>
                    <ItemList 
                      onItemSelected={this.onItemSelected}
                      getData={this.gotService.getAllBooks}
                      renderItem={(item) => (
                      <><span>{item.name}</span>
                      <button>Click Me</button></>)}/>
                </Col>
                <Col md='6'>
                    <CharDetails itemId={this.state.selectedChar}/>
                </Col>
              </Row>
              <Row>
                <Col md='6'>
                    <ItemList 
                      onItemSelected={this.onItemSelected}
                      getData={this.gotService.getAllHouses}
                      renderItem={(item) => item.name}/>
                </Col>
                <Col md='6'>
                    <CharDetails itemId={this.state.selectedChar}/>
                </Col>
              </Row> */}
          </Container>
        </div>
      </Router>
    )
}
}


