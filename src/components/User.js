import React, { Component } from "react";


class User extends Component{
    render(){
        return(
            <div style={{paddingTop:'4%'}}>
                <p>{this.props.account}</p>
                <ul>
                <li>
                    Your purchased content appears here.
                </li>
                </ul>            
            </div>
        );
    }
}
export default User;