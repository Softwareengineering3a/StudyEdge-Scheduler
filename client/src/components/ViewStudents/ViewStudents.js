import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

class ViewStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: this.props.session,
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);

    }

    handleDelete(student, event){
        axios.post('/studentdelete', {
            "session": this.state.session,
            "studentdelete": student,
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            });
        this.setState({
            setOpen: true,
        });
        //event.preventDefault();
    }

    handleClickClose = () => {
        window.location.reload(false);
        this.setState({
            setOpen: false,
        });
    }

    render() {
        const students = this.state.session.students.map((element,index) =>
        <Grid container
        direction="column"
        alignItems="center"
        justify = "center"
        spacing={5}
        style={{
        margin: 0,
        width: '100%',
        }}
        key = {index}>

       <Grid item
       style = {{width: '100%',height:"100%"}}>
        <Button variant="outlined" color="primary" style={{maxHeight: 600, width: 400}} onClick={e=>this.handleDelete(element[0])}>
            <Grid item>
                <Grid item>
                    <Grid>First Name: {element[1]}</Grid>
                    <Grid>Last Name: {element[2]}</Grid>
                    <Grid>UF Email Address: {element[0]}</Grid>
                    <Grid>Preferred Email: {element[3]}</Grid>
                    <Grid>Phone Number: {element[4]}</Grid>
                    <Grid>Notes: {element[5]}</Grid>
                </Grid>
            </Grid>
        </Button>
        </Grid>
        </Grid>
    )
    
        return (
            <Grid style={{height:"100%"}}>
                <Grid item>
                    <Grid container
                        direction="row"
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item>
                            <IconButton onClick={this.props.disableStudents} >
                                <ArrowBackIosIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4">
                                Students in Session
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item
                        style={{maxHeight: 615, overflow: 'auto'}}
                    > 
                        {students}
                    </Grid>
                </Grid>
                <Dialog
                    open={this.state.setOpen}
                    onClose={this.handleClickClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Student Deleted"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClickClose} color="primary">Ok</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        );
    }
}
export default ViewStudents;