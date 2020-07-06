import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "gatsby"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const domain = process.env.GATSBY_AUTH0_DOMAIN;

const UserWidget = (props) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [timer, setTimer] = useState(0);
  const [fetched, setFetched] = useState(false);
  let startTime;
  let endTime;

  const updateScore = async () => {
    startTime = userMetadata ? userMetadata.score : Date.now();
    endTime = Date.now() - startTime;
    setTimer(endTime);
    console.log(`Started Time!: ${startTime}. End Time: ${endTime}`);
    await updateUserMetadata();
    return 1;
  }

  const updateUserMetadata = async () => {
    // request token again
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user update:current_user_metadata create:current_user_metadata",
      });

      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
      const attempts = userMetadata ? userMetadata.attempts + 1 : 1;
      const addTime = userMetadata.score + timer;
      await setUserMetadata({...userMetadata, 'score': addTime, 'attempts': attempts});
      await fetch(userDetailsByIdUrl, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'user_metadata': {
            'score': userMetadata.score,
            'attempts': userMetadata.attempts
          }
        })
      });
      return 1;
    } catch (e) {
      console.log(e.message);
    }
  }
  const getUserMetadata = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user update:current_user_metadata create:current_user_metadata",
      });
      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { user_metadata} = await metadataResponse.json();
      return user_metadata;
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {

    const fetchMe = async () => {
      const data = await getUserMetadata();
      const set = await setUserMetadata(data);
      console.log(data, set)
      return set;
    }
    fetchMe();

    setTimeout(async () => {
      console.log(userMetadata)
      const f = await updateScore();
      console.log(f);
    }, 2000)

    // If you just hacked your own userMetadata, congrats you've won a special prize. Come find me at:
  }, []);
  
  return (
    isAuthenticated && (
      <Card border="dark" className="mt-3">
        <Card.Img variant="top" src={user.picture} />
        <Card.Body>
          <Card.Title>{user.nickname || user.name}</Card.Title>
          <Card.Text>
            {userMetadata ? (
              <p><b>Score: </b>{userMetadata.score}</p>
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