import React from "react"
import { withAuth0 } from '@auth0/auth0-react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import UserWidget from '../components/user-widget'
import AuthTips from '../components/AuthTips'
import Timer from '../components/Timer'

const Layout = ({children}) => {
  return (
    <Container className={window.location.pathname.split("/").pop()}>
      <Row>
        <Col></Col>
        <Col xs={12} md={6}>{children}</Col>
        <Col>
          <UserWidget></UserWidget>
        </Col>
      </Row>
    </Container>
  )
}

export default Layout;