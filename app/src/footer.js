import React, {Component} from 'react'
import './App.css';
import PropTypes from 'prop-types';
class Footer extends Component{
  static propTypes={
    copyright:PropTypes.string
  };
  render(){
    const{copyright= '&copy; pulperia 2017'} = this.props;
    return(
      <div className="footer_container">
        <p dangerouslySetInnerHTML={{__html:copyright }} />
      </div>
    )
  }
}
export default Footer;
