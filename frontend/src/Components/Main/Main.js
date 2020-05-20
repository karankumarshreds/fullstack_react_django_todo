import React, {Component} from 'react'
import axios from 'axios'
import Create from '../Create/Create'
import List from '../List/List'
import './Main.css'


class Main extends Component {
    state = {
        tasks: [
            {title: '', completed: false}

        ]
      };
    
    componentDidMount () {
    axios.get('http://localhost:8000/api/task-list/?format=json').then((res) => {
        this.setState({tasks: res.data});
    });
    }

    stateHandler = (data) => {
        this.setState((state) => {
            return {
                tasks: [...state.tasks, data]
            }
        })
    }

    taskUpdater = (title, id) => {
        let newList = this.state.tasks.map((el) => {
            if (el.id === id) {
                return {
                    ...el, title: title
                }
            } else {
                return el;
            } 
        });
        
        this.setState({tasks: newList});
        console.log(newList);
    }

    deleteHandler = (id) => {
        this.setState((state) => {
            return {
                tasks: state.tasks.filter((el) => {
                    return el.id != id;
                })
            }
        })
    }
   
    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    render() {
        const CSRFToken = this.getCookie('csrftoken');
        return (
            <div className="Main">
                <div className='container'> 
                        <Create
                            data={this.state.tasks}
                            CSRFToken={CSRFToken}
                            updateState={this.stateHandler}
                        /> 
                        <div className="listArea">
                            {this.state.tasks.map((each) => {
                                return (
                                    <List 
                                        className="Each"
                                        id={each.id}
                                        title={each.title}
                                        completed={each.completed}
                                        id={each.id}
                                        CSRFToken={CSRFToken}
                                        delete={this.deleteHandler}
                                        taskUpdater={this.taskUpdater}
                                    />
                                )
                            })}
                        </div>
                </div>
            </div>

        )
    }
}

export default Main;