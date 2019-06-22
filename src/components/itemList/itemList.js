import React, {Component} from 'react';
// import './itemList.css';
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
    state = {
        itemList: null
    }

    componentDidMount(){
        const {getData} = this.props;
        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                })
            });
    }

    renderItems(arr) {   
        return arr.map((item) => {
            // const key = arr[i].name + [arr[i].gender + arr[i].born]+ i;
            // const keys = key.toLowerCase().replace(/\s/g, '');
            // const numbers = [];
            // numbers[i] = arr[i].url.match(/\d+/g).map(Number);
            const {id} = item;
            const label = this.props.renderItem(item);
            //console.log("renderItems " + item.id);
            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }
    render() {
        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ListGroup>
                {items}
            </ListGroup>
        );
    }
}