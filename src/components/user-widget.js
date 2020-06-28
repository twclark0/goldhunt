import React from "react"
import { withAuth0 } from '@auth0/auth0-react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


class UserWidget extends React.Component {
  render() {
    const { user } = this.props.auth0;
    return (
      <Card border="dark" className="mt-3">
        <Card.Img variant="top" src={user.picture} />
        <Card.Body>
          <Card.Title>{user.nickname || user.name}</Card.Title>
          <Card.Text>
            Current challenge: 'Puzzle One'.
          </Card.Text>
          <Button variant="primary">Logout</Button>
        </Card.Body>
      </Card>

    )
  }
}

export default withAuth0(UserWidget);