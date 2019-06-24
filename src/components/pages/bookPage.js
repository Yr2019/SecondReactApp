import React, {Component} from 'react';

import ItemList from '../itemList';
import ItemDetails,{ Field } from '../itemDetails';
import ErrorMessage from "../errorMessage/errorMessage";
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock/rowBlock';



export default class BookPage extends Component {
  gotService = new gotService();
  state = {
    selectedItem: null,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({
      selectedItem: id
    })
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: true
    })
  }

  render() {
    if(this.state.error) {
      return <ErrorMessage err={"critical error"}/>
    }

    const itemList = (
      <ItemList
        getData={this.gotService.getAllHouses}
        onItemSelected={this.onItemSelected}
        renderItem={({name}) => name}/>
    );

    const bookDetails = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={this.gotService.getBook}
        title="Please select a book">
          <Field field='name' label='Name' />
          <Field field='numberOfPages' label='Number Of Pages' />
          <Field field='publiser' label='Publiser' />
          <Field field='released' label='Released' />
      </ItemDetails>
    );

    return (
      <RowBlock left={itemList} right={bookDetails}/>
    );
  }
}