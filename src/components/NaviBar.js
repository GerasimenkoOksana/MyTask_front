import React, {useState} from "react";
import {Navbar, Nav, Button, Modal, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import styled from 'styled-components';

const Styles = styled.div `
    a, .navbar-brand, .navbar-nav {
    color: #B0E0E6; text-decoration: none;
    &:hover{color:white}
    }
`
export default function NaviBar(isAuthenticated){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[form, setForm] = useState({
        email:'',
        password:''
    })
    const changeForm = event =>{
        form[event.target.name]=event.target.value
        console.log('form:', form)
    }
    const clearForm = () =>{
        setForm({ email: "", password:""})
    }
    const registerHandler = () =>{
        fetch("http://localhost:3030/api/auth/register",
        {
                 method: 'POST',
                 headers: {'Content-Type': 'application/json'},
                 body: JSON.stringify(form)
           })
        .then(response => response.json())
        .then(item => {
             console.log('res:',item)
        })
        .catch(err=> {console.log(err)});
    }
    return(
    <>
    <Styles>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand><Link to="/"> <img src="/images/logo.png" className="img-logo" alt=''/></Link>MyTasks </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link> <Link to="/">Home</Link></Nav.Link>
                    <Nav.Link><Link to="/tasks">My tasks</Link> </Nav.Link>
                </Nav>
                <Nav>
                    <Button variant="primary" className="mx-2" onClick={handleShow}> Log In </Button>
                    <Button variant="primary" className="mx-2">Register</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
        <Modal show={show} onHide={handleClose} onShow={clearForm}>
            <Modal.Header closeButton><Modal.Title>Log In</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="fromBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" onChange={changeForm} />
                        <Form.Text className="text-muted">We`ll never share your e-mail</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="fromBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={changeForm} />
                        <Form.Text className="text-muted">We`ll never share your password</Form.Text>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={registerHandler}>Register</Button>
                        <Button variant="primary">Login</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>

    </>
    )
}