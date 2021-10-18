import React from 'react'
import {Form} from "react-bootstrap";

export const AuthPage = () =>{
    return(
       <div className="container">
            <Form className="formAuth">
                <Form.Group controlId="fromColumnName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" value={this.state.item.name} onChange={this.onChange.bind(this)}/>
                </Form.Group>
                <Form.Group controlId="fromColumnDeadLine">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control type="date" name="deadline" value={this.state.item.deadline} onChange={this.onChange.bind(this)}/>
                </Form.Group>
                <Form.Group controlId="fromColumnTags">
                    <Form.Label>Tags: words separated by a space </Form.Label>
                    <Form.Control type="text" name="tags" onChange={this.onChange.bind(this)}/>
                </Form.Group>
                <Form.Group className="mb-3"  controlId="fromColumnIsDone">
                    <Form.Check type="checkbox" name="isDone" label="Done" onChange={this.onChange.bind(this)}/>
                </Form.Group>
                <Form.Group controlId="fromColumnColor">
                    <Form.Control name = "backColor" type="color" title="choose you color" />
                </Form.Group>
            </Form>
       </div>
    )
}