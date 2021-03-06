import React from "react";
import {Row, Button, Card} from "react-bootstrap";
import imgEdit from '../images/edit3.png';
import imgDel from '../images/del2.png';
import '../App.css';

export default class Task extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            isEdit: false,
            error: null,
            item: props.item
        };
    }

    onChange (element){
        const item = this.state.item;
        item[element.target.name] = element.target.value;
        this.setState({item: item});
    }

    render(){
        if(this.state.error) return this.renderError(); // Если ошибка - вывожу ее
        if(!this.state.isLoaded) return this.renderLoading(); // Загружаюсь
        if(this.state.isEdit) return this.renderForm();
        if(this.state.item == null) return this.renderNewElement();
        return this.renderData();
    }

    openEditForm (){
        this.oldItem = JSON.stringify(this.state.item);
        if ( this.state.item == null) // Если у меня создание нового - то делаю чистый
        {
            this.setState({
                item: {
                    name: "",
                    deadline: Date(),
                    description: "",
                    tags: [],
                    isDone: false
                }
            })
        }
        this.setState({isEdit: true});
    }

    cancelEditForm(){
        this.setState({
            isEdit: false,
            item:JSON.parse(this.oldItem)
        });
        delete this.oldItem;
    }

    saveEditForm(){
        if (this.props.create) {
            this.props.create(this.state.item);
            this.setState({item : null})
        }
        else
            this.props.update(this.state.item);

        this.setState({
            isEdit:false
        });
        delete this.oldItem;
    }

    renderForm(){
        return(
        <Row key="CreateNewElement">
            <Card>
                <Row className="row-cols-6">
                <input name="_id" type="hidden" value={this.state.item._id}/>
                <input className="col-8" name="name" type="text"
                       value={this.state.item.name}
                       onChange={this.onChange.bind(this)}/>
                <button type="button" className="btnCross" onClick={this.cancelEditForm.bind(this)}>&#10006; </button>
                <button type="button" className="btnOk" onClick={this.saveEditForm.bind(this)}>&#10004;</button>
                </Row>
            </Card>
        </Row>
        );
    }

    // Предложить созать форму
    renderNewElement(){
        return (
            <Row className="row-cols-6" key="CreateNewElement">
                <button className="btn-primary" onClick={this.openEditForm.bind(this)}>
                    +
                </button>
            </Row>
        );
    }

    delete(){
        this.props.delete(this.props.item)
    }

    // Вывод основного состояния компонента
    renderData(){
        return (
            <Row className="containerDrop" >
                <div className="cardDrug">
                <div className="card-body" style={{paddingRight: '0'}} >
                    {this.state.item.name}
                </div>
                <div style={{display: 'flex', justifyContent: 'end'}}>
                    <Button variant="outline-primary" style={{padding: '0'}} size="sm" onClick={this.openEditForm.bind(this)}><img src={imgEdit} alt="edit"/></Button>
                    <Button variant="outline-danger" style={{padding: '0'}} size="sm" onClick={this.delete.bind(this)}><img src={imgDel} alt="del"/></Button>
                </div>
                </div>
                <hr/>
            </Row>
        );
    }

    // Компонент в состоянии загрузки
    renderLoading(){
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        )
    }

    // Отображение компонента в состоянии ошибки
    renderError(){
        return (
            <div className="alert alert-danger" role="alert">
                Error: {this.state.error.message}
            </div>
        );
    }

}