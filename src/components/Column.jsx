import React from "react";
import {Container, Row, Col, Card, Button, Modal, Form} from "react-bootstrap";
import TaskList from "./TaskList";
import imgEdit from '../images/edit3.png';
import imgDel from '../images/del2.png';

const styleCard = {
    width: '18rem',
    backgroundColor: '#B0E0E6',
    borderRadius: '5px',
    marginBottom: '10px'
}
const styleCardTitle = {
    backgroundColor: '#4682B4',
    borderRadius: '5px'
}

export default class Column extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            isEdit: false,
            error: null,
            item: props.item
        }
    }

    onChange(element) {
        let item = this.state.item;
        item[element.target.name] = element.target.value;
        this.setState({item: item});
        console.log(element.target.name + "+" + this.state.item[element.target.name]);

    }

    render() {
        if (this.state.error) return this.renderError();
        if (!this.state.isLoaded) return this.renderLoading();
        if (this.state.item == null) return this.renderNewElement();
        return this.renderData();
    }

    openEditForm() {
        this.oldItem = JSON.stringify(this.state.item);
        if (this.state.item == null) {
            this.setState({
                item: {
                    name: "",
                    deadline: Date(),
                    tags: [],
                    isDone: false,
                    backColor: 'lightBlue'
                }
            })
        }
        this.setState({isEdit: true});

    }

    cancelEditForm() {
        this.setState({
           isEdit: false,
           item: JSON.parse(this.oldItem)
        });
        delete this.oldItem;
    }

    saveEditForm() {
        console.log("item: " + this.state.item);
        if (this.props.create) {
            this.props.create(this.state.item);
            this.setState({item: null})
        } else
            this.props.update(this.state.item);

        this.setState({
            isEdit: false
        });
        delete this.oldItem;
    }


// Предложить созать форму
    renderNewElement() {
        return (
            <Col key="CreateNewElement">
                <Card style={styleCard}>
                    <Card.Body>
                    <Card.Title style={styleCardTitle} onClick={this.openEditForm.bind(this)}>
                        &emsp;&emsp;+ add new column
                    </Card.Title>
                    </Card.Body>
                </Card>
            </Col>

        );
    }

    delete(){
        this.props.delete(this.props.item)

    }


// Вывод основного состояния компонента
    renderData() {
        return (
            <>
                <Col>
                    <Card style={styleCard}>
                        <Card.Body>
                            <Card.Title style={styleCardTitle}>
                                <Container style={{paddingRight: '0'}}>
                                    <Row>
                                        <div> {this.state.item.name}</div>
                                        <div style={{display: 'flex', justifyContent: 'end'}}>
                                            <Button style={{padding: '0'}} variant="outline-primary" size="sm"
                                                    onClick={this.openEditForm.bind(this)}><img src={imgEdit} alt="edit"/></Button>
                                            <Button style={{padding: '0'}} variant="outline-danger" size="sm"
                                                    onClick={this.delete.bind(this)}><img src={imgDel}
                                                                                          alt="del"/></Button>
                                        </div>
                                    </Row>
                                </Container>
                            </Card.Title>
                            <Card.Text>
                                <hr/>
                                <TaskList
                                    column_id={this.state.item._id}
                                    key={'CardListEl_' + this.state.item._id}/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Modal show={this.state.isEdit} onHide={this.cancelEditForm.bind(this)} key="modalEdit">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit column</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <input name="_id" type="hidden" value={this.state.item._id}/>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.cancelEditForm.bind(this)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.saveEditForm.bind(this)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }

// Компонент в состоянии загрузки
    renderLoading() {
        return (
            <Col>
                <Card style={styleCard}>
                    <Card.Body>
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

        )
    }

// Отображение компонента в состоянии ошибки
    renderError() {
        return (
            <Col>
                <Card style={styleCard}>
                    <Card.Body>
                        <div className="alert alert-danger" role="alert">
                            Error: {this.state.error.message}
                        </div>
                    </Card.Body>
                </Card>
            </Col>

        );
    }
}