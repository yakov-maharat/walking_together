import React, { Component } from 'react';
import './Uploading.css'
import axios from 'axios';
import { withRouter } from "react-router-dom"

class Uploading extends Component {
    state = { firstName: '', lastName: '', idimg: {}, Policeconfirmation: {}, isError: false, redirectToHome: false }

    componentDidMount() {
        // this.checkRole();
    }

    checkRole() { /// ---- check the role and with correct role it let to inside the url 
        if (this.props.role === "uploading") {
            console.log('yessss');
        }
        else {
            console.log("Noooo")
            this.props.history.push('/*'); /// ---- with the wrong role it send you to not found page
        }
    }

    registervolunteerssend = () => {
        this.setState({ isError: false });
        axios.post('/volunteers/register', {
            FirstName: this.props.volunteer.FirstName,
            LastName: this.props.volunteer.LastName,
            ID: this.props.volunteer.ID,
            email: this.props.volunteer.email,
            password: this.props.volunteer.password,
            ConfirmPassword: this.props.volunteer.ConfirmPassword
        }).then(res => {
            if (res.status === 201) {
                // this.uploading();
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

    uploading1 = () => {
        this.setState({ isError: false });
        let formData = new FormData();
        formData.append('firstname', this.state.firstName);
        formData.append('lastname', this.state.lastName);
        // formData.append('idimg', this.state.idimg);
        formData.append('Policeconfirmation', this.state.Policeconfirmation);

        const config = { headers: { "content-type": "multipart/form-data" } }

        axios
            .post('/volunteers/register/uploading', formData, config)
            .then(res => {
                if (res.status === 201) {
                    console.log("success");
                    console.log(res.data)
                }
                else {
                    console.log(`error status code: ${res.status}`);
                }
            })
            .catch(err =>
                console.log(err));
    };


    keyPressed = (event) => {
        if (event.key === "Enter") {
            this.registervolunteerssend();
            console.log('enter was clicked')
        }
    }

    render() {
        const disabled = !this.state.firstName ||
            !this.state.lastName
            // ||!this.state.idimg 
            || !this.state.Policeconfirmation;

        if (this.state.redirectToHome) {
            return <h2 style={{ color: 'white' }}>Uploading sended</h2>
        }

        return (
            <div className='Uploading_documents'>
                <div className='FristANDLast'>
                    <h5>שם פרטי</h5>
                    <input
                        onKeyPress={this.keyPressed}
                        onChange={(event) => {
                            this.setState({ firstName: event.target.value })
                        }}
                        type='text' placeholder='שם פרטי' required></input>

                    <h5>שם משפחה</h5>
                    <input
                        onKeyPress={this.keyPressed}
                        onChange={(event) => {
                            this.setState({ lastName: event.target.value })
                        }}
                        type='text' placeholder='שם משפחה' required></input>
                </div>
                <div className='documentIdAndPolice'>
                    {/* <h5>צילום ת"ז</h5>
                    <input onKeyPress={this.keyPressed}
                        onChange={(event) => {
                            this.setState({ idimg: event.target.files[0] })
                        }}
                        type="file" name="filename" required></input> */}

                    <h5>אישור משטרתי</h5>
                    <input
                        onKeyPress={this.keyPressed}
                        onChange={(event) => {
                            this.setState({ Policeconfirmation: event.target.files[0] })
                        }}
                        type="file" name="filename" required></input>
                </div>
                <br />

                {this.state.isError ? <p style={{ color: 'red' }}>Uploading error</p> : ""}

                <button disabled={disabled} onClick={() => {
                    this.uploading1();
                }}>שלח</button>
            </div>
        );
    }
}
export default withRouter(Uploading);





