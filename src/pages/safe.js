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

const puzzleAnswer = process.env.GATSBY_SAFE_ANSWER;

const Safe = () => {
  const answers = {
    num0: "",
    num1: "",
    num2: "",
    num3: ""
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
    setCorrect(concanswer === puzzleAnswer);
  }
  return (
    <div className = "background office">
    <Layout>
      <Card className="text-center mt-3" border="dark">
        <Card.Header>Vittorio's Desk</Card.Header>
        <Card.Body>
          <Card.Title>Crack the safe.</Card.Title>
          <Image src="/safe.gif" fluid />
          <br/>
          <Card.Text className="mt-3"> 
            The second you enter the code on the rotary phone, 333-2-777-8(FAST) a drawer from the desk pops out and you see the safe. There it is. Nothing fancy here, just a 4-number combo lock. The only odd thing you notice are the words "Nice one" engraved on the safe.
          </Card.Text>
          <hr/>
          <Button variant="light" size="sm" onClick={toggle}>Inspect the room</Button>
          <br/>

          <Form className="text-justify mt-3" onSubmit={handleSubmit}>
            <Row>
              <Col><Form.Control name="num0" size="lg" type="text" placeholder="left" value={answer.num0} onChange={handleInputChange} /></Col>
              <Col><Form.Control name="num1" size="lg" type="text" placeholder="right" value={answer.num1} onChange={handleInputChange} /></Col>
              <Col><Form.Control name="num2" size="lg" type="text" placeholder="left" value={answer.num2} onChange={handleInputChange} /></Col>
              <Col><Form.Control name="num3" size="lg" type="text" placeholder="right" value={answer.num3} onChange={handleInputChange} /></Col>
            </Row>
            <br/>
            <Row className="justify-content-md-center">
              {correct ? (
                <Link to="/collect" className="btn btn-success btn-block" size="lg">Congratulations! You win</Link>
              ):(
                <Button type="submit">Submit</Button>
              )}
            </Row>
          </Form>

        </Card.Body>
        <Card.Footer className="text-muted">Enter the 4-number combo</Card.Footer>
      </Card>
      <PictureModal show={modalShow} onHide={toggle} picture={'/office.png'} size="xl" />
    </Layout>
    </div>
  )
}

export default Safe;