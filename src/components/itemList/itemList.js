import React, {Component} from 'react';
// import './itemList.css';
import GotService from '../../services/gotService';
import styled from 'styled-components';
import Spinner from '../spinner';
// const shortid = require('shortid');

// console.log(shortid.generate());

const ItemListMain = styled.ul`
    cursor: pointer;
    .li {
        cursor: pointer; 
    }
`;

const ListGroup = styled(ItemListMain)`
    
`;

export default class ItemList extends Component {
    gotService = new GotService();
    state = {
        charList: null
    }

    componentDidMount(){
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
            });
    }

    renderItems(arr) {   
        return arr.map((item, i) => {
            const key = arr[i].name + [arr[i].gender + arr[i].born]+ i;
            const keys = key.toLowerCase().replace(/\s/g, '');
            const numbers = [];
            numbers[i] = arr[i].url.match(/\d+/g).map(Number);
            return (
                <li 
                    key={keys}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(numbers[i])}>
                    {item.name}
                </li>
            )
        })
    }
    render() {
        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItems(charList);

        return (
            <ListGroup>
                {items}
            </ListGroup>
        );
    }
}