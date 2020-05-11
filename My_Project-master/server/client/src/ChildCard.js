import React, { Component } from 'react';
import { Card } from "react-bootstrap";
import "./ChildCard.css";
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class ChildCard extends Component {
    state = {
        childrenList: [], redirectToDiary: false
    }
    componentDidMount() {
        this.checkRole();
    }

    checkRole() { /// ---- check the role and with correct role it let to inside the url 
        if (this.props.role === "parents") {
            console.log('yessss');
            this.showChildCard();
        }
        else {
            console.log("Noooo")
            this.props.history.push('/*'); /// ---- with the wrong role it send you to not found page
        }
    }

    showChildCard = () => {
        axios.get("/child/"+this.props.parent._id)
            .then((res) => {

                if (res.status === 200) {
                    this.props.setchildrenList(res.data)
                    this.props.setrole("parents");

                }
                else {
                    console.log(`error code: ${res.status}`);
                }

            }).catch(err => {
                console.log(err);
            });
    }

    function = () =>{
        this.setState({ redirectToDiary: true })
    }

    render() {

        if (!this.props.childrenList || this.props.childrenList.length === 0) {
            return <p>"לא נמצא כרטיס ילד , אנא צרו כרטיס לילד שלכם ע"י לחיצה בכפתור-"יצירת כרטיס ילד</p>
        }
        else {
            console.log(this.props.childrenList);
        }

        if (this.state.redirectToDiary) {
            return <Redirect to="/Parents/WeeklyDiary" />
        }

        const cardsitems = this.props.childrenList.map((childcard) =>
            <div key={childcard._id} className='childcard'>
                <Card bg="light">
                    <Card.Body>
                        <Card.Title><h2>{childcard.childName}</h2></Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">כתובת: {childcard.childAddress}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">איש קשר: {childcard.contact}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">פלא': {childcard.phone}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">{childcard.email} :מייל</Card.Subtitle> <br/>
                        <Card.Text>{childcard.infoOnChild}</Card.Text>
                        {/* <Card.Link href="/Parents/WeeklyDiary">יומן שבועי</Card.Link> */}
                    </Card.Body>
                </Card>
                <button onClick={() =>{
                       this.function();
                }}>יומן שבועי </button>
            </div>
        );

        return (
            <div>{cardsitems}</div>
        );
    }
}

export default withRouter(ChildCard);