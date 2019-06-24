import React, {Component} from 'react';
// import './itemList.css';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from "../errorMessage/errorMessage";
import PropTypes from 'prop-types';
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

class ItemList extends Component {
    renderItems(arr) {  
        return arr.map((item) => {
            // const key = arr[i].name + [arr[i].gender + arr[i].born]+ i;
            // const keys = key.toLowerCase().replace(/\s/g, '');
            // const numbers = [];
            // numbers[i] = arr[i].url.match(/\d+/g).map(Number);
            const shortid = require('shortid');
            const {id} = item;
            const label = this.props.renderItem(item);
    
            return (
              <ListGroup>
                <li 
                    key={shortid.generate()}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
              </ListGroup>
            )
        })
    }
    render() {
        
        const {data} = this.props;
        const items = this.renderItems(data);

        return (
            <ItemListMain>
              <ListGroup>
                {items}
              </ListGroup>
            </ItemListMain>
        );
    }
}

const withData = (View) => {
  return class extends Component {
    state = {
      data: null,
      error: false,
      loaded: true
    }
    static defaultProps = {
      onItemSelected: () => {},
    }
    static propsTypes = {
      onItemSelected: PropTypes.func,
      getData: PropTypes.arrayOf(PropTypes.object)
    }
    componentDidCatch(error, errorInfo) {
      this.setState({
        error: "critical error",
        loaded: false
      })
    }

    componentDidMount() {
      const {getData}  = this.props;
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
        });
    }
    render () {
      const {data, error} = this.state;
        if(error) {
          return <ErrorMessage err={error}/>
        }
        if (!data) {
            return <Spinner/>
        }
      return <View {...this.props} data={data} />
    }
  }
}

export default withData(ItemList);