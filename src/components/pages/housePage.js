import React, {Component} from 'react';

import ItemList from '../itemList';
import ItemDetails,{ Field } from '../itemDetails';
import ErrorMessage from "../errorMessage/errorMessage";
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock/rowBlock';



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

    const houseDetails = (
      <ItemDetails
        itemId={this.state.selectedHouse}
        getData={this.gotService.getHouse}
        title="Please select a house">
        <Field field="region" label="Region"/>
        <Field field="titles" label="Titles"/>
        <Field field="overlord" label="Overlord"/>
        <Field field="ancestralWeapons" label="Weapons"/>
      </ItemDetails>
    );

    return (
      <RowBlock left={itemList} right={houseDetails}/>
    );
  }
}