import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./VolunteersWeeklyDiarys.css";
// import util from 'util';

class VolunteersWeeklyDiarys extends Component {
    state = {
        volunteerDays: [{}, {}, {}, {}, {}], parentId: "", redirectToHome: false, isError: false

    }

    componentDidMount() {
        this.checkRole();
        // this.showvolunteersWeeklyDiary();
    }

    checkRole() { /// ---- check the role and with correct role it let to inside the url 
        if (this.props.role === "volunteers") {
            console.log('yessss');
            this.showvolunteersWeeklyDiary();
        }
        else {
            console.log("Noooo")
            this.props.history.push('/*'); /// ---- with the wrong role it send you to not found page
        }
    }
    showvolunteersWeeklyDiary = () => {
        axios.get("/weekly_diary/" + this.props.childrenList[0]._id)//// להוסיף childId
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

    creatVolunteersWeeklyDiary = () => {
        this.setState({ isError: false });
        axios.post("/volunteer_weekly_diary", {
            volunteerDays: this.state.volunteerDays
            ,
            parentId: this.props.weeklyDiaryList[0].parentId


        }).then(res => {
            if (res.status === 201) {
                this.setState({ redirectToHome: true })
                this.props.setvolunteerWeeklyDiary({
                    volunteerDays: this.state.volunteerDays
                    ,
                    parentId: this.props.weeklyDiaryList[0].parentId
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

    render() {
        if (!this.props.weeklyDiaryList || this.props.weeklyDiaryList.length === 0) {
            return <h2>עדיין לא יצרו יומן שבועי לילדים </h2>
        }
        else {
            console.log(this.props.weeklyDiaryList);
        }

        if (this.state.redirectToHome) {
            return <div><h2 style={{ color: 'green' }}>השיבוץ שלך  התבצעה בהצלחה</h2></div>
        }

        const weeklyDiaryitems = this.props.weeklyDiaryList.map((weekly_Diary) =>
            <div key={weekly_Diary._id} className='weeklydiary'>

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>השאר פרטים(שם מלא+פלאפון)</th>
                            <th>?מה נוח לך</th>
                            <th>הערת ההורים</th>
                            <th> שעה </th>
                            <th> יום </th>
                            <th>שם הילד</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[0, 1, 2, 3, 4].map((index) =>
                            <tr key={index}>
                                <td>
                                    <textarea
                                        onChange={(event) => {
                                            let lastArry = [...this.state.volunteerDays]
                                            lastArry[index].details = event.target.value
                                            this.setState({ volunteerDays: lastArry })
                                        }} rows="4" cols="50"></textarea><br />
                                </td>
                                <td>
                                    <select defaultValue=""
                                        onChange={(event) => {
                                            let lastArry = [...this.state.volunteerDays]
                                            lastArry[index].beginningTime = event.target.value
                                            this.setState({ volunteerDays: lastArry })
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
                                    -
                                <select defaultValue=""
                                        onChange={(event) => {
                                            let lastArry = [...this.state.volunteerDays]
                                            lastArry[index].endTime = event.target.value
                                            this.setState({ volunteerDays: lastArry })
                                        }} >
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
                                    </select><br />
                                </td>
                                <td>{weekly_Diary.days[index] ? weekly_Diary.days[index].note : null}<br /></td>
                                <td>{weekly_Diary.days[index] ? weekly_Diary.days[index].beginningTime : null} - {weekly_Diary.days[index] ? weekly_Diary.days[index].endTime : null}<br /></td>
                                <td>{weekly_Diary.days[index] ? weekly_Diary.days[index].day : null}<br /></td>
                                <td>{weekly_Diary.days[index] ? weekly_Diary.days[index].childName : null}<br /></td>

                            </tr>
                        )}


                    </tbody>
                </Table>
                {this.state.isError ? <p style={{ color: 'red' }}>תקלה : השיבוץ שלך לא הצליח </p> : ""}
                < button onClick={() => {
                    this.creatVolunteersWeeklyDiary();
                }
                }> שבץ אותי </button >
            </div >
        );

        return (
            <div>
                {weeklyDiaryitems}
                {/* <button> שבץ אותי </button> */}
            </div>
        );
    }
}

export default withRouter(VolunteersWeeklyDiarys);