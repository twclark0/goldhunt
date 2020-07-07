import React, { useEffect, useState } from "react"
import { withAuth0 } from '@auth0/auth0-react';
import { useLocation } from '@reach/router'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import UserWidget from '../components/user-widget'
import AuthTips from '../components/AuthTips'
import Footer from '../components/Footer';
import Timer from '../components/Timer'

import Image from 'react-bootstrap/Image'
import logo from '../auth0-logo.svg'

const Layout = (props) => {
  const [room, setRoom] = useState();
  const href = useLocation();

  useEffect(() => {
    const path = href.pathname.split("/").pop();
    setRoom(path);
    const bg = document.getElementById("background");
    bg.classList.add(path);
  }) 

  return (
    <div id="background">
      <Container>
        <Row>
          <Col>
            {!props.final && (
              <AuthTips 
                {...props}
              >{props.content}
              </AuthTips>
            )}
          </Col>
          <Col xs={12} md={6}>{props.children}</Col>
          <Col>
            <UserWidget room={room}></UserWidget>
          </Col>
        </Row>
      </Container>
      <Footer>
        <small className="mt-3">Powered by <Image src={logo} style={{width:60}} rounded /></small></Footer>
    </div>
  )
}

export default Layout;