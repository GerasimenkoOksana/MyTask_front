import React from "react";
import {Container} from "react-bootstrap";

const Footer = () =>(
    <footer className="fixed-bottom">
    <Container fluid style={{backgroundColor: '#5F9EA0', color: 'black', bottom:'0'}}>
        <Container style={{display: 'flex', justifyContent: 'center', padding: '10px'}}>
            <h4> © 2021 Oksana Gerasymenko</h4>
        </Container>
    </Container>
    </footer>
 )

export default Footer;