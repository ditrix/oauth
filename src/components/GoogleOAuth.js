import React, { Component } from 'react';

export default class GoogleOAuth extends Component {
	constructor(){
		super()
		this.state = {
			signed: false,
			name: '',
			email: '',
			imageUrl: '',
		}

		this.signIn = this.signIn.bind(this)
		this.signOut = this.signOut.bind(this)
	}

	signOut(){
		this.setState({signed:false})
	}
	
	signIn = () => {

		

		const onOk = () => {
			console.log('signIn Ok')
			const userProfile	= auth2.currentUser.get().getBasicProfile()
		
			this.setState({
				signed: true,
				name: userProfile.getName(),
				imageUrl: userProfile.getImageUrl(),
				email: userProfile.getEmail()  				
			})
		
		}

		const onError = () => {
			console.log('signIn Error')
		}

		const auth2 = window.gapi.auth2.getAuthInstance() 
		
		auth2.signIn({scope:'profile email'}).then(onOk,onError)

    	//this.props.logged(true)
	}

	componentDidMount(){
    	console.log('here')
	    
	    const onInit = (mess) => {
            console.log('init ok')
        }
      	
      	const onError = (mess) => {console.log('error',mess)}

      	window.gapi.load('auth2', function() { // Ready. 
          window.gapi.auth2.init({ client_id: '390975980382-fp1nn9lo7pbv64t0kdenm9sq4et5n6ok.apps.googleusercontent.com' }).
            then(onInit, onError)
      	})
  	}
  	render(){
  		return(
  			<section>
  			{ this.state.signed ? 
  			<button onClick={this.signOut}>Logout</button>:
  			<button onClick={this.signIn}>Login</button>
  			}
  			<br />
  			{ this.state.signed ? 
  				<img src={this.state.imageUrl} />:<span></span>
  			}
  			</section>
  		)
  	}
}