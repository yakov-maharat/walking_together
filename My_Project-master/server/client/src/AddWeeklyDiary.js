import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./AddWeeklyDiary.css"


class AddWeeklyDiary extends Component {
    state = { days: [{}, {}, {}, {}, {}], parentId: "" ,childId:"", redirectToHome: false, isError: false }

    componentDidMount() {
        // this.checkRole();
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

    creatWeeklyDiary = () => {
        this.setState({ isError: false });
        axios.post("/weekly_diary", {
            days: this.state.days,
            parentId: this.props.parent._id,
            childId: this.props.childrenList[0]._id
            


        }).then(res => {
            if (res.status === 201) {
                this.setState({ redirectToHome: true })
                this.props.setweeklyDiary({
                    days: this.state.days,
                    parentId: this.props.parent._id,
                    childId: this.props.childrenList[0]._id

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
            this.creatWeeklyDiary();
            console.log('enter was clicked')
        }
    }

    render() {


        if (this.state.redirectToHome) {
            return <div><h2 style={{ color: 'green' }}>The weekly_diary created</h2></div>
        }

        return (
            <div className="table">
                <h1>Create  Weekly Diary </h1>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>הערות</th>
                            <th>שעת סיום </th>
                            <th>שעת התחלה </th>
                            <th>יום</th>
                            <th>שם הילד</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <textarea onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[0].note = event.target.value
                                        this.setState({ days: lastArry })
                                    }} rows="4" cols="50"></textarea>
                            </td>
                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[0].endTime = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option>שעת סיום</option>
                                    <option>16:00</option>
                                    <option>16:30</option>
                                    <option>17:00</option>
                                    <option>17:30</option>
                                    <option>18:00</option>
                                    <option>18:30</option>
                                    <option>19:00</option>
                                    <option>19:30</option>
                                    <option>20:00</option>
                                </select>
                            </td>
                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[0].beginningTime = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option>שעת התחלה</option>
                                    <option>16:00</option>
                                    <option>16:30</option>
                                    <option>17:00</option>
                                    <option>17:30</option>
                                    <option>18:00</option>
                                    <option>18:30</option>
                                    <option>19:00</option>
                                    <option>19:30</option>
                                    <option>20:00</option>
                                </select>
                            </td>
                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[0].day = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option value="" >תבחר יום רצוי</option>
                                    <option value="יום ראשון">יום ראשון</option>
                                    <option value="יום שני">יום שני</option>
                                    <option value="יום שלישי">יום שלישי</option>
                                    <option value="יום רביעי">יום רביעי</option>
                                    <option value="יום חמישי">יום חמישי</option>
                                </select>
                            </td>
                            <td>
                                <input type='text' placeholder='שם מלא של הילד'
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[0].childName = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <textarea onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[1].note = event.target.value
                                        this.setState({ days: lastArry })
                                    }} rows="4" cols="50"></textarea>
                            </td>

                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[1].endTime = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option>שעת סיום</option>
                                    <option>16:00</option>
                                    <option>16:30</option>
                                    <option>17:00</option>
                                    <option>17:30</option>
                                    <option>18:00</option>
                                    <option>18:30</option>
                                    <option>19:00</option>
                                    <option>19:30</option>
                                    <option>20:00</option>
                                </select>
                            </td>
                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[1].beginningTime = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option>שעת התחלה</option>
                                    <option>16:00</option>
                                    <option>16:30</option>
                                    <option>17:00</option>
                                    <option>17:30</option>
                                    <option>18:00</option>
                                    <option>18:30</option>
                                    <option>19:00</option>
                                    <option>19:30</option>
                                    <option>20:00</option>
                                </select>
                            </td>
                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[1].day = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option value="" >תבחר יום רצוי</option>
                                    <option value="יום ראשון">יום ראשון</option>
                                    <option value="יום שני">יום שני</option>
                                    <option value="יום שלישי">יום שלישי</option>
                                    <option value="יום רביעי">יום רביעי</option>
                                    <option value="יום חמישי">יום חמישי</option>
                                </select>
                            </td>
                            <td>
                                <input type='text' placeholder='שם מלא של הילד'
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[1].childName = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <textarea onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[2].note = event.target.value
                                        this.setState({ days: lastArry })
                                    }} rows="4" cols="50"></textarea>
                            </td>

                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[2].endTime = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option>שעת סיום</option>
                                    <option>16:00</option>
                                    <option>16:30</option>
                                    <option>17:00</option>
                                    <option>17:30</option>
                                    <option>18:00</option>
                                    <option>18:30</option>
                                    <option>19:00</option>
                                    <option>19:30</option>
                                    <option>20:00</option>
                                </select>
                            </td>
                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[2].beginningTime = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option>שעת התחלה</option>
                                    <option>16:00</option>
                                    <option>16:30</option>
                                    <option>17:00</option>
                                    <option>17:30</option>
                                    <option>18:00</option>
                                    <option>18:30</option>
                                    <option>19:00</option>
                                    <option>19:30</option>
                                    <option>20:00</option>
                                </select>
                            </td>
                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[2].day = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option value="" >תבחר יום רצוי</option>
                                    <option value="יום ראשון">יום ראשון</option>
                                    <option value="יום שני">יום שני</option>
                                    <option value="יום שלישי">יום שלישי</option>
                                    <option value="יום רביעי">יום רביעי</option>
                                    <option value="יום חמישי">יום חמישי</option>
                                </select>
                            </td>
                            <td>
                                <input type='text' placeholder='שם מלא של הילד'
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[2].childName = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <textarea onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[3].note = event.target.value
                                        this.setState({ days: lastArry })
                                    }} rows="4" cols="50"></textarea>
                            </td>

                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[3].endTime = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option>שעת סיום</option>
                                    <option>16:00</option>
                                    <option>16:30</option>
                                    <option>17:00</option>
                                    <option>17:30</option>
                                    <option>18:00</option>
                                    <option>18:30</option>
                                    <option>19:00</option>
                                    <option>19:30</option>
                                    <option>20:00</option>
                                </select>
                            </td>
                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[3].beginningTime = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option>שעת התחלה</option>
                                    <option>16:00</option>
                                    <option>16:30</option>
                                    <option>17:00</option>
                                    <option>17:30</option>
                                    <option>18:00</option>
                                    <option>18:30</option>
                                    <option>19:00</option>
                                    <option>19:30</option>
                                    <option>20:00</option>
                                </select>
                            </td>
                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[3].day = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option value="" >תבחר יום רצוי</option>
                                    <option value="יום ראשון">יום ראשון</option>
                                    <option value="יום שני">יום שני</option>
                                    <option value="יום שלישי">יום שלישי</option>
                                    <option value="יום רביעי">יום רביעי</option>
                                    <option value="יום חמישי">יום חמישי</option>
                                </select>
                            </td>
                            <td>
                                <input type='text'placeholder='שם מלא של הילד'
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[3].childName = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <textarea
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[4].note = event.target.value
                                        this.setState({ days: lastArry })
                                    }} rows="4" cols="50"></textarea>
                            </td>

                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[4].endTime = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option>שעת סיום</option>
                                    <option>16:00</option>
                                    <option>16:30</option>
                                    <option>17:00</option>
                                    <option>17:30</option>
                                    <option>18:00</option>
                                    <option>18:30</option>
                                    <option>19:00</option>
                                    <option>19:30</option>
                                    <option>20:00</option>
                                </select>
                            </td>
                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[4].beginningTime = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option>שעת התחלה</option>
                                    <option>16:00</option>
                                    <option>16:30</option>
                                    <option>17:00</option>
                                    <option>17:30</option>
                                    <option>18:00</option>
                                    <option>18:30</option>
                                    <option>19:00</option>
                                    <option>19:30</option>
                                    <option>20:00</option>
                                </select>
                            </td>
                            <td>
                                <select defaultValue=""
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[4].day = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                    <option value="" >תבחר יום רצוי</option>
                                    <option value="יום ראשון">יום ראשון</option>
                                    <option value="יום שני">יום שני</option>
                                    <option value="יום שלישי">יום שלישי</option>
                                    <option value="יום רביעי">יום רביעי</option>
                                    <option value="יום חמישי">יום חמישי</option>
                                </select>
                            </td>
                            <td>
                                <input type='text' placeholder='שם מלא של הילד'
                                    onKeyPress={this.keyPressed}
                                    onChange={(event) => {
                                        let lastArry = [...this.state.days]
                                        lastArry[4].childName = event.target.value
                                        this.setState({ days: lastArry })
                                    }}>
                                </input>
                            </td>
                        </tr>

                    </tbody>
                </Table>

                {this.state.isError ? <p style={{ color: 'red' }}>creact weekly_diary error</p> : ""}
                <button onClick={() => {
                    this.creatWeeklyDiary();
                }} >עידכון השעות השבועי</button>
            </div >
        );
    }
}

export default withRouter(AddWeeklyDiary);