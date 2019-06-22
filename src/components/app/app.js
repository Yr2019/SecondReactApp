import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import { Button } from 'reactstrap';
import ErrorMessage from '../errorMessage/';
import CharacterPage from '../pages/characterPage';
import GotService from '../../services/gotService';
import BookPage from '../pages/bookPage';
import HousePage from '../pages/housePage';
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
              <BookPage/>
              <HousePage/>
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
                  <CharDetails charId={this.state.selectedChar}/>
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
                  <CharDetails charId={this.state.selectedChar}/>
              </Col>
            </Row> */}
        </Container>
      </>
    )
}
}


