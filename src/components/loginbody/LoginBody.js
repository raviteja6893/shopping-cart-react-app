import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './LoginBody.css';
class LoginBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Username: '', Password: ''};
    
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    handleUsernameChange(event) {
        this.setState({Username: event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({Password: event.target.value});
    }    
    handleSubmit(event) {
        event.preventDefault();
        axios.get('http://localhost:8080/users/'+ this.state.Username).then((response)=>
        {   if(response.data.username===this.state.Username){
                if(response.data.password===this.state.Password){
                    this.props.history.push({
                        pathname:'/',
                        state: {username:this.state.Username}
                    })
                }else{
                    {console.log("Password Doesn't Match")};
                }
            }
        })
        .catch(error => {
            console.log("User Doesn't Exist");
        })
    }      
    
    render() { 
        return ( 
            <div class='body'>
                    <form onSubmit={this.handleSubmit}>
                    <label>
                        Username :
                        <input type="text" value={this.state.Username} onChange={this.handleUsernameChange}/> 
                    </label>
                    <label>
                        Password :
                        <input type="text" value={this.state.Password} onChange={this.handlePasswordChange}/>
                    </label>
                    <input type="submit" value="LOGIN" />
                </form>
            </div>
         );
    }
}
 
export default withRouter(LoginBody);