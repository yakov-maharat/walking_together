import React, { Component } from 'react';
import './Contact.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
// import { MdSchedule } from "react-icons/md";
import axios from "axios";
import { FiPhone, FiAtSign } from 'react-icons/fi';

// import { Redirect } from 'react-router-dom';

class Contact extends Component {
    state = {
        fullName: '', email: '',
        phone: '', subject: '', redirectToHome: false, isError: false
    }

    contact = () => {
        this.setState({ isError: false });
        axios.post('/contacts', {
            fullName: this.state.fullName,
            email: this.state.email,
            phone: this.state.phone,
            subject: this.state.subject


        }).then(res => {
            if (res.status === 201) {
                this.setState({ redirectToHome: true })
                this.props.setContact({
                    fullName: this.state.fullName,
                    email: this.state.email,
                    phone: this.state.phone,
                    subject: this.state.subject
                });
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
            this.contact();
            console.log('enter was clicked')
        }
    }

    render() {
        const disabled = !this.state.fullName || !this.state.email || !this.state.phone || !this.state.subject

        if (this.state.redirectToHome) {
            return <h2 style={{ color: 'white' }}>Contact sended</h2>
        }

        return (
            <div className="Contact">

                <div className="whatsapp" >
                    <h5>ניתן ליצור קשר גם באמצעות</h5><br />
                    <a href="https://api.whatsapp.com/send?phone=972545954402">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" alt="" />
                    </a>

                </div>

                <div className="maatefer_two">
                    <div className="contact_us_maatefet">
                        <Card bg="dark" text="white">
                            <Card.Header >יצירת קשר עם יעקב:</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <FiPhone /> <br /> <br />  054-9065988 <br /><br />
                                    <FiAtSign /><br /> <br /> YakovMaharat@gmail.com<br />
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card bg="dark" text="white" >
                            <Card.Header>יצירת קשר עם שמחה:</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <FiPhone /><br></br><br></br>054-5954402 <br></br><br></br>
                                    <FiAtSign /><br></br><br></br> SimhaMahari@gmail.com<br></br><br></br>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>


                    <Form className="maatefet_form">
                        {/* <link href="https://fonts.googleapis.com/css?family=Amatic+SC&display=swap" rel="stylesheet"></link> */}
                        <p className="your_details"> השאירו פרטים ונחזור אליכם בהקדם!</p>

                        <Form.Group controlId="formBasicFullName" onChange={(event) => {
                            this.setState({ fullName: event.target.value })
                        }}>
                            <Form.Label >שם מלא:</Form.Label>
                            <Form.Control type="text" placeholder="שם פרטי ושם משפחה" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail" onChange={(event) => {
                            this.setState({ email: event.target.value })
                        }}>

                            <Form.Label> כתובת מייל:</Form.Label>
                            <Form.Control type="email" placeholder="אימייל" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPhone" onChange={(event) => {
                            this.setState({ phone: event.target.value })
                        }}>
                            <Form.Label>טלפון:</Form.Label>
                            <Form.Control type="number" placeholder="טלפון נייד" />
                        </Form.Group>

                        <Form.Group controlId="formBasicSubject" onChange={(event) => {
                            this.setState({ subject: event.target.value })
                        }}>
                            <Form.Label > תוכן הפניה:</Form.Label>
                            <Form.Control className="size_pnia" type="text" placeholder="תוכן ההודעה:" />
                        </Form.Group>

                        {this.state.isError ? <p style={{ color: 'red' }}>Contact error</p> : ""}

                        <Button className='buttonSend' disabled={disabled} onClick={this.contact}>
                            שלח
                    </Button>
                    </Form>
                </div>

            </div>
        );
    }
}


export default Contact;