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
import Layout from '../components/layout';

import { useAuth0 } from "@auth0/auth0-react"

import '../App.scss';
const Home = () => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	// console.log(`Authenticated = ${isAuthenticated}`)
	return (
		<Container className={window.location.pathname.split("/").pop()}>
		  <Row>
				<Col></Col>
				<Col xs={12} md={6}>
					<Card className="text-center mt-3" border="dark">
						<Card.Body>
							<Card.Title>
								<Image src="/gold.png" style={{width:200}} />
								<br/>
								The Hunt for Vittorio's Golden Tokens
							</Card.Title>

							<Card.Text>
							{isAuthenticated ? (
								<p>The massive door swings open. Well, that was easy...almost too easy... You have a choice: enter the mansion, or log out and abandon your quest for gold and glory.</p>
							) : (
								<div>
									Having heard rumors of a cache of golden tokens, you stand outside Vittorio’s Mansion, quite possibly the most secure property that exists, hoping to breach Vittorio’s defences and leave with riches. Dreading the multi-factor, multi-room authentication system he is sure to have implemented, you step up to a massive door. A small sign says "Login with Auth0 please". Go figure.
									<small>By logging into this challenge you agree to be contacted by our team for marketing purposes, agree to Auth0’s terms of service, privacy policy and contest rules.</small>
									<br/>
									<Button onClick={() => loginWithRedirect()} className="btn-block btn btn-success mt-5">
									  Unlock Vittorio's Mansion
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
							<hr/>
						</Card.Footer>
					</Card>
				</Col>
				<Col>
				</Col>
		  </Row>
		</Container>
		
	)
}


export default Home;