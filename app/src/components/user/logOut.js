import React, {Component} from 'react';
import firebase from 'firebase';
class LogOut extends Component{
	constructor(){
		super()

      	this.handleLogout = this.handleLogout.bind(this);
	}
    handleLogout(){
      firebase.auth().signOut()
      .then(result=>console.log(`${this.props.username} ha salido`))
      .catch(error=>console.log(`Error ${error.code}:${error.message}`));
    }
    render(){
    	return(
	           <button className="btn btn-danger" onClick={this.handleLogout}><span className="glyphicon glyphicon-off"></span> Logout</button>
    	)
    }
}
export default LogOut;
