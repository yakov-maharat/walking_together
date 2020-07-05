import React, { Component } from 'react';
import "./Login.css"
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class VolunteersLogin extends Component {
    state = { email: '', password: '', redirectToHome: false, isError: false, role: "volunteer" };

    loginvolunteers = () => {
        this.setState({ isError: false });
        axios.post('/volunteers/login', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {

            if (res.status === 200) {
                // res.data is user
                this.setState({ redirectToHome: true });
                this.props.setVolunteer(res.data);
                this.props.setrole("volunteers");
            }

            else {
                this.setState({ isError: true })
                console.log(`error code: ${res.status}`);
            }

        }).catch(err => {
            this.setState({ isError: true })
            console.log(err);
        });
    };

    keyPressed = (event) => {
        if (event.key === "Enter") {
            this.loginvolunteers();
            console.log('enter was clicked')
        }
    }

    render() {
        const disabled = !this.state.email || !this.state.password;


        if (this.state.redirectToHome) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <div className="Login">
                    <img src="./login.png" alt="" /><br></br>
                    <h6>התחברות מתנדבים</h6>

                    <input onKeyPress={this.keyPressed}
                        onChange={(event) => {
                            this.setState({ email: event.target.value })
                        }} type="UserName" placeholder='שם משתמש' ></input><br />

                    <input
                        onKeyPress={this.keyPressed}
                        onChange={(event) => {
                            this.setState({ password: event.target.value })
                        }} type="password" placeholder="סיסמא" ></input><br />

                    {this.state.isError ? <p style={{ color: 'red' }}>Login error</p> : ""}

                    <button disabled={disabled} onClick={() => {
                        this.loginvolunteers();
                    }} type="submit"> התחברות </button>
                </div>
            </div>
        );
    }
}

export default VolunteersLogin;