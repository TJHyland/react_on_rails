import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import TodoForm from './components/todos/TodoForm.js';
import TodoList from './components/todos/TodoList.js';
import axios from 'axios';

class App extends Component {
  state = { todos: [] }

  // before render we run ths function
  componentDidMount() {
    // grab all the items
    axios.get('/api/items')
      .then( res => {
        this.setState({ todos: res.data })
      })
      .catch( err => {
        console.log(err)
      })
  }

  addItem = (name) => {
    // api call to add the item to the backend
    axios.post('/api/items', { name } )
      .then( res => {
        const { todos } = this.state
        this.setState({ todos: [...todos, res.data] })
      })
    // add to the state
  }

  updateTodo = (id) => {
    // api call to update the item in the backend
    // alternate route: '/api/items' + id
    axios.put(`/api/items/${id}`)
    .then(res => {
      const todos = this.state.todos.map( t => {
        if (t.id === id)
          return res.data
        return t
      })
      this.setState({ todos })
    })
    // update the state
  }

  deleteTodo = (id) => {
    // api call to delete in the backend
    axios.delete(`/api/items/${id}`)
    .then(res => {
      // remove item in the state
      const { todos } = this.state
      this.setState({ todos: todos.filter( t => t.id != id )})
    })
  }

  render() {
    const { todos } = this.state
    return(
      <Container>
        <TodoForm add={this.addItem} />
        <TodoList 
          todos={todos} 
          update={this.updateTodo} 
          deleteTodo={this.deleteTodo} />
      </Container>
    )
  }
}

export default App;
