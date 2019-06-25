import React, {Component} from 'react';

import ItemList from '../itemList';
//import ItemDetails,{ Field } from '../itemDetails';
import ErrorMessage from "../errorMessage/errorMessage";
import gotService from '../../services/gotService';
//import RowBlock from '../rowBlock/rowBlock';
import {withRouter} from 'react-router-dom';


class BookPage extends Component {
  gotService = new gotService();
  state = {
    //selectedItem: null,
    error: false
  }

  // onItemSelected = (id) => {
  //   this.setState({
  //     selectedItem: id
  //   })
  // }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: true
    })
  }

  render() {
    if(this.state.error) {
      return <ErrorMessage err={"critical error"}/>
    }

    // const itemList = (
      
    // );

    // const bookDetails = (
    //   <ItemDetails
    //     itemId={this.state.selectedItem}
    //     getData={this.gotService.getBook}
    //     title="Please select a book">
    //       <Field field='name' label='Name' />
    //       <Field field='numberOfPages' label='Number Of Pages' />
    //       <Field field='publiser' label='Publiser' />
    //       <Field field='released' label='Released' />
    //   </ItemDetails>
    // );

    return (
      // <RowBlock left={itemList} right={bookDetails}/>
      <ItemList
        getData={this.gotService.getAllBooks}
        onItemSelected={ (itemId) => {
          // this.props.history.push(`/books/${itemId}`)
          this.props.history.push(itemId);
        }}
        renderItem={({name}) => name}/>
    );
  }
}

export default withRouter(BookPage);