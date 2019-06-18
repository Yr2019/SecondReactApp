import React, {Component} from 'react';
// import './itemList.css';
import styled from 'styled-components';

const ItemListMain = styled.ul`
    cursor: pointer;
    .li {
        cursor: pointer; 
    }
`;

const ListGroup = styled(ItemListMain)`
    
`;

export default class ItemList extends Component {

    render() {
        return (
            <ListGroup>
                <li className="list-group-item">
                    John Snow
                </li>
                <li className="list-group-item">
                    Brandon Stark
                </li>
                <li className="list-group-item">
                    Geremy
                </li>
            </ListGroup>
        );
    }
}