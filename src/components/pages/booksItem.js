import React, {Component} from 'react';
import gotService from '../../services/gotService';
import ItemDetails, { Field } from '../itemDetails';


export default class BooksItem extends Component {
  gotService = new gotService();

  state = {
    selectedItem: 3,
    error: false
  }
  render() {
    return (
      <ItemDetails 
          itemId={this.state.selectedItem}
          getData={this.gotService.getBook}>
              <Field field='name' label='Name' />
              <Field field='numberOfPages' label='Number Of Pages' />
              <Field field='publiser' label='Publiser' />
              <Field field='released' label='Released' />
      </ItemDetails>
    )
  }
}