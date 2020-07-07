import React, {useState, useEffect} from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "gatsby"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const zapierHook = process.env.ZAPIER_URL;
const apiKey = process.env.PRINTFECTION_KEY;

const Finish = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userData, setUserData] = useState(null);
  const [link, setLink] = useState("");

  useEffect(() => {

    const triggerLink = async () => {
      const api = await fetch('https://api.printfection.com/v2/orders', 
        {
          body: JSON.stringify({ campaign_id: 284773 }),
          method: 'POST',
          headers: {
            'Authorization': "Basic " + btoa(apiKey + ":"),
            'Content-Type': 'application/json'
          },
        }
      )
      return api.json();
    }

    const getLink = async () => {
      try {
        const lnk = await triggerLink();
        setLink(lnk.url);
      } catch (e) {
        console.log(e.message);
      }
    }

    getLink()
    // If you just hacked your own userMetadata, congrats you've won a special prize. Come find me at:
  }, []);

  return (
    <Container className={window.location.pathname.split("/").pop()}>
      <Row>
        <Col></Col>
        <Col xs={12} md={6}>
          <Card className="text-center mt-3" border="dark">
            <Card.Body>
              <Card.Title>
                <Image src="/gold.png" style={{width:200}} />
                <br/>
                Success!
              </Card.Title>

              <Card.Text>
                As you flee from Vittorio’s manor, you realize you’re not out of the woods yet, there are still two very important steps to ensure your escape:
                <br/>
                <Button className="mt-3" href="" variant="success">Tweet about your victory</Button> <br/>to let other treasure hunters know of your accomplishment.
                <br/>
                <Button className="mt-3" href={link} variant="warning">Order your free Auth0 tee-shirt</Button><br/> to commemorate your victory.
              </Card.Text>
            </Card.Body>
          </Card>
          <Alert className="mt-3" show="true" variant='success'>
            <Alert.Heading>
              What's next?
            </Alert.Heading>
            <p className="pt-3">On August 7th we’ll know which treasure hunters retrieved Vittorio’s Golden Tokens the fastest - the top 10 will be notified via email and will receive a $100 gift card.</p>

            <p>Curious about more things Auth0? <Button size="sm" variant="light" href="google.com">Request a meeting</Button> with an Auth0 Solution Engineer.</p>
          </Alert>
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  )
}

export default Finish;