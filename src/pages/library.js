import React, {useState} from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "gatsby"

import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
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
  const [alertShow, setAlertShow] = useState(false);

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
    setAlertShow(true);
  }
  return (
    <Layout
      title="Passwordless" 
      cta="Really? No Passwords?" 
      url="https://auth0.com/passwordless/"
      content="It’s clear that passwords are not fun anymore. According to the website haveibeenpwned.com, 220,385,281 accounts were exposed in the top 10 breaches, and 152,450,038 of them were compromised this past year. Remove the risk! Auth0 Passwordless is a drop-in authentication system based on Email or SMS, that improves security and user experience."
    >
      <Alert show={alertShow} variant={correct ? 'success' : 'danger'} dismissible onClick={() => setAlertShow(false)}>
        <Alert.Heading>
          {correct ? (
            "Correct Guess"
          ) : (
            "Wrong Submission"
          )}
        </Alert.Heading>
        <p>
          {correct ? (
            "“SECURE - very clever, Vittorio...” you think to yourself as you realize this was a clue meant to distract you from your main objective.  You press on."
          ) : (
            "Hmmm... you might want to think about all the possible combos."
          )}
        </p>
      </Alert>
      <Card className="text-center mt-3" border="dark">
        <Card.Header>The Bookshelf</Card.Header>
        <Card.Body>
          <Card.Title>Something missing</Card.Title>
          <Card.Text> Ahead the bookshelf looks disturbed. As you approach, one book is less dusty than the others-- you open it. What's this? An old newspaper clipping? What could this mean?</Card.Text>
          <hr/>
          <Button variant="secondary" size="sm" onClick={toggle}>Inspect the Paper</Button>
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
      <PictureModal show={modalShow} onHide={toggle} picture={'/paper.gif'} size="lg" />
    </Layout>
  )
}

export default Library;