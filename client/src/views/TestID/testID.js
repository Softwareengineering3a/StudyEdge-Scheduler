import React, { Component } from 'react';

class testID extends Component {
    render(){
        return(
            <main>
                <p>Hello</p>
                <div>
                    {this.props.match.params.id}
                </div>
            </main>
            
        );
    }

}

export default testID;