import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import axios from 'axios';


class adminlogin extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            username: 'admin',
            password: '',
        }


    }

    handleSubmit(e){
        const { username, password } = this.state;

        axios.post('http://localhost:5000/auth/login', { username, password })
        .then((result) => {
          localStorage.setItem('jwtToken', result.data.token);
          this.props.history.push('/admin')
        })
        .catch((error) => {
          if(error.response.status === 401) {
            //this.setState({ message: 'Login failed. Username or password not match' });
          }
        });
    }    

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(name, value);
    }

    render(){
        return(
            <main>
                <div className="center">
                    <h2>Login:</h2>
                    <Grid item>
                        <TextField
                            required
                            id="standard-required"
                            label="Password"
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            value={this.state.location}
                        />
                    </Grid>
                    <Grid item >
                        <Button type="submit" variant="contained" color="secondary" onClick={this.handleSubmit}>Enter</Button>
                    </Grid>

                </div>
            </main>
        );
    }

}

export default adminlogin;

//Source: https://www.djamware.com/post/5a90c37980aca7059c14297a/securing-mern-stack-web-application-using-passport#install-express