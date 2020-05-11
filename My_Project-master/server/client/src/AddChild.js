import React, { Component } from 'react';
import axios from 'axios';
import "./AddChild.css";
// import { createBrowserHistory } from 'history'
// import { browserHistory } from 'react-router';
import { withRouter } from "react-router-dom"

class AddChild extends Component {

    state = {
        childName: '', childAddress: '', email: '', infoOnChild: "", contact: "", phone: "", parentId: "", redirectToHome: false, isError: false
    }

    componentDidMount() {
        this.checkRole();
    }

    checkRole() { /// ---- check the role and with correct role it let to inside the url 
        if (this.props.role === "parents") {
            console.log('yessss')
        }
        else {
            console.log("Noooo")
            this.props.history.push('/*'); /// ---- with the wrong role it send you to not found page
        }
    }

    creatcard = () => {
        this.setState({ isError: false });
        axios.post("/childrens", {
            childName: this.state.childName,
            childAddress: this.state.childAddress,
            email: this.state.email,
            infoOnChild: this.state.infoOnChild,
            contact: this.state.contact,
            phone: this.state.phone,
            parentId: this.props.parent._id

        }).then(res => {
            if (res.status === 201) {
                this.setState({ redirectToHome: true })
                this.props.setcardChild({
                    childName: this.state.childName,
                    childAddress: this.state.childAddress,
                    email: this.state.email,
                    infoOnChild: this.state.infoOnChild,
                    contact: this.state.contact,
                    phone: this.state.phone,
                    parentId: this.props.parent._id
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
            this.creatcard();
            console.log('enter was clicked')
        }
    }

    render() {
        // console.log(this.props.role);

        const disabled = !this.state.childName || !this.state.childAddress ||
            !this.state.email || !this.state.infoOnChild;

        if (this.state.redirectToHome) {
            return <div><h2 style={{ color: 'green' }}>The child card created</h2></div>
        }

        return (
            <div className="AddChild">
                <h3>מילוי פרטים לילדים</h3>

                <input className="AddChild1"
                    onKeyPress={this.keyPressed}
                    onChange={(event) => {
                        this.setState({ childName: event.target.value })
                    }} type='name' placeholder='שם מלא של הילד'></input><br />

                <input className="AddChild1"
                    onKeyPress={this.keyPressed}
                    onChange={(event) => {
                        this.setState({ childAddress: event.target.value })
                    }} type='name' placeholder=' כתובת מגורים מלאה'></input><br />

                <input className="AddChild1"
                    onKeyPress={this.keyPressed}
                    onChange={(event) => {
                        this.setState({ contact: event.target.value })
                    }} type='name' placeholder=' איש קשר: שם מלא'></input><br />

                <input className="AddChild1"
                    onKeyPress={this.keyPressed}
                    onChange={(event) => {
                        this.setState({ phone: event.target.value })
                    }} type='name' placeholder=' איש קשר: נייד'></input><br />

                <input className="AddChild1"
                    onKeyPress={this.keyPressed}
                    onChange={(event) => {
                        this.setState({ email: event.target.value })
                    }} type='email' placeholder='אימייל'></input><br />

                <input className="AddChild2"
                    onKeyPress={this.keyPressed}
                    onChange={(event) => {
                        this.setState({ infoOnChild: event.target.value })
                    }} type='text' placeholder="(ספר/י על הילד/ה (כגון מין,גיל,תחביבים"></input><br />

                {this.state.isError ? <p style={{ color: 'red' }}>creact card error</p> : ""}

                <button disabled={disabled} onClick={this.creatcard}> צור כרטיס ילד </button>
            </div>

        );
    }
}

export default withRouter(AddChild);