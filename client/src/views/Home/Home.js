import React from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';
import Calendar from 'react-calendar';

function Home() {
    return (
        <main>
            <div clasName="row">
                <div className="column1">
                    <Calendar />
                </div>
                <div className="column2">
                    <p>Side Panel</p>
                </div>
            </div>
        </main>
    );
}

export default Home;
