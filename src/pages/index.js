// ./src/pages/index.js
import React from "react"
import { Link } from "gatsby"
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'

import Image from 'react-bootstrap/Image'
import logo from '../auth0-logo.svg'

import { useAuth0 } from "@auth0/auth0-react"


// Importing Sass with Bootstrap CSS
import '../App.scss';
const Home = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    // console.log(`Authenticated = ${isAuthenticated}`)
    return (
        <Container className="p-3">
            <Row>
            <Col></Col>
            <Col xs={12} md={6}>
                <Card className="text-center mt-3" border="dark">
                    <Card.Body>
                        <Card.Title>
                            <Image src="/gold.png" style={{width:200}} />
                            <br/>
                            The Hunt for Vittorio's Gold
                        </Card.Title>

                        <Card.Text>
                        {isAuthenticated ? (
                            <p>You enter the Mansion and see a drinking lounge to the left, a reading room to the right. Which way shall you go?</p>
                        ) : (
                            <div>You stand outside Vittorio Manor, quite possibly the most secure property that exists. Dreading the multi-factor, multi-room authentication system he is sure to have implemented, you step up to the massive doors. A small sign says "Login with Auth0 please". Go figure.
                            <br/>
                            <Button onClick={() => loginWithRedirect()} className="btn-block btn btn-success mt-5">
                              Login
                            </Button>
                            </div>
                        )}
                    
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {isAuthenticated && (
                            <div>
                            <Link to="/study" className="btn btn-primary large" variant="primary">Enter the Mansion</Link>
                            <Button className="ml-5" onClick ={() => logout()} variant="success">Log Out</Button>
                            </div>
                        )}
                        <small>Built for Identiverse by <Image src={logo} style={{width:60}} rounded /></small>
                    </Card.Footer>
                </Card>
            </Col>
            <Col></Col></Row>
            
        </Container>
    )
}


export default Home;