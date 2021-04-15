console.log("Run server 2 instead.")
return;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const cors = require('cors');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// app.use(cors)

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/quakka_forum', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const personsRequirement = require("./persons.js");
app.use("/api/persons", personsRequirement.routes);

const forumPostRequirement = require("./forumPosts.js");
app.use("/api/forum_posts", forumPostRequirement.routes);

app.listen(3000, () => console.log('Server listening on port 3000!'));