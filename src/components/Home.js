import React from "react";
import Slider from "./Slider"
import { Container, Row, Col, Card, Button} from "react-bootstrap";
import imgCard1 from '../images/image5.jpg';
import imgCard2 from '../images/image7.jpg';
import imgCard3 from '../images/image6.jpg';

export const Home = () =>{
   return(
       <>
    <Slider/>
       <Container style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
          <Row>
             <Col>
                <Card style={{width: '18rem'}}>
                   <Card.Img variant="top" src={imgCard1}/>
                   <Card.Body>
                      <Card.Title>Easy start</Card.Title>
                      <Card.Text> Start planning now and you will see that it`s easy</Card.Text>
                      <Button variant="primary">start</Button>
                   </Card.Body>
                </Card>
             </Col>
             <Col>
                <Card style={{width: '18rem'}}>
                   <Card.Img variant="top" src={imgCard2}/>
                   <Card.Body>
                      <Card.Title>Combine</Card.Title>
                      <Card.Text> Combine tasks into lists (columns), create a list for the week, month</Card.Text>
                      <Button variant="primary">try</Button>
                   </Card.Body>
                </Card>
             </Col>

             <Col>
                <Card style={{width: '18rem'}}>
                   <Card.Img variant="top" src={imgCard3}/>
                   <Card.Body>
                      <Card.Title>Projects</Card.Title>
                      <Card.Text> Create your projects,fill it with tasks, mark completed</Card.Text>
                      <Button variant="primary">begin</Button>
                   </Card.Body>
                </Card>
             </Col>
          </Row>
       </Container>
       </>
   )
}