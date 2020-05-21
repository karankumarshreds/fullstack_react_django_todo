import React, {Component} from 'react';
import './List.css';
import axios from 'axios'

class List extends Component {

    state = {
            task: {
                title: this.props.title, 
                completed: false, 
                id: ''
            }, 
            editing: false
    }

    EditHandler = (event) => {
        // this.setState({editing: true})
        this.setState(state => {
            return {
                ...state, editing: !state.editing
            }
        })
    }

    DeleteHandler = (event) => {
        // http://localhost:8000/api/task-delete/
        axios({
            method:'post',
            url:'http://localhost:8000/api/task-delete/'+`${this.props.id}`,
            xsrfHeaderName: this.props.CSRFToken
        })
        this.props.delete(this.props.id);
    }

    updateHandler(event) {
        event.persist();
        event.preventDefault();
        console.log(this.props.id)
        axios({
            method: 'post',
            url:'http://localhost:8000/api/task-update/'+`${this.props.id}`,
            data: this.state.task,
            xsrfHeaderName: this.props.CSRFToken
        })
        this.setState(state => {
            return {
                ...state, editing: !this.state.editing
            }
        })
        this.props.taskUpdater(this.state.task.title, this.props.id);
    }

    checkForChange(event) {
        event.persist();
        event.preventDefault();
        if(event.target.value !== this.state.task.title){
            //if there's a change in title while updating
            this.updateHandler(event);
        } 
        //if there's no change
        event.target.value = this.state.task.title;
        this.setState(state => {
            return {
                ...state, editing: !this.state.editing
            }
        })
    }

    changeHandler(event) {
        event.persist();
        this.setState(state => {
            return {
                ...state, task: {
                    ...state.task, title: event.target.value
                }
            }
        })
    }

    render() {
        let editing = this.state.editing;

        const updateForm = (
            <div className="updateFormContainer">
                <form 
                // onSubmit={this.updateHandler.bind(this)}
                onSubmit={this.checkForChange.bind(this)}
                className="updateForm"
                >
                    <input 
                    onChange={this.changeHandler.bind(this)}
                    defaultValue={this.props.title}
                    />
                    <button className="btn ">Save</button>
                </form>
                
            </div>
        );

        const item = (
            <div className="Task">
                <p className="mt-2 taskTitle">
                    {this.props.title}
                </p>

                <div className="Icons">
                    <svg className="Edit bi bi-pencil-square" 
                        width="1em" height="1em" 
                        viewBox="0 0 16 16" 
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={this.EditHandler.bind(this)}>

                        <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clip-rule="evenodd"/>

                    </svg>
                    <svg class="bi bi-x-square" 
                        width="1em" height="1em" 
                        viewBox="0 0 16 16" 
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={this.DeleteHandler.bind(this)}>

                        <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
                        <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                        <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>
                    </svg>
                </div>
            </div>
        );

        return(<div>
            { editing == true ?  updateForm : item }
        </div>            
        )

    }


}

export default List 