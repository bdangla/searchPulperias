import React, {Component} from 'react';

class EditForm extends Component{

	render(){
		return(
				<form onSubmit={this.props.onClick} className="form-horizontal editForm">
				<h2>You are editing Pulperia: <span className="label label-primary">{this.props.name}</span><br/>
				</h2>
				 <div className="form-group">
				 		<label>Name</label>
				 		<input type="text" name="name" className="form-control" onChange={this.props.handleChange} placeholder="Name" value={this.props.name} /><br/>
				 </div>
				 <div className="form-group">
				 		<label>Description</label>
				 		<input type="text" name="description" className="form-control" onChange={this.props.handleChange} placeholder="Description" value={this.props.description}/><br/>
				 </div>
				 <div className="form-group">
				 		<label>Location</label>
				 		<textarea name="location" id="location" cols="30" className="form-control" rows="5" placeholder="Location" onChange={this.props.handleChange} value={this.props.location}></textarea><br/>
				 </div>
				 <a href="#" className="btn btn-success showEditImage" onClick={this.props.showEditImage} >Edit Image</a>
				 <div className="form-group editImage">
				 		<label>Image</label>
				 		<input type="file" name="file" className="form-control" /><br/>
				 </div>
					<progress value={this.props.progress} max="100"></progress><br/>
					<input type="hidden" name="id" value={this.props.id}/>
					<input type="hidden" name="username" value={this.props.username}/>
					<input type="hidden" name="userphoto" value={this.props.userphoto}/>
					<input type="submit" value="submit" className="btn btn-default"/>
				</form>
		);
	}

}
export default EditForm;
