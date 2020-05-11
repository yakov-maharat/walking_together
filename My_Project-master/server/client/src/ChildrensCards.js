import React, { Component } from 'react';
import axios from 'axios';
import { Card } from "react-bootstrap";
import "./ChildCard.css"
import { withRouter } from "react-router-dom"
import { Redirect } from 'react-router-dom';

class ChildrensCards extends Component {
    state = {
        childrenList: [], redirectToDiary: false
    }
    componentDidMount() {
        this.checkRole();
    }

    checkRole() { /// ---- check the role and with correct role it let to inside the url 
        if (this.props.role === "volunteers") {
            console.log('yessss');
            this.showChildrenAllCards();
        }
        else {
            console.log("Noooo")
            this.props.history.push('/*'); /// ---- with the wrong role it send you to not found page
        }
    }

    showChildrenAllCards = () => {
        axios.get("/childrens")
            .then((res) => {

                if (res.status === 200) {
                    this.props.setchildrenList(res.data)

                }
                else {
                    console.log(`error code: ${res.status}`);
                }

            }).catch(err => {
                console.log(err);
            });
    }

    function = () => {
        this.setState({ redirectToDiary: true })
    }

    render() {
        if (!this.props.childrenList || this.props.childrenList.length === 0) {
            return <h2>לא נמצאו כרטיסי ילדים , לאחר שההורים ייצרו תוכלו לראות את כל כרטיסי הילדים</h2>
        }
        else {
            console.log(this.props.childrenList);
        }

        if (this.state.redirectToDiary) {
            return <Redirect to="/Volunteers/WeeklyDiarys" />
        }

        const cardsitems = this.props.childrenList.map((childcard) =>
            <div key={childcard._id} className='childcard'>
                <Card bg="light" >
                    <Card.Body>
                        <Card.Title><h2>{childcard.childName}</h2></Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">כתובת: {childcard.childAddress}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">איש קשר: {childcard.contact}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">פלא': {childcard.phone}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">{childcard.email} :מייל</Card.Subtitle> <br />
                        <Card.Text>{childcard.infoOnChild}</Card.Text>
                        <button onClick={() => {
                            this.function();
                        }}>יומן שבועי </button>
                        {/* <Card.Link href="/Volunteers/WeeklyDiary">יומן שבועי</Card.Link> */}
                    </Card.Body>
                </Card>

            </div>
        );

        return (
            <div>{cardsitems}</div>
        );
    }
}

export default withRouter(ChildrensCards);