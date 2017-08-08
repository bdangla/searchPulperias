import React, {Component} from 'react';
import firebase from 'firebase';
import PostForm from './postForm';
import LogOut from '../user/logOut';
import $ from 'jquery';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
class Posts extends Component{
	static propTypes={
		username:PropTypes.string,
		userphoto:PropTypes.string,
		path:PropTypes.object
	};
	constructor(){
	    super()
	    this.state={
	      name:'',
	      description:'',
				location:'',
	      imageName:'',
	      posts:[],
	      progressVal:''
	    }
	    this.addPost=this.addPost.bind(this);
	    this.handleChange=this.handleChange.bind(this);
			this.searchFuntion=this.searchFuntion.bind(this);

	};
	componentDidMount(){
	    const db=firebase.database().ref('post');
	    db.on('value',snapshot=>{
	      let posts=snapshot.val();
	      let newState=[];
	      for(let post in posts){
	        newState.push({
	          id:post,
	          name:posts[post].name,
	          description:posts[post].description,
						location:posts[post].location,
	          userphoto:posts[post].userphoto,
	          username:posts[post].username,
	          imageName:posts[post].imageName,
	          imageUrl:posts[post].imageUrl
	        });
	      }
	      this.setState({
	        posts:newState
	      });
	    })
	}
	addPost(event){
      event.preventDefault();
			this.hideForm();
      const file= event.target.file.files[0]
      const fileName= Date.now()+'-'+file.name
      const storageRef= firebase.storage().ref(`fotos/${fileName}`)
      const dbRef=firebase.database().ref('post');
      const task=storageRef.put(file)
      task.on('state_changed', snapshot=>{
      	let progress=(snapshot.bytesTransferred / snapshot.totalBytes) *100;
      	this.setState({
      		progressVal:progress
      	})
      },error=>{
      	console.log(error.message)
      },
      ()=>{
				const map=this.state.location.split('"',3)
      	const data={
      	imageName:fileName,
      	imageUrl:task.snapshot.downloadURL,
      	userphoto:this.props.userphoto,
        username:this.props.username,
        name:this.state.name,
        description:this.state.description,
				location:map[1]

     	}
      	dbRef.push(data);
	      this.setState({
	        name:'',
	        description:'',
	        progressVal:'',
					location:''
	    });
	 })
  	}
	deletePost(id){
	    firebase.database().ref(`/post/${id}`).remove();
	}
	deleteFile(name){
		firebase.storage().ref(`fotos/${name}`).delete().then(function(){
			console.log('delete complete')
		}).catch(function(error){
			console.log(error.message)
		});
	}
	click(id,name){
		this.deletePost(id)
		this.deleteFile(name)
	}
	handleChange(event){
	    this.setState({
	       [event.target.name]: event.target.value
	    })
	}
	showForm(){
		$('#show_form').hide();
		$('.form').show();
	}
	hideForm(){
		$('#show_form').show();
		$('.form').hide();
	}
	searchFuntion(event){
		event.preventDefault();
		var db = firebase.database().ref("post");
		var searchVal=event.target.search.value;
		db.orderByChild("name").startAt(searchVal).on("value",snapshot=>{
			let newState=[];
			let posts=snapshot.val();
			for(let post in posts){
				//console.log(post);
				newState.push({
					id:post,
					name:posts[post].name,
					description:posts[post].description,
					location:posts[post].location,
					userphoto:posts[post].userphoto,
					username:posts[post].username,
					imageName:posts[post].imageName,
					imageUrl:posts[post].imageUrl
				});
			}
			this.setState({
				posts:newState
			});
			$(".result_search span").text(searchVal);
			$(".result_search").css("display","block");
		});
	}
	render(){
			return(
				<div className="container">
	              <div className="col-md-12 info_user">
	                <div className="col-md-6">
	                  <h2> welcome <small>{this.props.username}!</small></h2>
										<LogOut username={this.props.username}/>
	                </div>
	                <div className="col-md-6 cont_logout">
										<form onSubmit={this.searchFuntion}>
										<input type="text" placeholder="Search" name="search"/>
										<input type="submit"  id="btn_search" className="btn btn-success" value="Search"/>
										</form>
	                </div>
	                <div className="col-md-12">
	                  <img className="user_photo" src={this.props.userphoto} alt={this.props.username} />
	                </div>
									<div className="col-md-12">
									<button id="show_form" className="btn btn-default" onClick={this.showForm}>Add Pulperia</button>
									</div>
	                <div className="col-md-12 form">
	                	<PostForm onClick={this.addPost} handleChange={this.handleChange} name={this.state.name} description={this.state.description} progress={this.state.progressVal} location={this.state.location} />
	                </div>
	              </div>
	              <div className="container main_cont">
									<div className="result_search">
										<h2>Result for:<span></span></h2>
									</div>
	              	{
	              		this.state.posts.map((post)=>{
											//verifica la ruta
											if (this.props.path.pathname && this.props.path.pathname==="/MyList") {
											//verifica si son los post del usuario logueado y los muestra
													if (post.username===this.props.username) {
				              			return(
				              			<div key={post.id} className="img_content">
								              <div className="col-xs-6 col-md-3 cn_pul">
															      <h1 className="title_img">{post.name}</h1>
						                        <a id="delete" className="btn btn-danger" onClick={()=>this.click(post.id, post.imageName)}>X</a>
						                        <Link to={`/single?`+post.id}><img src={post.imageUrl} alt={post.imageName} className="img-responsive img-thumbnail"/></Link>
																		<Link to={`/edit?`+post.id}><span className="glyphicon glyphicon-pencil edit"></span></Link>
															</div>
							            	</div>
				              			)
													}
											}
										else{
										return(
										<div key={post.id} className="img_content">
										<div className="col-xs-6 col-md-3 cn_pul">
													<h1 className="title_img">{post.name}</h1>
													<Link to={`/single?`+post.id} ><img src={post.imageUrl} alt={post.imageName} className="img-responsive img-thumbnail"/></Link>
										</div>
										</div>
										)
									}
									return('')
			            }).reverse()

			        }
	              </div>
	            </div>
			)
	}
}
export default Posts;
