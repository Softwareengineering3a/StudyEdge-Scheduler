import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class testID extends Component {
    //Gets student email when doing /login/[email address]
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