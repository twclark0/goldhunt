import React from "react"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import logo from '../auth0-logo-fordarkbg.svg'


const AuthTips = (props) => {
  console.log(props);
  return (
    <Card
      bg='dark'
      text='white'
      className="mt-3"
      border='dark'
    >
      <Card.Header className="text-center">
        <Image src={logo} style={{width:120}} rounded />
      </Card.Header>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          {props.children}
        </Card.Text>
        <Button variant="success" size="sm" target="_blank" href={props.url}>{props.cta}</Button>
      </Card.Body>
    </Card>
  )
}

export default AuthTips;