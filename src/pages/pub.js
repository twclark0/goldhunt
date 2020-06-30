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

const puzzleAnswer = (process.env.GATSBY_PUB_ANSWER).split("").map(x=>+x);

const Pub = () => {
  const [modalShow, setModalShow] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [answer, setAnswer] = useState([0,0,0,0,0,0,0,0,0]);

  const handleInputChange = event => {
    const target = event.target
    const value = target.checked ? 1 : 0
    const name = target.name
    const index = name.match(/\d+/)[0]
    setAnswer(answer, answer[index] =  value);
  }
  const toggle = () => {
    setModalShow(!modalShow)
  }
  const checkAnswerArray = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  const handleSubmit = event => {
    event.preventDefault();
    setCorrect(checkAnswerArray(answer, puzzleAnswer));
    console.log(checkAnswerArray(answer, puzzleAnswer))
  }
  return (
    <div className = "background pub">
    <Layout>
      <Card className="text-center mt-3" border="dark">
        <Card.Header>The Pub</Card.Header>
        <Card.Body>
          <Card.Title>Black and white</Card.Title>
          <Card.Text className="text-left">
            <Row>
              <Col sm={3}><Image src="/pub-box.gif" style={{ height: '180px' }} thumbnail /></Col>
              <Col sm={9}> A pub is a place for social vibrance and open laughter, not somewhere to hide things. So it's surprising to find a control box in the corner with a set of switches. Do these unlock the next door? What is the pattern?
                <hr/>
                <Button variant="light" size="sm" onClick={toggle}>Inspect the Room</Button>
              </Col>
            </Row>
            
          </Card.Text>

          <Form className="text-justify ml-5" onSubmit={handleSubmit}>
            <Row className="pt-4">
              <Col>
                <Form.Check 
                  type="switch"
                  id="switch0"
                  name="switch0"
                  label="Those"
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Check 
                  type="switch"
                  id="switch1"
                  name="switch1"
                  label="who"
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Check 
                  type="switch"
                  id="switch2"
                  name="switch2"
                  label="seek"
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="pt-3">
              <Col>
                <Form.Check 
                  type="switch"
                  id="switch3"
                  name="switch3"
                  label="my"
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Check 
                  type="switch"
                  id="switch4"
                  name="switch4"
                  label="treasure"
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Check 
                  type="switch"
                  id="switch5"
                  name="switch5"
                  label="have"
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <Row className="pt-3">
              <Col>
                <Form.Check 
                  type="switch"
                  id="switch6"
                  name="switch6"
                  label="nothing"
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Check 
                  type="switch"
                  id="switch7"
                  name="switch7"
                  label="to"
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Check 
                  type="switch"
                  id="switch8"
                  name="switch8"
                  label="gain"
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
            <br/>
            <Row className="justify-content-md-center">
              {correct ? (
                <Link to="/library" className="btn btn-warning" size="lg">Next Puzzle</Link>
              ):(
                <Button type="submit">Submit</Button>
              )}
            </Row>
          </Form>

        </Card.Body>
        <Card.Footer className="text-muted">Flip the switches.</Card.Footer>
      </Card>
      <AuthTips title="Secure access for everyone, but not just anyone." cta="Learn more" url="https://auth0.com/security">
        Auth0 understands that your customer's safety is top of mind. We've built a developer-first product that allows you to innovate on your onboarding flow without compromising security. We'll keep the locks up-to-date while you remodel the house :)
      </AuthTips>
      <PictureModal show={modalShow} onHide={toggle} picture={'./pub.gif'} size="xl" />
    </Layout>
    </div>
  )
}

export default Pub;