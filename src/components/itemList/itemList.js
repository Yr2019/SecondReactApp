import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import styled from 'styled-components';

import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import PropTypes from "prop-types";

const ItemListWrapper = styled.div`
  margin-bottom: 30px;
  li {
    cursor: pointer;
  }
`;

class ItemList extends Component {
  renderItems = (arr) => {
    return arr.map((item) => {
      const {id} = item;
      const label = this.props.renderItem(item);
      return (
        <ListGroupItem
          key={id}
          onClick={() => {
            this.props.onItemSelected(id)
          }}>
          {label}
        </ListGroupItem>
      )
    })
  }

  render() {
    const {data} = this.props;

    const items = this.renderItems(data);
    return (
      <ItemListWrapper>
        <ListGroup className="item-list list-group">
          {items}
        </ListGroup>
      </ItemListWrapper>
    );
  }
}

const whithData = (View) => {
  return class extends Component {
    state = {
      data: null,
      error: false,
      loaded: true
    }

    static defaultProps = {
      onItemSelected: () => {
      }
    }

    static propTypes = {
      onItemSelected: PropTypes.func
    }

    componentDidCatch(error, errorInfo) {
      this.setState({
        error: "critical error",
        loaded: false
      })
    }

    componentDidMount() {
      const {getData} = this.props;

      getData()
        .then((data) => {
          this.setState({
            data,
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

    render() {
      const {data, error} = this.state;

      if (error) {
        return <ErrorMessage err={error}/>
      }
      if (!data) {
        return <Spinner/>
      }
      return (
        <View {...this.props} data={data}/>
      )
    }
  }
}

export default whithData(ItemList);