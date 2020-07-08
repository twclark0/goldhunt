const React = require("react")
const { Auth0Provider } = require('@auth0/auth0-react')

const authDomain = process.env.GATSBY_AUTH0_DOMAIN
const authClientID = process.env.GATSBY_AUTH0_CLIENTID
const callbackURL = process.env.GATSBY_AUTH0_CALLBACK
const audienceURL = `https://${authDomain}/api/v2/`

exports.wrapRootElement = ({ element }) => {
	return (
		<Auth0Provider
	    domain={authDomain}
	    clientId={authClientID}
	    redirectUri={window.location.origin}
	    audience={audienceURL}
	    scope="read:current_user update:current_user_metadata"
	    >
	    	{element}
	  	</Auth0Provider>
	)
}