const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbName = 'walking_together';
const collectionParents = 'parents';
const collectionVolunteers = 'volunteers';
const collectionContacts = 'contacts';
const coolectionChildrens = 'childrens';
const collectionDocuments = 'uploading_documents'
const collectionWeekly_diary = 'weekly_diary'
const collectionvolunteer_weekly_diary = 'volunteer_weekly_diary'



function contacts(req, res) {
    console.log("/contacts is accessed");

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);
        // ----- expecting firstname, lastname , email , phone ...
        const queryContacts = req.body;
        dbo.collection(collectionContacts).insertOne(queryContacts, function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log("1 document inserted");
            res.sendStatus(201);
        });
    });
}

function uploading_documents(req, res) {
    console.log("/volunteers/register/uploading_documents is accessed");

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);
        // ----- expecting firstname, lastname , idimg , Policeconfirmation
        const queryDocuments = req.body;
        dbo.collection(collectionDocuments).insertOne(queryDocuments, function (err, result) {
            if (err) {
                res.status(500);
                return res.send; //(collectionDocuments);
            }
        });
    });
}

function loginParents(req, res) {
    console.log("/parents/login is accessed");

    MongoClient.connect(url, function (err, db) {

        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);
        // ----- expecting email , password
        const queryParents = req.body;
        console.log(queryParents);


        dbo.collection(collectionParents).findOne(queryParents, function (err, parent) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            if (parent) {
                //--- this is post but no document is created so return 200
                return res.status(200).send(parent);
            }

            // --- user not found
            return res.sendStatus(404);
        });
    });
}

function registerParents(req, res) {
    console.log("/parents/register is accessed");

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        const dbo = db.db(dbName);
        // ----- expecting email , password , ...
        const queryParents = req.body;
        dbo.collection(collectionParents).findOne({ email: queryParents.email }, function (err, parentFound) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            if (parentFound) {
                // -- email found and password matched
                return res.sendStatus(400);
            }

            // --- no email match -> insert user
            dbo.collection(collectionParents).insertOne(queryParents, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                res.sendStatus(201);
            });
        });
    });
}

function loginVolunteers(req, res) {
    console.log("/volunteers/login is accessed");

    MongoClient.connect(url, function (err, db) {

        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);
        // ----- expecting email , password
        const queryVolunteers = req.body;
        console.log(queryVolunteers);


        dbo.collection(collectionVolunteers).findOne(queryVolunteers, function (err, volunteer) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            if (volunteer) {
                //--- this is post but no document is created so return 200
                return res.status(200).send(volunteer);
            }

            // --- user nod found
            return res.sendStatus(404);
        });
    });
}

function registerVolunteers(req, res) {
    console.log("/volunteers/register is accessed");

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        const dbo = db.db(dbName);
        // ----- expecting email , password , ...
        const queryVolunteers = req.body;
        dbo.collection(collectionVolunteers).findOne({ email: queryVolunteers.email }, function (err, volunteerFound) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            if (volunteerFound) {
                // -- email found and password matched
                return res.sendStatus(400);
            }

            // --- no email match -> insert user
            dbo.collection(collectionVolunteers).insertOne(queryVolunteers, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }

                res.sendStatus(201);
            });
        });
    });
}

function addChild(req, res) {
    console.log("/addChild is accessed");

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);
        // ----- expecting child's firstname, child's lastname , child's address,parents email, info on child ...
        const queryChildrens = req.body;
        console.log(JSON.stringify(queryChildrens));
        dbo.collection(coolectionChildrens).insertOne(queryChildrens, function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log("1 document inserted");
            res.sendStatus(201);
        });
    });
}

function showAllChildrens(req, res) {
    console.log("/showCildrens is accessed");

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);

        dbo.collection(coolectionChildrens).find({}).toArray(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result)
                return res.send(result);
            }

            res.sendStatus(201);
        });
    });
}

function showChild(req, res, parentId) {
    console.log("/showChild is accessed");

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);

        // const queryChild = req.body.parentId;
        dbo.collection(coolectionChildrens).find({ parentId }).toArray(function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            else {
                console.log("****************")
                console.log(parentId)
                console.log(result)
                return res.send(result);
            }


            // res.sendStatus(201);
        });
    });
}

function addWeeklyDiary(req, res) {
    console.log("/weekly_diary is accessed");

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);
        // ----- expecting day, beginningtime ,endtime, note 
        const queryWeekly_diary = req.body;
        console.log(JSON.stringify(queryWeekly_diary));
        dbo.collection(collectionWeekly_diary).insertOne(queryWeekly_diary, function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log("1 document inserted");
            res.sendStatus(201);
        });
    });
}

function showWeeklyDiary(req, res, parentId) {
    console.log("/weekly_diary is accessed");

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);

        dbo.collection(collectionWeekly_diary).find({ parentId }).toArray(function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            else {
                console.log("****************")
                console.log(parentId)
                console.log(result)
                return res.send(result);
            }

        });
    });
}

function showAllWeeklyDiary(req, res, childId) {
    console.log("/showAllWeeklyDiary is accessed");

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);

        dbo.collection(collectionWeekly_diary).find({ childId }).toArray(function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            else {
                console.log("****************")
                console.log(childId)
                console.log(result)
                return res.send(result);
            }
        });
    });
}

function addVolunteerWeeklyDiary(req, res) {
    console.log("/volunteer_weekly_diary is accessed");

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);
        // ----- expecting beginningtime ,endtime, details 
        const queryWeekly_diary = req.body;
        console.log(JSON.stringify(queryWeekly_diary));
        dbo.collection(collectionvolunteer_weekly_diary).insertOne(queryWeekly_diary, function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log("1 document inserted");
            res.sendStatus(201);
        });
    });
}

function showVolunteerWeeklyDiary(req, res, parentId) {
    console.log("/weekly_diary is accessed");

    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        const dbo = db.db(dbName);

        dbo.collection(collectionvolunteer_weekly_diary).find({ parentId }).toArray(function (err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            else {
                console.log("****************")
                console.log(parentId)
                console.log(result)
                return res.send(result);
            }

        });
    });
}



module.exports.registerParents = registerParents;
module.exports.loginParents = loginParents;
module.exports.registerVolunteers = registerVolunteers;
module.exports.loginVolunteers = loginVolunteers;
module.exports.contacts = contacts;
module.exports.addChild = addChild;
module.exports.showAllChildrens = showAllChildrens;
module.exports.showChild = showChild;
module.exports.uploading_documents = uploading_documents;
module.exports.addWeeklyDiary = addWeeklyDiary;
module.exports.showWeeklyDiary = showWeeklyDiary;
module.exports.showAllWeeklyDiary = showAllWeeklyDiary;
module.exports.addVolunteerWeeklyDiary = addVolunteerWeeklyDiary;
module.exports.showVolunteerWeeklyDiary = showVolunteerWeeklyDiary;