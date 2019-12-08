import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';

class ViewStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: this.props.session,
        }
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
        <Button variant="outlined" color="primary" style={{maxHeight: 600, width: 400}}>
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
            </Grid>
        );
    }
}
export default ViewStudents;