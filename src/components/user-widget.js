import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "gatsby"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import api from '../utils/api';
import scoreTools from '../utils/score';

const domain = process.env.GATSBY_AUTH0_DOMAIN;

const UserWidget = (props) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [timer, setTimer] = useState(0);
  const [fetched, setFetched] = useState(false);
  const [room, setRoom] = useState('');
  let startTime;
  let endTime;

  const updateUserMetadata = async () => {
    // request token again
    try {
      
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

      const user_data = await metadataResponse.json();
      return user_data;
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {

    // If first room
    // if (props.room == 'study') {
    //   // does user exist?
    //   const createOrUpdateUser = async () => {
    //     try {
    //       const {email, nickname, user_id} = await getUserMetadata();

    //       const startTime = await scoreTools.startTime();
    //       const newUser = {
    //         aid: user_id,
    //         name: nickname,
    //         email: email,
    //         startTime: startTime,
    //         score: 0
    //       }
    //       const exists = await api.search(newUser);
    //       setUserMetadata(newUser);
    //       if (exists.length > 0) {
    //         await api.update(exists[0].id, newUser)
    //         return
    //       } else {
    //         const u = await api.create(newUser);
    //         console.log(u);
    //       }
          
    //       console.log(userMetadata);
    //     } catch(err) {
    //       console.log(err.message);
    //     }
        
    //   }
    //   createOrUpdateUser();
    // }

    // if (props.room == 'library') {
    //   const updateScore = async () => {
    //     const udata = await getUserMetadata();
    //     const su = await api.search(udata);
    //     const dbUser = await api.read(su[0].id)
    //     const score = scoreTools.timeElapsed(dbUser.startTime);
    //     const updateUser = api.update(dbUser[0].id, {score:score})
    //   }
    //   updateScore()
    // }
    
    if (!props.room) {
      setInterval(setRoom(props.room), 1000)
    }

    

    // If you just hacked your own userMetadata, congrats you've won a special prize. Come find me at:
  }, [room]);
  
  return (
    isAuthenticated && (
      <Card border="dark" className="mt-3">
        <Card.Img variant="top" src={user.picture} />
        <Card.Body>
          <Card.Text>{user.name || user.nickname}</Card.Text>
        </Card.Body>
      </Card>
    )
  )
}

export default UserWidget;