import React from "react";
import {Row, Container} from "react-bootstrap";
import Column from "./Column";

const styleColumnList = {

}

export default class ColumnList extends React.Component {

    constructor(props) {
        super(props);
        //this.props.user_id .. user
        this.state = {
            isLoaded: false,
            error: null,
            items: [],
            activeColumn_Id: 0 // текущая открытая колонка
        };
    }


    componentDidMount() {
        this.Read();
    }

    Create(item){
       /* item.user_id = this.props.user_id;*/
        fetch("http://localhost:3030/api/column",
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(item)
            })
            .then(response => response.json())
            .then(item => {
                const items = this.state.items;
                items.push(item);
                this.setState({
                    isLoaded: true,
                    items: items
                });
            })
            .catch(err=> {this.setState ({error: err})});
    }

    Read (){
        console.log("Start get data:");
       // fetch("http://localhost:3030/api/column/" + this.props.user_id) // читать колонки текущего пользователя
        fetch("http://localhost:3030/api/column" ) // временно читать все колонки
            .then(response => response.json())
            .then(data => {
                console.log("getData:");
                console.log(data);
                this.setState({
                    isLoaded: true,
                    items: data
                });
            })
            .catch(err=> {this.setState ({error: err})});
    }

    Update(item) {
       // item.user_id = this.props.user_id;
        fetch("http://localhost:3030/api/column",
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(item)
            })
            .then(response => response.json())
            .then(item => {
                const items = this.state.items;
                items[items.indexOf(el=> el._id === item._id)] = item;
                this.setState({
                    isLoaded: true,
                    items: items
                });
            })
            .catch(err=> {this.setState ({error: err})});
    }

    Delete(item) {
        const items = this.state.items;
        console.log("Delete");
        console.log(item);
        items.splice(items.indexOf(item),1)
        this.setState({
            isLoaded: true,
            items: items
        });
        fetch("http://localhost:3030/api/column",
            {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(item)
            })
            .then(response => {})
            .then(item => {})
            .catch(err=> {this.setState ({error: err})});

    }

    render(){
        if(this.state.error) return this.renderError();
        if(!this.state.isLoaded) return this.renderLoading();
        return this.renderData();
    }


    renderData(){
        let column_list = <></>;
        if (this.state.items.length !==0)
            column_list = (
            this.state.items.map( column =>
                <Column
                    update={this.Update.bind(this)}
                    delete={this.Delete.bind(this)}
                    key={'columnItemEl_' + column._id} item={column}>
                </Column>
            )
        )
        return (
               <Row className={styleColumnList}>
                {column_list}
                <Column create={this.Create.bind(this)} key={"newColumnElement"} item={null}></Column>
               </Row>
        );
    }

    renderLoading(){
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only"> </span>
                </div>
            </div>
        )
    }

    renderError(){
        return (
            <div className="alert alert-danger" role="alert">
                Error: {this.state.error.message}
            </div>
        );
    }

}