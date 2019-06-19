import React  from 'react';
import './errorMessage.css';
import img from './error.jpg';


const ErrorMessage = () => {
  return (
    <div className="random-block">
      {/* <img src={process.env.PUBLIC_URL + '/img/error/error.jpg'} alt="eror"/> */}
      <img src={img} alt=""/>
      <span>Something goes wrong</span>
    </div>
  )
}

export default ErrorMessage;