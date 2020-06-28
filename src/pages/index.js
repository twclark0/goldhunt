// ./src/pages/index.js
import React from "react"
import { Link } from "gatsby"
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { useAuth0 } from "@auth0/auth0-react"


// Importing Sass with Bootstrap CSS
import '../App.scss';
const Home = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    // console.log(`Authenticated = ${isAuthenticated}`)
    return (
        <Container className="p-3">
            <Jumbotron className="pb-1">
                <h1 className="header">Welcome to Gatsby Auth0</h1>
                <h2 className="header">Using Sass with custom theming</h2>
                <h3>{isAuthenticated}</h3>
                <hr />
                <p>
                    
                    {isAuthenticated ? (
                        <div>
                        <Link to="/account" className="btn btn-danger" variant="danger">Account</Link>
                        <Link to="/study" className="btn btn-primary large" variant="primary">Enter the Mansion</Link>
                        <Button onClick ={() => logout()} variant="success">Log Out</Button>
                        </div>
                      ) : (
                        <Button onClick={() => loginWithRedirect()} className="btn btn-success">
                          Login
                        </Button>
                      )}
                </p>
            </Jumbotron>
        </Container>
    )
}


export default Home;