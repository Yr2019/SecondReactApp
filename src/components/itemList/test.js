import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import styled from 'styled-components';

import gotService from '../../services/gotService';
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

const ItemListWrapper = styled.div`
  li {
    cursor: pointer;
  }
`;

export default class ItemList extends Component {
  gotService = new gotService();
  state = {
    charList: null,
    error: false,
    loaded: true
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: "critical error",
      loaded: false
    })
  }

  componentDidMount() {
    this.gotService.getAllCharacters()
      .then((charList) => {
        this.setState({
          charList,
          loaded: false
        })
      })
      .catch(err => {
        this.setState({
          loaded: false,
          error: "critical error"
        })
      })
  }

  renderItems = (arr) => {
    return arr.map((item) => {
      return (
        <ListGroupItem
          key={item.id}
          onClick={() => {this.props.onItemSelected(item.id)}}>
          {item.name}
        </ListGroupItem>
      )
    })
  }

  render() {
    const {charList, error} = this.state;

    if(error) {
      return <ErrorMessage err={error}/>
    }
    if(!charList) {
      return <Spinner />
    }

    const items = this.renderItems(charList);
    return (
      <ItemListWrapper>
        <ListGroup className="item-list list-group">
          {items}
        </ListGroup>
      </ItemListWrapper>
    );
}
}