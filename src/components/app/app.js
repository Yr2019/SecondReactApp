import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import { Button } from 'reactstrap';

export default class App extends Component {
    constructor(props) {
        super();
        this.state = {
            showMe: false,
        }
    }
    
    operation(){
      this.setState({
        showMe: !this.state.showMe
      })
    }
    
    render() {
    return (
        <> 
            <Container>
                <Header />
            </Container>
            <Container>
                <Row>
                    <Col lg={{size: 5, offset: 0}}>
                        {this.state.showMe ? <RandomChar/> :null}
                        <Button color="secondary" onClick={()=>this.operation()}>Random Character</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <ItemList />
                    </Col>
                    <Col md='6'>
                        <CharDetails />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
}


