import React, {Component} from 'react';
import Login from '../user/login';
import firebase from 'firebase';
import Posts from '../posts/Posts';
import '../../App.css';
class Home extends Component{
  constructor(){
    super()
    this.state={
      usuario:null
    }
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(usuario=>{
      this.setState({usuario});
    });
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
          <div className="content">
            {body}
            <Posts username={this.state.usuario.displayName} userphoto={this.state.usuario.photoURL} path={this.props.location}/>
          </div>
      );
    }
  }
}
export default Home;
