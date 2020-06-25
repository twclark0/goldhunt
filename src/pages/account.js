import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const Account = () => {
    const { user, logout, isAuthenticated } = useAuth0();
    return(
        <Container className="p-3">
            <Jumbotron className="pb-1">
                {isAuthenticated ? (
                        <div>
                            <Button onClick ={() => logout()} variant="success">Log Out</Button>
                            <h1>Congrats! Welcome {user.name}</h1>
                        </div>
                      ) : (
                        <h3>Ruh Roh!</h3>
                      )}
            </Jumbotron>
        </Container>
        
    )
    
}

export default Account;