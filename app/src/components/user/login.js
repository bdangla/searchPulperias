import React, {Component} from 'react';
import firebase from 'firebase';
class Login extends Component{
	constructor(){
		super()
		this.handleAuth = this.handleAuth.bind(this);
	}
	/*login(event){
		event.preventDefault();
		let email=event.target.email.value;
		let password=event.target.password.value;
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(result=>console.log('se ha logeado correctamente'))
		.catch(error=>alert(`${error.message}`));
	}
	showRegister(e){
		e.preventDefault();
		$('#contRegister').toggle('slow');
	}
	render(){
		return(
			<div>
				<h1>Login Now!</h1>
				<form onSubmit={this.login}>
					<input type="email" name="email" placeholder="Email" /><br/>
					<input type="password" name="password" placeholder="Password"/><br/>
					<input type="submit" value="Enter"/>
				</form>
			</div>
		)
	}*/
	handleAuth(){
      const provider= new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(result=>console.log(`${result.user.email} ha iniciado sesion`))
      .catch(error=>console.log(`Error ${error.code}:${error.message}`));
    }
    render(){
    	return(
          	<button className="btn btn-primary" onClick={this.handleAuth}>Login</button>
    	)
    }
}
export default Login;