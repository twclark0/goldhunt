import React, {useState} from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "gatsby"

import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import PictureModal from '../components/PictureModal';
import Layout from '../components/layout';

const puzzleAnswer = process.env.GATSBY_STUDY_ANSWER;
const Study = () => {
  const answers = {
    num0: "",
    num1: "",
    num2: "",
    num3: "",
    num4: "",
  }
  const alertBody = {
    show: false,
    content: "",
    heading: ""
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
    const concanswer = Object.values(answer).join('')
    setCorrect(concanswer === puzzleAnswer);
    setAlertShow(true);
  }
  return (
    <Layout
      title="Breached Passwords" 
      cta="Learn more" 
      url="https://auth0.com/breached-passwords"
      content="Did you know that Auth0 maintains a continuously-updated collection of breached credentials, with hundreds of millions of entries. With no code you can upgrade your login flow so User's get notified when they use a breached password.">
      <Alert show={alertShow} variant={correct ? 'success' : 'danger'} dismissible>
        <Alert.Heading>
          {correct ? (
            "Correct Guess"
          ) : (
            "Wrong Submission"
          )}
        </Alert.Heading>
        <p>
          {correct ? (
            "Brilliant code work! But you realize that code didn’t actually do anything and the shapes were just modern art. So you look around for the next layer of authentication..."
          ) : (
            "You realize brute force isn’t going to work on this one, but you decide to try again."
          )}
        </p>
      </Alert>
      <Card className="text-center mt-3" border="dark">
        <Card.Header>The Study</Card.Header>
        <Card.Body>
          <Card.Title>Two sides to every story</Card.Title>

          <Card.Text>
            As you step inside the mansion, you decide to start your journey in the library. Inside Vittorio's library, you get the sense that rarely does someone linger here. The books are used but the chairs are not. The cleanest thing aside from the books is the wall behind the staircase. What's that you see?
            <br/>
            <Button variant="secondary" size="sm" onClick={toggle}>Inspect Background</Button>
          </Card.Text>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col><Form.Control name="num0" size="lg" type="text" placeholder="0" value={answer.num0} onChange={handleInputChange} /></Col>
              <Col><Form.Control name="num1" size="lg" type="text" placeholder="_" value={answer.num1} onChange={handleInputChange} /></Col>
              <Col><Form.Control name="num2" size="lg" type="text" placeholder="0" value={answer.num2} onChange={handleInputChange} /></Col>
              <Col><Form.Control name="num3" size="lg" type="text" placeholder="-" value={answer.num3} onChange={handleInputChange} /></Col>
              <Col><Form.Control name='num4' size="lg" type="text" placeholder="0" value={answer.num4} onChange={handleInputChange} /></Col>
            </Row>
            <br/>
            <Row className="justify-content-md-center">
              {correct ? (
                <Link to="/pub" className="btn btn-warning" size="lg">Enter the Parlor</Link>
              ):(
                <Button type="submit">Submit</Button>
              )}
            </Row>
          </Form>

        </Card.Body>
        <Card.Footer className="text-muted">Enter the 5-digit code</Card.Footer>
      </Card>
      <PictureModal show={modalShow} onHide={toggle} picture={'/study.gif'} size="xl" />
      
    </Layout>
  )
}

export default Study;