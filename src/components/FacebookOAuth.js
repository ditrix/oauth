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
    this.handleClick = this.handleClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
   
	}

   statusChangeCallback(response){
      console.log('statusChangeCallback');
      window.FB.api('/me', function(response) {
          console.log(response);
          this.setState({name:response.name, id: response.id})
        }.bind(this))
      console.log('this.state=',this.state)
   }


  checkLoginState() {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
      console.log('checkLoginState-------')
      console.log(response)
      console.log('-------checkLoginState')
    }.bind(this));
  }

handleClick() {
  window.FB.login(this.checkLoginState());
}

handleLogoutClick() {
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
      <button onClick={this.handleClick}>login</button>
      <br />
      <button onClick={this.handleLogoutClick}>logout</button>
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
