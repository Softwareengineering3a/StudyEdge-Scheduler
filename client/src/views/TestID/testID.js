import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class testID extends Component {
    render(){
        return(
            <main>
                <Redirect to={{
                    pathname: '/student',
                    state: { id: this.props.match.params.id }
                }}
                />
            </main>
        );
    }

}

export default testID;