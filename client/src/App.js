import React, { Component } from "react";
import axios from 'axios'
import Typography from '@material-ui/core/Typography'

class App extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios.get('/users')
      .then((data) => {
        console.log(data.data.users);
        this.setState({ users: data.data.users });
      })
      .catch(error => console.log(error));
  }

  // showUsers = user => <Typography key={user.id}>{user.username}</Typography>

  render() {

    const { users } = this.state;

    return (
      <div>
        {
          users.map((user) => (
            <Typography key={user.id} > {user.firstname} {user.lastname}</Typography>
          ))
        }
      </div>
    );
  }
}

export default App;