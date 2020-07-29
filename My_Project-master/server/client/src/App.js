import React, { Component } from "react";
import "./App.css";
// import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from './HomePage';
import About from './About';
import Contact from './Contact';
import ParentsRegister from './ParentsRegister';
import VolunteersRegister from './VolunteersRegister'
import ParentsLogin from './ParentsLogin';
import VolunteersLogin from './VolunteersLogin';
import ChildrensCards from './ChildrensCards';
import ChildCard from './ChildCard';
import Logout from './Logout';
import Uploading from './Uploading';
import AllMenu from './AllMenu';
import ParentsMenu from "./ParentsMenu";
import VolunteersMenu from "./VolunteersMenu";
import AddChild from "./AddChild";
import AddWeeklyDiary from "./AddWeeklyDiary";
import ParentWeeklyDiary from "./ParentWeeklyDiary";
import 'bootstrap/dist/css/bootstrap.min.css';
import NOtFoundPage from "./NotFoundPage";
import VolunteersWeeklyDiarys from "./VolunteersWeeklyDiarys";



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parent: null, contact: null, volunteer: null, role: "", childrenList: [], cardChild: null, uploading: null,
      weeklyDiary: null, weeklyDiaryList: [], volunteerWeeklyDiary: null, volunteerWeeklyDiaryList: [],
    };
  }

  setParent = parent => {
    this.setState({ parent: parent })
  };

  setContact = contact => {
    this.setState({ contact: contact })
  }

  setUploading = uploading => {
    this.setState({ uploading: uploading })
  }

  setVolunteer = volunteer => {
    this.setState({ volunteer: volunteer })
  }

  setrole = role => {
    this.setState({ role: role })
  }

  setcardChild = cardChild => {
    this.setState({ cardChild: cardChild })
  }

  setchildrenList = childrenList => {
    this.setState({ childrenList: childrenList })
  }


  getchildrenList = () => {
    return this.state.childrenList
  }

  setweeklyDiary = weeklyDiary => {
    this.setState({ weeklyDiary: weeklyDiary })
  }

  setweeklyDiaryList = weeklyDiaryList => {
   this.setState({ weeklyDiaryList: weeklyDiaryList })
  }

  setvolunteerWeeklyDiary = volunteerWeeklyDiary => {
    this.setState({ volunteerWeeklyDiary: volunteerWeeklyDiary })
  }

  setvolunteerWeeklyDiaryList = volunteerWeeklyDiaryList => {
    this.setState({ volunteerWeeklyDiaryList: volunteerWeeklyDiaryList })
  }



  render() {
    

    let menu;
    switch (this.state.role) {

      case "parents":
        menu = <ParentsMenu />;
        break;
      case "volunteers":
        menu = <VolunteersMenu />;
        break
      default:
        menu = <AllMenu />;
        break
    }

    return (

      <BrowserRouter>

        <div className="App">
         

          <div className='A'><h1>הליכה משותפת</h1></div>

          {menu}

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/About" component={About} />
            <Route exact path="/Contact" render={() => <Contact setContact={this.setContact} />} />
            <Route exact path="/Parents/Register" render={() => <ParentsRegister setParent={this.setParent} />} />
            <Route exact path="/Parents/Login" render={() => <ParentsLogin setrole={this.setrole} setParent={this.setParent} parent={this.state.parent} />} />
            <Route exact path="/Parents/ChildCard" render={() => <ChildCard setrole={this.setrole} role={this.state.role} parent={this.state.parent} setchildrenList={this.setchildrenList} childrenList={this.state.childrenList} />} />
            <Route exact path="/Parents/AddChild" render={() => <AddChild role={this.state.role} setParent={this.setParent} parent={this.state.parent} cardChild={this.state.cardChild} setcardChild={this.setcardChild} setchildrenList={this.setchildrenList} childrenList={this.state.childrenList} />} />
            <Route exact path="/Parents/AddWeeklyDiary" render={() => <AddWeeklyDiary childrenList={this.state.childrenList} role={this.state.role} setParent={this.setParent} parent={this.state.parent} weeklyDiary={this.state.weeklyDiary} setweeklyDiary={this.setweeklyDiary} setweeklyDiaryList={this.setweeklyDiaryList} weeklyDiaryList={this.state.weeklyDiaryList} />} />
            <Route exact path="/Parents/WeeklyDiary" render={() => <ParentWeeklyDiary role={this.state.role} setParent={this.setParent} parent={this.state.parent} childrenList={this.state.childrenList}
              weeklyDiary={this.state.weeklyDiary} setweeklyDiary={this.setweeklyDiary} setweeklyDiaryList={this.setweeklyDiaryList} weeklyDiaryList={this.state.weeklyDiaryList}
              volunteerWeeklyDiary={this.state.volunteerWeeklyDiary} setvolunteerWeeklyDiary={this.setvolunteerWeeklyDiary} volunteerWeeklyDiaryList={this.state.volunteerWeeklyDiaryList} setvolunteerWeeklyDiaryList={this.setvolunteerWeeklyDiaryList} />} />

            <Route exact path="/Volunteers/WeeklyDiarys" render={() => <VolunteersWeeklyDiarys setchildrenList={this.setchildrenList} childrenList={this.state.childrenList} role={this.state.role} setParent={this.setParent} parent={this.state.parent}
              weeklyDiary={this.state.weeklyDiary} setweeklyDiary={this.setweeklyDiary} setweeklyDiaryList={this.setweeklyDiaryList} weeklyDiaryList={this.state.weeklyDiaryList}
              volunteerWeeklyDiary={this.state.volunteerWeeklyDiary} setvolunteerWeeklyDiary={this.setvolunteerWeeklyDiary} volunteerWeeklyDiaryList={this.state.volunteerWeeklyDiaryList} setvolunteerWeeklyDiaryList={this.setvolunteerWeeklyDiaryList} />} />

            <Route exact path="/Volunteers/Register" render={() => <VolunteersRegister setrole={this.setrole} setVolunteer={this.setVolunteer} volunteer={this.volunteer} />} />
            <Route exact path="/Volunteers/Login" render={() => <VolunteersLogin setrole={this.setrole} setVolunteer={this.setVolunteer} />} />
            <Route exact path="/Volunteers/ChildrensCards" render={() => <ChildrensCards role={this.state.role} setchildrenList={this.setchildrenList} childrenList={this.state.childrenList} />} />
            <Route exact path="/Volunteers/Register/Uploading" render={() => <Uploading role={this.state.role} setrole={this.setrole} setUploading={this.setUploading} setVolunteer={this.setVolunteer} volunteer={this.state.volunteer} />} />
            <Route exact path="/Logout" render={() => <Logout setrole={this.setrole} setParent={this.setParent} parent={this.state.parent} setVolunteer={this.setVolunteer} />} />
            <Route exact path="/*" component={NOtFoundPage} />

          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;







