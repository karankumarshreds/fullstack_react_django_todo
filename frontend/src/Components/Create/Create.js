import React, {Component} from 'react'
import axios from 'axios'
import './Create.css'


class Create extends Component {

    state = {
        task : {
            title: '',
            completed: false
        }
    }


    // componentDidMount() {
    //     this.props.data.push(this.state.task);
    // }

    CreateHandler = (event) => {
        event.preventDefault();
        if(this.state.task.title){
            axios({
                method:'post',
                url:'http://localhost:8000/api/task-create',
                data: this.state.task,
                xsrfHeaderName: this.props.CSRFToken
            })
            .then((res) => {
                console.log(res.data);
            })
            this.props.updateState(this.state.task)
            this.setState(state => {
                return {
                    task: {
                        ...state.task, title: ''
                    }
                }
            })
        } else {
            alert(`Empty string can't be passed`);
        }     
    }

    ChangeHandler = (event) => {
        this.setState({
            task: {
                title: event.target.value
            }
        })
     }

    render() {
        return (
            <form onSubmit={this.CreateHandler.bind(this)}>
                <div className="header form-group">  
                    <input 
                    className="newItem form-control"
                    onChange={this.ChangeHandler.bind(this)}
                    value={this.state.task.title}
                    />
                    <button 
                        type="submit" 
                        class="saveButton btn ">
                            submit
                    </button>
                </div>
            </form>
        )
    }
}

export default Create;





