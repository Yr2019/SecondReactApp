import React, { Component } from 'react';
import ItemList from '../../itemList';
import CharDetails, { Field } from '../../charDetails';
import ErrorMessage from '../../errorMessage';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class BookPage extends Component {
  gotService = new gotService();

  state = {
    selectedItem: 11,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({
      selectedItem: id
    })
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}
        renderItem={({ name, numberOfPages }) => `${name} (${numberOfPages})`} />
    )

    const charDetails = (
      <CharDetails charId={this.state.selectedItem}>
        <Field field='name' label='Name' />
        <Field field='numberOfPages' label='Number Of Pages' />
        <Field field='publiser' label='Publiser' />
        <Field field='released' label='Released' />
      </CharDetails>
    )

    return (
      <RowBlock left={itemList} right={charDetails} />
    )
  }
}