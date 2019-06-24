import React, {Component} from 'react';

import ItemList from '../itemList';
import ItemDetails from '../itemDetails';
import ErrorMessage from "../errorMessage/errorMessage";
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock/rowBlock';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export default class CharacterPage extends Component {
  gotService = new gotService();
  state = {
    selectedChar: null,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({
      selectedChar: id
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
        getData={this.gotService.getAllCharacters}
        onItemSelected={this.onItemSelected}
        renderItem={({name, gender}) => `${name} (${gender})`}/>
    );

    const charDetails = (
      <ItemDetails
        itemId={this.state.selectedChar}
        getData={this.gotService.getCharacter}
        title="Please select a character">
        <Field field="gender" label="Gender"/>
        <Field field="born" label="Born"/>
        <Field field="died" label="Died"/>
        <Field field="culture" label="Culture"/>
      </ItemDetails>
    );

    return (
      <RowBlock left={itemList} right={charDetails}/>
    );
  }

}