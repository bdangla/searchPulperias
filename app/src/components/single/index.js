import React, {Component} from 'react';
import Login from '../user/login';
import firebase from 'firebase';
import '../../App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class Single extends Component{
  constructor(){
    super()
    this.state={
      description:'',
      imageName:'',
      imageUrl:'',
      location:'',
      name:'',
      userphoto:'',
      username:''
    }
  }
  componentDidMount(){
    const search=this.props.location.search;
    const id=search.slice(1);
    const db=firebase.database().ref(`/post/${id}`)
    db.on('value',snapshot=>{
      let posts=snapshot.val();
      this.setState({
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
  render() {
    const{body}=this.props;
    if (!this.state.usuario) {
      return(
         <Login />
      )
    }
    else{

      return (
          <div className="container content_singler">
            {body}
              <div className="col-md-12 single_title">
              <h1>{this.state.name}</h1>
              </div>
              <div className="col-md-6 col-sm-12 single_img">
                <img src={this.state.imageUrl} alt={this.state.imageName} id="single_img" />
              </div>
              <div className="col-md-6 col-sm-12 single_content">
                <h3>Pulperia Details</h3>
                <Tabs>
                  <TabList>
                    <Tab>Description</Tab>
                    <Tab>Location</Tab>
                    <Tab>User</Tab>
                  </TabList>

                  <TabPanel>
                    <p>{this.state.description}</p>
                  </TabPanel>
                  <TabPanel>
                    <iframe title={this.state.name} src={this.state.location} width="600" height="450" className="single_location"></iframe>
                  </TabPanel>
                  <TabPanel>
                    <div className="col-md-6 col-sm-12 user_single">
                      Name:<b>{this.state.username}</b><br/>
                      Email:<b>{this.state.usuario.email}</b>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <img src={this.state.userphoto} alt={this.state.imageName} className="single_userphot" />
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
          </div>
      );
    }
  }
}
export default Single;
