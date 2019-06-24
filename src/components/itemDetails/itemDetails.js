import React, {Component} from 'react';
import styled from 'styled-components';
import {ListGroup} from 'reactstrap';

import gotService from '../../services/gotService';
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";


const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};

const ItemDetailsWrapper = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

const SelectedError = styled.span`
  color: #000;
  text-align: center;
  font-size: 26px;
`;

export default class ItemDetails extends Component {
  gotService = new gotService();
  state = {
    item: null,
    loaded: false,
    error: false
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: "critical error",
      loaded: false
    })
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({
        loaded: true
      });
      this.updateItem();
    }
  }

  updateItem = () => {
    const {itemId, getData} = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          loaded: false
        })
      })
      .catch((err) => {
        this.setState({
          error: err,
          loaded: false
        })
      });
    // this.foo.bar = 0;
  }

  render() {
    const {loaded, item, error} = this.state;

    const selectedError = !(item || error) ? <SelectedError>{this.props.title}</SelectedError> : null;
    const spinner = loaded ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage err={error}/> : null;
    const content = !(loaded || error) && item ? (
      <>
        <h4>{item.name}</h4>
        <ListGroup className="list-group-flush">
          {
            React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, {item})
            })
          }
        </ListGroup>
      </>
    ) : null;

    return (
      <ItemDetailsWrapper className="rounded">
        {selectedError}
        {errorMessage}
        {spinner}
        {content}
      </ItemDetailsWrapper>
    )
  }
}