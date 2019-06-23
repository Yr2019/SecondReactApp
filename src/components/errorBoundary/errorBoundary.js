import React, {Component} from 'react';
import img from './error.jpg';


export default class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    console.log('error', error);
    console.log('info', info);
    this.setState({hasError: true});
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="random-block">
          <img src={img} alt=""/>
          <span>Something goes wrong</span>
        </div>
      );
    } else {
      return this.props.children;
    }
  }

}