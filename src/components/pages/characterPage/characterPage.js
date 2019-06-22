import React, {Component} from 'react';
import ItemList from '../../itemList/';
import CharDetails, {Field} from '../../charDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class CharacterPage extends Component {
  gotService = new GotService();
  state = {
    selectedChar: null,
    error: false
  }

  onItemSelected = (id) => {
    this.setState({
      selectedChar: id
    })
  }

  componentDidCatch() {
    console.log('error');
    this.setState({
      error: true
    })
  }
  render() {
    if (this.state.error){
      return <ErrorMessage/>
    }

    const itemList = (
      <ItemList 
            onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllCharacters}
            // renderItem={(item) => `${item.name} (${item.gender})`}/>
            renderItem={({name, gender}) => `${name} (${gender})`}/>
    )

    const charDetails = (
      <CharDetails 
      charId={this.state.selectedChar}
      getDataInfo={this.gotService.getCharacter}
      >
          <Field field='gender' label='Gender'></Field>
          <Field field='born' label='Born'></Field>
          <Field field='died' label='Died'></Field>
          <Field field='culture' label='Culture'></Field>
      </CharDetails>
    )
    return (
        <RowBlock left={itemList} right={charDetails}/>
    )
  }
}