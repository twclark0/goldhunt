import React, {useState} from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "gatsby"

import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Layout from '../components/layout';
import PictureModal from '../components/PictureModal';

const puzzleAnswer = process.env.GATSBY_OFFICE_ANSWER;

const Office = () => {
  const [modalShow, setModalShow] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [answer, setAnswer] = useState("");
  const [alertShow, setAlertShow] = useState(false);

  const handleInputChange = event => {
    const target = event.target
    const value = target.value
    setAnswer(value);
  }
  const toggle = () => {
    setModalShow(!modalShow)
  }
  const handleSubmit = event => {
    event.preventDefault();
    setCorrect(answer.toLowerCase() === puzzleAnswer);
    setAlertShow(true);
  }
  return (
    <Layout
      title="Built for developers, by developers." 
      cta="Dev tools this way -->"
      url="https://auth0.com/developers/"
      content="Whether you’re a developer looking to innovate or a security professional looking to mitigate, we make identity work for everyone."
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
            "The second you enter the code on the rotary phone, a drawer from the desk pops out and you see the safe."
          ) : (
            <p>Unfortunately the phone on his desk is an old rotary phone like 
              <a href="https://bit.ly/3e4j7D4" target="_blank"> this</a>.
            </p>
          )}
        </p>
      </Alert>
      <Card className="text-center mt-3" border="dark">
        <Card.Header>Vittorio's Desk</Card.Header>
        <Card.Body>
          <Card.Title>A scrap, left out</Card.Title>
          <Card.Text> 
            Ah, the desk. Here lies many interesting clues. A chemistry set, a rotary phone, a notepad and a huge stack of compromised passwords. Vittorio hates to see such a waste of human potential as a poorly planned password. However, he did seem to leave his own vulnerability behind... a small scrap of paper.
          </Card.Text>
          <hr/>
          <Button variant="secondary" size="sm" onClick={toggle}>Inspect the Scrap</Button>

          <Form className="text-justify mt-3" onSubmit={handleSubmit}>
            <Row>
              <Col><Form.Control name="ltr0" size="lg" type="text" placeholder="Hello there, who's this?" value={answer} onChange={handleInputChange} /></Col>
            </Row>
            <br/>
            <Row className="justify-content-md-center">
              {correct ? (
                <Link to="/safe" className="btn btn-warning" size="lg">Break the safe</Link>
              ):(
                <Button type="submit">Submit</Button>
              )}
            </Row>
          </Form>

        </Card.Body>
        <Card.Footer className="text-muted">Enter the Passphrase</Card.Footer>
      </Card>
      <PictureModal show={modalShow} onHide={toggle} picture={'/scrap.gif'} size="lg" />
    </Layout>
  )
}

export default Office;