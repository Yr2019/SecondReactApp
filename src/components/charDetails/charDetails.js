import React, {Component} from 'react';
// import './charDetails.css';
import styled from 'styled-components';
import Spinner from '../spinner';

const Field = ({itemInfo, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{itemInfo[field]}</span>
        </li>
    )
}

export {Field};
const CharDetailsBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
`;

const CharDetailsTitle = styled.h4`
    margin-bottom: 20px;
    text-align: center;
`;

const SelectError = styled.span`    
    color: #fff;
    text-align: center;
    font-size: 26px;
`;


export default class CharDetails extends Component {
    state = {
        itemInfo: null
    }
    
    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }
    updateChar() {
        const {charId, getDataInfo} = this.props;
        if (!charId) {
            return;
        }
        getDataInfo(charId)
            .then((itemInfo) => {
                this.setState({itemInfo})
            })
        // this.gotService.getHouse(charId)
        //     .then((itemInfo) => {
        //         this.setState({itemInfo})
        //     })
       //this.foo.bar = 0;
    }
    render() {

        if(!this.state.itemInfo) {
            return (
                <>
                    <SelectError>Please select a character</SelectError>
                    <Spinner/>
                </>
            )
        }
        const {itemInfo} = this.state;
        const {name} = itemInfo;
        return (
            <CharDetailsBlock>
                <CharDetailsTitle>{name}</CharDetailsTitle>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {itemInfo})
                        })
                    }
                </ul>
            </CharDetailsBlock>
        );
    }
}