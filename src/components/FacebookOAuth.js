import React, { Component } from 'react';

export default class FacebookOAuth extends Component {
	
	constructor(){
		super()
	}

  componentDidMount() {

    window.fbAsyncInit = function() {

      window.FB.init({
        appId      : '367873994005468',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });
      window.FB.AppEvents.logPageView();
      window.FB.Event.subscribe('auth.statusChange', function(response) {
        if (response.authResponse) {
          this.checkLoginState();
        } else {
          console.log('---->User cancelled login or did not fully authorize.');
        }
      }.bind(this));
    
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }	

	render(){
		return(
			<h4>todo facebook sign in</h4>
		)
	}
}