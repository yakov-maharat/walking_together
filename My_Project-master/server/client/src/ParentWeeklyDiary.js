import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Table } from "react-bootstrap";

class ParentsWeeklyDiary extends Component {
    componentDidMount() {
        // this.checkRole();
        this.showParentsWeeklyDiary();
        this.showvolunteersWeeklyDiary();
    }

    checkRole() { /// ---- check the role and with correct role it let to inside the url 
        if (this.props.role === "parents") {
            console.log('yessss');
            this.showParentsWeeklyDiary();
        }
        else {
            console.log("Noooo")
            this.props.history.push('/*'); /// ---- with the wrong role it send you to not found page
        }
    }

    showParentsWeeklyDiary = () => {
        axios.get("/weekly_diary/" + this.props.childrenList[0]._id)
            .then((res) => {

                if (res.status === 200) {
                    this.props.setweeklyDiaryList(res.data)

                }
                else {
                    console.log(`error code: ${res.status}`);
                }

            }).catch(err => {
                console.log(err);
            });
    }

    showvolunteersWeeklyDiary = () => {
        // let url = "/volunteer_weekly_diary/" + this.props.parent._id;
        // console.log(url);
        axios.get("/volunteer_weekly_diary/" + this.props.parent._id)
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    this.props.setvolunteerWeeklyDiaryList(res.data)
                }
                else {
                    console.log(`error code: ${res.status}`);
                }

            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        if (!this.props.weeklyDiaryList || this.props.weeklyDiaryList.length === 0) {
            return <h2>לא נמצא יומן שבועי לילד , אנא ליצור אחד כזה ע"י לחיצה בכפתור "הוספת יומן שבועי" , תודה</h2>
        }
        else {
            console.log(this.props.weeklyDiaryList);
        }

        if (!this.props.volunteerWeeklyDiaryList|| this.props.volunteerWeeklyDiaryList.length === 0) {
            return <h2>אף מתנדב לא שיבץ את עצמו עדיין ביומן השבועי של הילד שלך</h2>
        }
        else {
            console.log(this.props.volunteerWeeklyDiaryList);
        }

        let parensWeeklyDiary = this.props.weeklyDiaryList[0];
        let volunteerDiary = this.props.volunteerWeeklyDiaryList[0].volunteerDays;
        const weeklyDiaryitems = // this.props.weeklyDiaryList.map((weeklyDiary, i) => {
            //volunteerDay = this.props.volunteerWeeklyDiaryList[i];
            <div className='weeklydiary'>

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>פרטי המתנדב</th>
                            <th>שעות ההתנדבות</th>
                            <th>הערת ההורים</th>
                            <th> שעה </th>
                            <th> יום </th>
                        </tr>
                    </thead>
                    <tbody>
                        {parensWeeklyDiary.days.map((weeklyDiary, i) =>

                            <tr key={i}>
                                <td>{volunteerDiary[i] ? volunteerDiary[i].details : null}</td>
                                <td>{volunteerDiary[i] ? volunteerDiary[i].beginningTime : null} - {volunteerDiary[i] ? volunteerDiary[i].endTime : null}</td>
                                <td>{weeklyDiary ? weeklyDiary.note : null}</td>
                                <td>{weeklyDiary ? weeklyDiary.beginningTime : null} - {weeklyDiary.endTime} </td>
                                <td>{weeklyDiary ? weeklyDiary.day : null}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

        return (
            <div>
                {weeklyDiaryitems};
            </div>
        );
    }
}

export default withRouter(ParentsWeeklyDiary);