import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class TodoForm extends Component {
  state = { name: '' }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // add the item
    this.props.add(this.state.name)
    // reset to default value in the state
    this.setState({ name: '' })
  }

  render() {
    // destructuring below does these two steps
    // creates a shorthand, name = this.state.name
    //                     ^variable
    // can do this for multiple variables, whatever is inside {} seperated by commas
      // const name
      // name = this.state.name
    const { name } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input 
          label='Todo'
          placeholder="Add a todo"
          required
          name='name' //this is the column that we're adding
          value={name}
          onChange={this.handleChange}
        />

        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}

export default TodoForm;