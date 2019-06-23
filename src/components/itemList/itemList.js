import React, {Component} from 'react';
// import './itemList.css';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from "../errorMessage/errorMessage";
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
        itemList: null,
        error: false,
        loaded: true
    }
    componentDidCatch(error, errorInfo) {
      this.setState({
        error: "critical error",
        loaded: false
      })
    }

    componentDidMount(){
        const {getData} = this.props;
        getData()
            .then((itemList) => {
                this.setState({
                    itemList,
                    loaded: false
                })
            })
            .catch(err => {
              this.setState({
                loaded: false,
                error: "critical error"
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
              <ListGroup>
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
              </ListGroup>
            )
        })
    }
    render() {
        const {itemList, error} = this.state;
        if(error) {
          return <ErrorMessage err={error}/>
        }
        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <ItemListMain>
              <ListGroup>
                {items}
              </ListGroup>
            </ItemListMain>
        );
    }
}