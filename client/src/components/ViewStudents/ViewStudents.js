import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        this.handleOpen = this.handleOpen.bind(this);
        this.state = {
            session: this.props.session,
            setOpen: false
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

    handleOpen = () => {
        this.setState({
            setOpen: true,
        });
    }

    render() {
        const students = this.state.session.students.map((element, index) =>
            <List className={useStyles.root}
                component="nav"
                aria-labelledby="nested-list-subheader"
                key={index}
            >

                <ListItem button onClick={this.setOpen = true}>
                    <ListItemText primary={element[1]} />
                    {this.setOpen ? <ExpandLess /> : <ExpandMore />}
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete"  onClick={e=>this.handleDelete(element[0])}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>


                <Collapse in={this.handleOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem>
                            <ListItemText>First Name: {element[1]}</ListItemText>
                        </ListItem>

                        <ListItem>
                            <ListItemText>Last Name: {element[2]}</ListItemText>
                        </ListItem>

                        <ListItem>
                            <ListItemText>UF Email Address: {element[0]}</ListItemText>
                        </ListItem>

                        <ListItem>
                            <ListItemText>Preferred Email: {element[3]}</ListItemText>
                        </ListItem>

                        <ListItem>
                            <ListItemText>Phone Number: {element[4]}</ListItemText>
                        </ListItem>

                        <ListItem>
                            <ListItemText>Notes: {element[5]}</ListItemText>
                        </ListItem>

                    </List>
                </Collapse>

            </List>
        )

        return (
            <Grid style={{ height: "100%" }}>
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
                        button
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