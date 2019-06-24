import React, {Component} from 'react';
// import './randomChar.css';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage/';
import PropTypes from 'prop-types';


const RandomCharBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`;
const RoundChar = styled(RandomCharBlock)`

`;
const Term = styled.span`
    font-weight: bold;
`

export default class RandomChar extends Component {
    gotService = new GotService();
    state = {
        char: {},
        loading: true,
        error: false
    }
    static defaultProps = {
        interval: 15000
    }
    componentDidMount(){
        this.updateChar();
        this.timerID = setInterval(this.updateChar, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    onCharLoaded = (char) =>{
        this.setState({
            char,
            loading: false,
            error: false
        })
    }
    
    onEror = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }
    updateChar = () => {
        const id = Math.floor(Math.random()*140 +25);
        //const id = 1300000000;
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onEror);
    }
    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;
        return (
            <RoundChar>
                {errorMessage}
                {spinner}
                {content}
            </RoundChar>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture } = char;
    return (
        <>
        <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Gender </Term>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Born </Term>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Died </Term>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <Term>Culture </Term>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
RandomChar.propTypes = {
    interval: PropTypes.number
}


// RandomChar.propTypes = {
//     interval: (props, propName, componentName) => {
//         const value = props[propName];

//         if (typeof value === 'number' && !isNaN(value)){
//             return null
//         } 
//         return new TypeError(`${componentName}: ${propName} must to be a number`)
//     }
// }