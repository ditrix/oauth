import React, { Component } from 'react';

export default class FacebookOAuth extends Component {
	
	constructor(){
		super()
    this.state = {
      signed: false,
      id: null,
      name: null,
      email: null,
      imageUrl: null,
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
   
	}

   statusChangeCallback(response){
      window.FB.api('/me', function(response) {
          console.log('statusChangeCallback',response)
          this.setState({name:response.name, id: response.id, signed: (response.id !== undefined) })
          console.log('this.state.after',this.state);
      }.bind(this))
   }


  checkLoginState() {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
      console.log('checkLoginState-------')
      console.log(response)
      console.log('-------checkLoginState')
    }.bind(this));
  }

// https://developers.facebook.com/docs/javascript/examples/#login
// https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus/
// https://stackoverflow.com/questions/27717555/implement-facebook-api-login-with-reactjs/31859302
handleLogin() {
  if(!this.state.signed) {
    window.FB.login(function(response) {
        if(response.authResponse){
          window.FB.api('/me',function(reponse){
            console.log(response)
           this.setState({signed: true, name: response.name})
          }.bind(this)) // .api('/me',..)
        }
      }.bind(this)) // .login
  }
 /* window.FB.getLoginStatus(function(response){
    if(response !== 'connected'){
       window.FB.login(function(response) {
        if(response.authResponse){
          window.FB.api('/me',function(reponse){
            console.log(response)
           this.setState({signed: true, name: response.name})
          }.bind(this)) // .api('/me',..)
        }
      }.bind(this)) // .login
      }    
  }.bind(this)) // .getLoginStatus
  console.log(this.state)
}  */
/*
  window.FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     window.FB.api('/me', function(response) {
       console.log('Good to see you, ' + response.name + '.');
     });
    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
});
}
*/
/*

handleLogin() {

  window.FB.getLoginStatus(function(response) {
  // this will be called when the roundtrip to Facebook has completed
    console.log('handleLogin=>',response)
    this.setState({signed: (response.status == 'connected')?true : false })
    //console.log(this.state)
  }.bind(this), true);

  if(!this.state.signed){
    window.FB.login(
      function(response){
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          window.FB.api('/me', function(response) {
              console.log('Good to see you, ' + response.name + '.');
              this.setState({signed: true, name:response.name})    
          }.bind(this))
      }
    }.bind(this)//function(response)
    )
  }
  console.log(this.state)
*/ 
}

handleLogout() {
  window.FB.logout(this.checkLoginState());
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
			<h4>todo facebook sign in</h4>
      <button onClick={this.handleLogin}>login</button>
      <br />
      <button onClick={this.handleLogout}>logout</button>
      <br />
      <div id="status">{this.state.name}</div>
      </section>
		)
	}
}

// https://developers.facebook.com/docs/reference/javascript/FB.logout
// https://developers.facebook.com/docs/javascript/examples/#login
// https://developers.facebook.com/docs/facebook-login/web/#example
// https://developers.facebook.com/docs/graph-api/reference/v2.1/user
// https://stackoverflow.com/questions/27717555/implement-facebook-api-login-with-reactjs
