console.log("app is loading");
const express = require("express");
const app = express();
const RouteHelper = require('./RouteHelper');

const multer  = require('multer');
const uploadDirectory = 'uploads/';

const upload = multer({ dest: uploadDirectory });


// used for json inside body 
app.use(express.json());


app.post("/parents/register", (req, res) => {
  RouteHelper.registerParents(req,res);
});

app.post("/parents/login", (req, res) => {
  RouteHelper.loginParents(req,res);
});

app.post("/volunteers/register", (req, res) => {
  RouteHelper.registerVolunteers(req,res);
});

app.post("/volunteers/login", (req, res) => {
  RouteHelper.loginVolunteers(req,res);
});

app.post("/contacts", (req, res) => {
  RouteHelper.contacts(req,res);
});

app.post("/childrens", (req, res) => {
  RouteHelper.addChild(req,res);
});

app.get("/childrens", (req, res) => {
  RouteHelper.showAllChildrens(req,res);
});

app.get("/child/:parentId", (req, res) => {
  RouteHelper.showChild(req,res,req.params.parentId);
});

// app.post("/volunteers/register/uploading", upload.single('Policeconfirmation'), (req, res) => {
//  console.log("root is accessed");

//  console.log(req.body.firstName);
//  console.log(req.body.lastName);
//  console.log(req.file);

//  res.status(201).send({body:req.body , file:req.file });
// });

app.post("/volunteers/register/uploading", upload.any(),(req, res) => {
  RouteHelper.uploading_documents(req, res);
});


app.post("/weekly_diary", (req, res) => {
  RouteHelper.addWeeklyDiary(req,res);
});

// app.get("/weekly_diary/:parentId", (req, res) => {
//   RouteHelper.showWeeklyDiary(req,res,req.params.parentId);
// });

app.get("/weekly_diary/:childId", (req, res) => {
  RouteHelper.showAllWeeklyDiary(req,res,req.params.childId);
});

app.post("/volunteer_weekly_diary", (req, res) => {
  RouteHelper.addVolunteerWeeklyDiary(req,res);
});

app.get("/volunteer_weekly_diary/:parentId", (req, res) => {
  RouteHelper.showVolunteerWeeklyDiary(req,res,req.params.parentId);
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});