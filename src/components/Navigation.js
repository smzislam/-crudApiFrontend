import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <header className="header" id="header">
        <div className="inner-wrapper flex-container">
          <div className="logo"><Link to="/">MyStore</Link></div>
          <div className="navbar" id="navbar">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
          </div>
        </div>
    </header> 
    );
  }
}

export default Navigation;