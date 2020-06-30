import React, {useState} from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "gatsby"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Layout from '../components/layout';
import PictureModal from '../components/PictureModal';
import AuthTips from '../components/AuthTips';

const puzzleAnswer = process.env.GATSBY_LIBRARY_ANSWER;

const Library = () => {
  const answers = {
    ltr0: "",
    ltr1: "",
    ltr2: "",
    ltr3: "",
    ltr4: "",
    ltr5: ""
  }
  const [modalShow, setModalShow] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [answer, setAnswer] = useState(answers);

  const handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    answers[name] = value;
    setAnswer({...answer, [name]: value });
  }
  const toggle = () => {
    setModalShow(!modalShow)
  }
  const handleSubmit = event => {
    event.preventDefault();
    const concanswer = Object.values(answer).join('').toLowerCase()
    setCorrect(concanswer === puzzleAnswer);
  }
  return (
    <div className = "background library">
    <Layout>
      <Card className="text-center mt-3" border="dark">
        <Card.Header>The Bookshelf</Card.Header>
        <Card.Body>
          <Card.Title>Something missing</Card.Title>
          <Card.Text> Ahead the bookshelf looks distrubed. As you approach, one book is less dusty than the others-- you open it. What's this? An old newspaper clipping? What could this mean?</Card.Text>
          <hr/>
          <Button variant="light" size="sm" onClick={toggle}>Inspect the Paper</Button>
          <br/>
          <br/>
          <Form className="text-justify" onSubmit={handleSubmit}>
            <Row>
              <Col><Form.Control name="ltr0" size="lg" type="text" placeholder="D" value={answer.ltr0} onChange={handleInputChange} /></Col>
              <Col><Form.Control name="ltr1" size="lg" type="text" placeholder="E" value={answer.ltr1} onChange={handleInputChange} /></Col>
              <Col><Form.Control name="ltr2" size="lg" type="text" placeholder="N" value={answer.ltr2} onChange={handleInputChange} /></Col>
              <Col><Form.Control name="ltr3" size="lg" type="text" placeholder="I" value={answer.ltr3} onChange={handleInputChange} /></Col>
              <Col><Form.Control name='ltr4' size="lg" type="text" placeholder="E" value={answer.ltr4} onChange={handleInputChange} /></Col>
              <Col><Form.Control name='ltr5' size="lg" type="text" placeholder="D" value={answer.ltr5} onChange={handleInputChange} /></Col>
            </Row>
            <br/>
            <Row className="justify-content-md-center">
              {correct ? (
                <Link to="/office" className="btn btn-warning" size="lg">Next Puzzle</Link>
              ):(
                <Button type="submit">Submit</Button>
              )}
            </Row>
          </Form>

        </Card.Body>
        <Card.Footer className="text-muted">Enter the Passphrase</Card.Footer>
      </Card>
      <AuthTips title="Breached Passwords" cta="Learn more" url="https://auth0.com/breached-passwords">
        Did you know that Auth0 maintains a continuously-updated collection of breached credentials, with hundreds of millions of entries. With no code you can upgrade your login flow so User's get notified when they use a breached password.
      </AuthTips>
      <PictureModal show={modalShow} onHide={toggle} picture={'/paper.gif'} size="lg" />
    </Layout>
    </div>
  )
}

export default Library;