import React, { Component } from 'react';
import "./Login.css"
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { BsFillPeopleFill } from "react-icons/bs";




class ParentsLogin extends Component {
    state = { email: '', password: '', redirectToHome: false, isError: false, };

    loginparents = () => {
        this.setState({ isError: false });
        axios.post('/parents/login', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {

            if (res.status === 200) {
                // res.data is parent
                this.setState({ redirectToHome: true })
                this.props.setParent(res.data);
                this.props.setrole("parents");
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
            this.loginparents();
            console.log('enter was clicked')
        }
    }

    render() {
        const disabled = !this.state.email || !this.state.password;


        if (this.state.redirectToHome) {
            return <Redirect to='/' />
        }

        return (
            <div className="ParentsLogin">
                <div className="Login">
                    <h6>התחברות הורים</h6>
                    <BsFillPeopleFill style={{ fontSize: "4rem" }} />

                    <input
                        onKeyPress={this.keyPressed}
                        onChange={(event) => {
                            this.setState({ email: event.target.value })
                        }} type='email' placeholder='אימייל'></input><br />

                    <input
                        onKeyPress={this.keyPressed}
                        onChange={(event) => {
                            this.setState({ password: event.target.value })
                        }} type="password" placeholder="סיסמא" ></input><br />

                    {this.state.isError ? <h4 style={{ color: 'red' }}> קיימת בעיה בהתחברות,תבדוק את המייל ואת הסיסמא</h4> : ""}


                    <button disabled={disabled} onClick={() => {
                        this.loginparents();
                    }} type="submit"> התחברות </button>
                </div>
            </div>
        );
    }
}

export default ParentsLogin;