import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
class Header extends Component {
  static propTypes={
    title:PropTypes.string.isRequired,
    items:PropTypes.array.isRequired
  };
  render() {
    const {title, items}=this.props;
      return (
        <div className="header_container">
            <div className="page-header">
              <h1>{title} <small>Search <span className="glyphicon glyphicon-map-marker"></span></small></h1>
              <ul className="menu">
                {items && items.map(
                  (item, key)=><li key={key} id={item.id}><Link to={item.url}>{item.title}</Link></li>
                  )
                }
              </ul>
            </div>
        </div>
      );
  }
}

export default Header;
