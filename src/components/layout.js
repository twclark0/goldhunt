import React from "react"
import { withAuth0 } from '@auth0/auth0-react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import UserWidget from './user-widget'
import Timer from './Timer'


export default function Layout({ children }) {
  return (
    <Container>
        <Row>
          <Col><Timer start={true}></Timer></Col>
          <Col xs={12} md={6}>{children}</Col>
          <Col>
            <UserWidget></UserWidget>
          </Col>
        </Row>
    </Container>
  )
}