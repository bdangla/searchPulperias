import React, {Component} from 'react';
import Login from '../user/login';
import firebase from 'firebase';
import '../../App.css';
import $ from 'jquery';
import EditForm from'../posts/editForm';
class Edit extends Component{
  constructor(){
    super()
    this.state={
      description:'',
      imageName:'',
      imageUrl:'',
      location:'',
      name:'',
      userphoto:'',
      username:'',
      id:'',
      redirect:false
    }
    this.handleChange=this.handleChange.bind(this);
    this.backReturn=this.backReturn.bind(this);
    this.editPost=this.editPost.bind(this);
    this.deleteFile=this.deleteFile.bind(this);
    this.showEditImage=this.showEditImage.bind(this);
  }
  componentDidMount(){
    const search=this.props.location.search;
    const id=search.slice(1);
    const db=firebase.database().ref(`/post/${id}`)
    db.on('value',snapshot=>{
      let posts=snapshot.val();
      this.setState({
        id:id,
        description:posts.description,
        imageName:posts.imageName,
        imageUrl:posts.imageUrl,
        location:posts.location,
        name:posts.name,
        userphoto:posts.userphoto,
        username:posts.username
      })
    })
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged(usuario=>{
      this.setState({usuario});
    });
  }
  editPost(event){
    event.preventDefault();
    const db=firebase.database().ref(`/post/${event.target.id.value}`)
    //this is for the location
    if (event.target.location.value.charAt(0)==='h') {
      const map=event.target.location.value;
      //if the user add a image drop the old image and upload the new one
      if (event.target.file.files[0]) {
        this.deleteFile(this.state.imageName);
        const file= event.target.file.files[0]
        const fileName= Date.now()+'-'+file.name
        const storageRef= firebase.storage().ref(`fotos/${fileName}`);
        const task=storageRef.put(file);
        var name=event.target.name.value;
        var description=event.target.description.value;
        var userphoto=event.target.userphoto.value;
        var username=event.target.username.value;
        task.on('state_changed', snapshot=>{

        },error=>{
        	console.log(error.message)
        },
        ()=>{
          let data={
          name:name,
          description:description,
          location:map,
          userphoto:userphoto,
          username:username,
          imageName:fileName,
        	imageUrl:task.snapshot.downloadURL,
       	}
        db.update(data);
        this.backReturn();
      })
      }
      else{
        let data={
          name:event.target.name.value,
          description:event.target.description.value,
          location:map,
          userphoto:event.target.userphoto.value,
          username:event.target.username.value
        }
        db.update(data);
        this.backReturn();
      }
    }
    else{
      const map=event.target.location.value.split('"',3)
      let data={
        name:event.target.name.value,
        description:event.target.description.value,
        location:map[1],
        userphoto:event.target.userphoto.value,
        username:event.target.username.value
      }
      db.update(data);
        this.backReturn();
    }
  }
  deleteFile(name){
		firebase.storage().ref(`fotos/${name}`).delete().then(function(){
			console.log('delete complete')
		}).catch(function(error){
			console.log(error.message)
		});
	}
  backReturn(){
    if (window.confirm("Your pulperia was edited! return to your list?") === true) {
      window.location.href = "/MyList";
    }
  }
  handleChange(event){
	    this.setState({
	       [event.target.name]: event.target.value
	    })
	}
  showEditImage(){
    $(".editImage").show();
    $(".showEditImage").hide();
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
        <EditForm showEditImage={this.showEditImage} onClick={this.editPost} handleChange={this.handleChange} id={this.state.id} userphoto={this.state.userphoto} username={this.state.username} name={this.state.name} description={this.state.description} location={this.state.location}/>
        </div>
      );
    }
  }
}
export default Edit;
