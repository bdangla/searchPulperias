import React, {Component} from 'react';

class PostForm extends Component{

	render(){
		return(
				<form onSubmit={this.props.onClick}>
					<input type="text" name="name" onChange={this.props.handleChange} placeholder="Name" value={this.props.title} required /><br/>
					<input type="text" name="description" onChange={this.props.handleChange} placeholder="Description" value={this.props.description} required /><br/>
					<textarea name="location" id="location" cols="30" rows="5" placeholder="Location" onChange={this.props.handleChange} value={this.props.title}></textarea><br/>
					<progress value={this.props.progress} max="100"></progress><br/>
					<input type="file" name="file" className="form-control" required/><br/>
					<input type="submit" value="submit" className="btn btn-default"/>
				</form>
		);
	}

}
export default PostForm;
