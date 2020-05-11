import React, { Component } from 'react';
import './Registration.css';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';

class ParentsRegister extends Component {

    state = {
        FirstName: '', LastName: '', ID: '', email: '',
        password: '', ConfirmPassword: '', Child: "", redirectToHome: false, isError: false
    }

    registerparents = () => {
        this.setState({ isError: false });
        axios.post('/parents/register', {
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            ID: this.state.ID,
            email: this.state.email,
            password: this.state.password,
            ConfirmPassword: this.state.ConfirmPassword,
            Child: this.state.Child
        }).then(res => {
            if (res.status === 201) {
                this.setState({ redirectToHome: true })
                this.props.setParent({
                    FirstName: this.state.FirstName,
                    LastName: this.state.LastName,
                    ID: this.state.ID,
                    email: this.state.email,
                    password: this.state.password,
                    ConfirmPassword: this.state.ConfirmPassword,
                    Child: this.state.Child
                });
            }
            else {
                this.setState({ isError: true });
                console.log(`error code: ${res.status}`);
            }

        }).catch(err => {
            this.setState({ isError: true })
            console.log(err);
        });
    };

    keyPressed = (event) => {
        if (event.key === "Enter") {
            this.registerparents();
            console.log('enter was clicked')
        }
    }

    render() {
        const disabled = !this.state.FirstName || !this.state.LastName || !this.state.ID
            || !this.state.email || !this.state.password || !this.state.ConfirmPassword;

        if (this.state.redirectToHome) {
            return <h2 style={{ color: 'green' }}>Register successful</h2>
        }

        return (
            <div>
                <h1 className="RegistrationTitel">רישום הורים</h1>
                <div className="Registration">

                    <div className='FullName'>
                        <input
                            onKeyPress={this.keyPressed}
                            onChange={(event) => {
                                this.setState({ FirstName: event.target.value })
                            }} type='name' placeholder='שם פרטי'></input>

                        <input
                            onKeyPress={this.keyPressed}
                            onChange={(event) => {
                                this.setState({ LastName: event.target.value })
                            }} type='name' placeholder='שם משפחה'></input><br />
                    </div><br></br>

                    <input
                        onKeyPress={this.keyPressed}
                        onChange={(event) => {
                            this.setState({ ID: event.target.value })
                        }} type='Number' placeholder='תעודת זהות'></input><br />

                    <input
                        onKeyPress={this.keyPressed}
                        onChange={(event) => {
                            this.setState({ email: event.target.value })
                        }}
                        type='email' placeholder='אימייל'></input><br />

                    <input
                        onKeyPress={this.keyPressed}
                        onChange={(event) => {
                            this.setState({ password: event.target.value })
                        }} type='password' placeholder='סיסמא'></input><br />

                    <input
                        onKeyPress={this.keyPressed}
                        onChange={(event) => {
                            this.setState({ ConfirmPassword: event.target.value })
                        }} type='password' placeholder='חזור שנית על הסיסמא'></input><br />

                    {this.state.isError ? <p style={{ color: 'red' }}>Register error</p> : ""}

                    <button disabled={disabled} onClick={this.registerparents}> סיום </button>
                </div>
            </div>
        );
    }
}

export default ParentsRegister;