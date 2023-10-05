const express = require("express");
const path = require('path')
const PORT = process.env.PORT || 8080;
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const register_route = require("./api/routes/register-api");
const login_route = require('./api/routes/login-api');
const profile_route = require('./api/routes/profile-api');
const reset_route = require('./api/routes/send-email-api');
const jobApplicationRouter = require('./api/routes/jobApplication')
const rootpath = "/api";
const course_route = require('./api/routes/course');
const course_schedule_route = require('./api/routes/courseSchedule');
const collaborator_route = require('./api/routes/collaborator');

app.use(cors());

app.use(express.static(path.resolve(__dirname, '../markit/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connection to MongoDB
const databaseURI = 'mongodb+srv://csci5709:Password01@cluster0.re83p.mongodb.net/markit?retryWrites=true&w=majority';
mongoose.connect(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT, () => {
        console.log('MongoDB connection is successful');
        console.log(`Server listening on ${PORT}`);
    }))
    .catch((err) => {
        res.status(500).json({ message: "Internal Server Error" });
    });

app.get("/ping-server", (req, res) => {
    res.json({ message: "Hello from NodeJS!" });
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../markit/build', 'index.html'));
});

app.use(rootpath + "/register", register_route);

app.use(rootpath + "/login", login_route);

app.use(rootpath + "/profile", profile_route);

app.use(rootpath + "/reset", reset_route);

app.use(rootpath+ "/jobApplication",jobApplicationRouter)

app.use(rootpath +'/course', course_route);

app.use(rootpath +'/schedule', course_schedule_route);

app.use(rootpath +'/collaborator', collaborator_route);
