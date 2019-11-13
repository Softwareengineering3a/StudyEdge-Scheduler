import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './CreateASession.css';


class CreateASession extends Component {
    render(){

        return (
            <main>
            <h1 class = "center" >
               Create a Session 
            </h1>
            <form autoComplete="off">
                <div>
                <h2>Session Title</h2>
                <TextField
                required
                id="standard-required"
                label="Required"
                defaultValue="Hello World"
                margin="normal"
                />
                </div>
                <div>
                <h2>Course</h2>
                  <TextField
                required
                id="standard-required"
                label="Required"
                defaultValue="Hello World"
                margin="normal"
                    />
                <h2>Location</h2>
                     <TextField
                required
                id="standard-required"
                label="Required"
                defaultValue="Hello World"
                margin="normal"
                    />
                </div>
            </form>
            <Button className = "center" variant="contained" color="primary">
                Confirm
            </Button>
            </main>
        )
    }
}
export default CreateASession;