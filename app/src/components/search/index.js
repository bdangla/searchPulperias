import React, {Component} from 'react';
import Login from '../user/login';
import '../../App.css';
class Search extends Component{
  componentDidMount(){
  }
  componentWillMount(){

  }
  render() {
    const{body}=this.props;
    if (!this.state.usuario) {
      return(
         <Login />
      )
    }
    else{
      return (
        <div>
        {body}
        </div>
      );
    }
  }
}
export default Search;
