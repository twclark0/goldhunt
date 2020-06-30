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

const puzzleAnswer = process.env.OFFICE_ANSWER || "fast";

const Office = () => {
  const [modalShow, setModalShow] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [answer, setAnswer] = useState("");

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
  }
  return (
    <div className = "background office">
    <Layout>
      <Card className="text-center mt-3" border="dark">
        <Card.Header>Vittorio's Office</Card.Header>
        <Card.Body>
          <Card.Title>A scrap, left out</Card.Title>
          <Card.Text> 
            Aww, the desk. Here lies many interesting clues. A chemistry set, a rotary phone, a note pad and a huge stack of compromised passwords. Vittorio hates to see such a waste of human potential as a poorly planned password. However he did seem to leave his own vulnerability behind... a small scrap of paper.
          </Card.Text>
          <hr/>
          <Button variant="light" size="sm" onClick={toggle}>Inspect the Scrap</Button>

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
    </div>
  )
}

export default Office;