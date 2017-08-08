/*import React, {Component} from 'react';
import firebase from 'firebase';
class Register extends Component{
	register(event){
		event.preventDefault();
		let email=event.target.email.value;
		let password=event.target.password.value;
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(result=>console.log('se ha registrado correctamente'))
		.catch(error=>console.log(`error ${error.code}: ${error.message}`));
	}
	render(){
		return(
			<div>
				<h1>Register</h1>
				<form onSubmit={this.register}>
					<input type="email" name="email" placeholder="Email" /><br/>
					<input type="password" name="password" placeholder="Password"/><br/>
					<input type="submit" value="Register"/>
				</form>
			</div>
		)
	}
}
export default Register;*/
