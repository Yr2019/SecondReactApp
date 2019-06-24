import React, { Component } from 'react';
import ItemList from '../itemList';
import CharDetails, { Field } from '../charDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';
export default class HousePage extends Component {
  gotService = new gotService();

  state = {
    selectedHouse: null,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({
      selectedHouse: id
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
        getData={this.gotService.getAllHouses}
        renderItem={({ name, region }) => `${name} (${region})`} />
    )

    const charDetails = (
      <CharDetails 
      itemId={this.state.selectedHouse}
      getData={this.gotService.getHouse}>
        <Field field='name' label='Name' />
        <Field field='region' label='Region' />
        <Field field='words' label='Words' />
        <Field field='titles' label='Titles' />
        <Field field='overlord' label='Overlord' />
        <Field field='ancestralWeapos' label='Ancestral Weapos' />
      </CharDetails>
    )

    return (
      <RowBlock left={itemList} right={charDetails} />
    )
  }
}