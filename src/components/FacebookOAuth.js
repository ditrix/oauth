import React, { Component } from 'react';

export default class FacebookOAuth extends Component {
	
	constructor(){
		super()
    this.state = {
      connected: false,
      id: null,
      name: null,
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
            connected: (response.id !== undefined) 
          })
      }.bind(this))
   }

handleLogin() {
    window.FB.login(
      function(response){
         this.statusChangeCallback(response);   
      }.bind(this) // FB.api ...
    )
    //console.log(this.state)
}




handleLogout() {
    window.FB.logout(
      function(response){
         this.statusChangeCallback(response);   
      }.bind(this) // FB.api ...
    )
    //console.log(this.state)
 }


  componentDidMount() {
    console.log('componentDidMount')
     window.fbAsyncInit = function() {

      window.FB.init({
          appId      : '367873994005468',
          cookie     : true,
          xfbml      : true,
          version    : 'v3.2'
      });
      
      window.FB.getLoginStatus(
        function(response){
          this.statusChangeCallback(response);
        }.bind(this))
      }.bind(this);

    // Load the SDK asynchronously
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
      <section>
	<div>
  <div className="login-button" onClick={this.state.connected ? this.handleLogout:this.handleLogin}>
      <div className="login-facebook-icon">f</div>
      <div className="login-facebook-text">
          {this.state.connected ? <span>Logout</span>:<span>Log In</span>}
      </div>
  </div>
  <div class="fbUserInfo">{this.state.name}</div>
  </div>
  
  



        </section>
		)
	}
}

// https://developers.facebook.com/docs/reference/javascript/FB.logout
// https://developers.facebook.com/docs/javascript/examples/#login
// https://developers.facebook.com/docs/facebook-login/web/#example
// https://developers.facebook.com/docs/graph-api/reference/v2.1/user
// https://stackoverflow.com/questions/27717555/implement-facebook-api-login-with-reactjs
// https://developers.facebook.com/docs/javascript/examples/#login
// https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/
// https://stackoverflow.com/questions/27717555/implement-facebook-api-login-with-reactjs/31859302
