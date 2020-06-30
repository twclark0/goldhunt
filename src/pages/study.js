import React, {useState} from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "gatsby"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Layout from '../components/layout';
import PictureModal from '../components/PictureModal';
import AuthTips from '../components/AuthTips';

const puzzleAnswer = process.env.STUDY_ANSWER;
const Study = () => {
  const answers = {
    num0: "",
    num1: "",
    num2: "",
    num3: "",
    num4: "",
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
    const concanswer = Object.values(answer).join('')
    console.log(`You guessed ${concanswer}!`)
    setCorrect(concanswer === puzzleAnswer);
  }
  return (
    <div className = "background study">
    <Layout>
      <Card className="text-center mt-3" border="dark">
        <Card.Header>The Study</Card.Header>
        <Card.Body>
          <Card.Title>Two sides to every story</Card.Title>

          <Card.Text>
            Inside Vittorio's library, you get the sense that rarely does someone linger here. The books are used but the chairs aren't. The cleanest thing, asides from the books is the wall behind the staircase. What's that you see?
            <br/>
            <Button variant="light" size="sm" onClick={toggle}>Inspect Background</Button>
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
                <Link to="/pub" className="btn btn-warning" size="lg">Enter the Pub</Link>
              ):(
                <Button type="submit">Submit</Button>
              )}
            </Row>
          </Form>

        </Card.Body>
        <Card.Footer className="text-muted">Enter the 5-digit code</Card.Footer>
      </Card>
      <AuthTips title="Breached Passwords" cta="Learn more" url="https://auth0.com/breached-passwords">
        Did you know that Auth0 maintains a continuously-updated collection of breached credentials, with hundreds of millions of entries. With no code you can upgrade your login flow so User's get notified when they use a breached password.
      </AuthTips>
      <PictureModal show={modalShow} onHide={toggle} picture={'/study.gif'} size="xl" />
    </Layout>
    </div>
  )
}

export default Study;