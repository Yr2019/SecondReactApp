import React from 'react';
import styled from 'styled-components';
import GotHouse from '../../services/gotHouse';
import GotCharacters from '../../services/gotService';
import GotBooks from '../../services/gotBook';



const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
`;

const HeaderTitle = styled.h3`
    font-size: 24px;
    color: #fff;
    margin: 0;
`;

const HeaderLinks = styled.ul`
    display: flex;
    margin: 0;
    align-items: center;
    color: #fff;
    list-style-type: none;
    li {
        margin-right: 20px;
        font-size: 18px;
    }
`;





const Header = () => {
    
    function handleClick(e, elem) {
        e.preventDefault();
        console.log('All Houses : ');
            const  newArray = new elem();
                newArray.getAllHouses()
                .then(res => console.log(res));
    }
    function handleClick2(e, elem) {
        e.preventDefault();
        console.log('All Characters : ');
        const newArray = new elem();
        newArray.getAllCharacters()
            .then(res => console.log(res));
    }
    function handleClick3(e, elem) {
        e.preventDefault();
        console.log('All Books : ');
        const newArray = new elem();
        newArray.getAllBooks()
            .then(res => console.log(res));
    }
    return (
        <HeaderBlock>
            <HeaderTitle>
                <a href="{}"> 
                Game of Thrones DB
                </a>
            </HeaderTitle>
            <HeaderLinks>
                <li>
                    <a href="characters" onClick={(e) => handleClick2(e, GotCharacters)}>Characters</a>
                </li>
                <li>
                    <a href="houseInfo" onClick={(e) => handleClick(e, GotHouse)}>Houses</a>
                </li>
                <li>
                    <a href="books" onClick={(e) => handleClick3(e, GotBooks)}>Books</a>   
                </li>
            </HeaderLinks>
        </HeaderBlock>
    );
};

export default Header;