import React, { Component } from 'react';
import  './FacebookOAuth.css'

export default class FacebookOAuth extends Component {
	
	constructor(){
		super()
    this.state = {
      connected: false,
      id: null,
      name: null,
      imageUrl: null,
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
   
	}

   statusChangeCallback(response){
      window.FB.api('/me', function(response) {
          console.log('statusChangeCallback',response)
          this.setState({
            name:response.name, 
            id: response.id, 
            connected: (response.id !== undefined),
            // imageUrl: (response.id !== undefined)?`https://graph.facebook.com/${response.id}/picture`:null
          })
      }.bind(this))
   }

handleLogin() {
    window.FB.login(
      function(response){
         this.statusChangeCallback(response);   
      }.bind(this) // FB.api ...
    )

}




handleLogout() {
    window.FB.logout(
      function(response){
         this.statusChangeCallback(response);   
      }.bind(this) // FB.api ...
    )
 
 }


  componentDidMount() {
   
     window.fbAsyncInit = function() {

      window.FB.init({
          appId      : `${process.env.REACT_APP_FID}`,
          cookie     : true,
          xfbml      : true,
          version    : 'v3.2'
      });
      




      window.FB.getLoginStatus(
        function(response){
          this.statusChangeCallback(response);
        }.bind(this))


      }.bind(this);

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

}// componentDidMount

 

	render(){
		return(
 
	<div className="fb-demo">
 		
		{ this.state.connected&&
  			<div className="fbUserInfo">
  				<span className="facebook-user-name">{this.state.name}</span>
  				{/*<img src={this.state.imageUrl} />*/}
  				
  			</div>  			
  		}
  		
		  <div className="login-facebook-button" onClick={this.state.connected ? this.handleLogout:this.handleLogin}>
		      <div className="login-facebook-icon">f</div>
		      <div className="login-facebook-text">
		          {this.state.connected ? <span>Logout</span>:<span>Log In</span>}
		      </div>
		  </div>
 

  </div>
  
 		)
	}
}

