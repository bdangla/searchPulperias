import React, { Component } from 'react';
import './App.css';
import items from './menu/menu';
import Content from './content';
import Header from './header';
import Footer from './footer';
import PropTypes from 'prop-types';
class App extends Component {
  static propTypes={
    children: PropTypes.object.isRequired
  };
  render(){
      const{children}=this.props;
      return (
        <div className="App">
          <Header title='Pulperia' items={items}/>
          <div className="container">
              <Content body={children} />
          </div>
          <Footer copyright='&copy; pulperia 2017'/>
        </div>
      );
  }
}

export default App;
