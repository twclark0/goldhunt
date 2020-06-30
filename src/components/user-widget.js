import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "gatsby"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const domain = process.env.AUTH0_DOMAIN;

const UserWidget = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `${domain}/api/v2/`,
          scope: "read:current_user update:current_user_metadata create:current_user_metadata",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };

    const updateUserMetadata = async () => {
      // request token again

      // patch to api/v2/users/
    }

    getUserMetadata();
  }, []);
  
  return (
    isAuthenticated && (
      <Card border="dark" className="mt-3">
        <Card.Img variant="top" src={user.picture} />
        <Card.Body>
          <Card.Title>{user.nickname || user.name}</Card.Title>
          <Card.Text>
            {userMetadata ? (
              <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
            ) : (
              "No user metadata defined"
            )}
          </Card.Text>
          <Link to="/" className="btn btn-secondary">Home</Link>
        </Card.Body>
      </Card>
    )
  )
}

export default UserWidget;