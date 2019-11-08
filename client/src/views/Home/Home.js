import React, {Component} from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';
import Calendar from 'react-calendar';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        };
    }

    dateUpdate(date){
        this.setState({date: date})
        if(date){
            console.log(date);
        }
    }

    render(){
        return (
            <main>
                <div className="row">
                    <div className="column1">
                        <div className="center">
                            <Calendar 
                                onChange={this.dateUpdate.bind(this)}
                                value={this.state.date}
                            />
                        </div>
                    </div>
                    <div className="column2">
                        <p className="center">Side Panel</p>
                    </div>
                </div>
            </main>
        );
    }
}

export default Home;
