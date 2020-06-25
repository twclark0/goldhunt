const React = require("react")
const { Auth0Provider } = require('@auth0/auth0-react')

const authDomain = process.env.AUTH0_DOMAIN
const authClientID = process.env.AUTH0_CLIENTID
const callbackURL = process.env.AUTH0_CALLBACK

exports.wrapRootElement = ({ element }) => {
	return (
		<Auth0Provider
	    domain={authDomain}
	    clientId={authClientID}
	    redirectUri={callbackURL}
	    >
	    	{element}
	  	</Auth0Provider>
	)
}