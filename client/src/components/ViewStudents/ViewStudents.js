import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));


class ViewStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: this.props.session,
            setOpen: false,
            openDia: false,
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClickClose = this.handleClickClose.bind(this);
        this.handleClickOpen = this.handleClickOpen

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
                openDia: false,
            });
            window.location.reload();
        //event.preventDefault();
    }

    handleClickClose = () => {
        window.location.reload(false);
        this.setState({
            setOpen: false
        });
    }

    handleOpen = (e) => {
        const open = this.state.setOpen;
        this.setState({ setOpen: !open });
    
    }

    handleClickOpen = () => {
         this.setState({
            openDia: true,
        });
    }

    render() {
        const students = this.state.session.students.map((element, index) =>
            <List className={useStyles.root}
                component="nav"
                aria-labelledby="nested-list-subheader"
                key={index}
               
            >
                 <Dialog
                    open={this.state.openDia}
                    onClose={this.handleClickClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this student?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClickClose} color="primary">Back</Button>
                        <Button onClick={e=>this.handleDelete(element[0])}>Delete</Button>
                    </DialogActions>
                </Dialog>

                <ListItem button onClick = {this.handleOpen} >
                  
                    <ListItemText>{element[1]} {element[2]} </ListItemText>
                    {/* {!this.setOpen ? <ExpandLess /> : <ExpandMore />} */}
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete"  onClick={this.handleClickOpen}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {console.log(this.setOpen)}
                <Collapse in={!this.setOpen} timeout="auto" unmountOnExit>
                    <List component="div" >
                        <ListItem>
                            <ListItemText>UF Email: {element[0]}</ListItemText>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemText>Preferred Email: {element[3]}</ListItemText>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemText>Phone Number: {element[4]}</ListItemText>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemText>Notes: {element[5]}</ListItemText>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </List>
                </Collapse>

            </List>
        )

        return (
            <Grid style={{ height: "100%", width: 425, maxHeight: 615, overflow: 'auto'   }}>
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
                     
                    >
                        {students}
                    </Grid>
                </Grid>
               
            </Grid>
        );
    }
}
export default ViewStudents;