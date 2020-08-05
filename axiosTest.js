import React from "react";

import axios from "axios";

export default class PersonList extends React.Component {
  state = {
    persons: [],
    name: "",
    id: "",
  };
  handleChangePost = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmitPost = (event) => {
    event.preventDefault();

    const user = {
      name: this.state.name,
    };

    axios
      .post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      const persons = res.data;
      this.setState({ persons });
    });
  }
  handleChange = (event) => {
    this.setState({ id: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${this.state.id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.persons.map((person) => (
            <li>{person.name}</li>
          ))}
        </ul>
        <div>
          <form onSubmit={this.handleSubmitPost}>
            <label>
              Person Name:
              <input type="text" name="name" onChange={this.handleChangePost} />
            </label>
            <button type="submit">Add</button>
          </form>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Person ID:
              <input type="text" name="id" onChange={this.handleChange} />
            </label>
            <button type="submit">Delete</button>
          </form>
        </div>
      </div>
    );
  }
}
