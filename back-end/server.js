const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors)

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/quakka_forum', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

///// Schemes and Models /////

const personSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    gender: String,
    bio: String,
});
personSchema.virtual('id')
    .get(function() {
        return this._id.toHexString();
    });
personSchema.set('toJSON', {
    virtuals: true
});
const Person = mongoose.model('Person', personSchema);

const forumPostSchema = new mongoose.Schema({
    personId: String,
    comment: String,
    timeOfPost: Date,
    isOriginalPost: Boolean,
    responseTo: {
        type: mongoose.Schema.ObjectId,
        ref: 'ForumPost'
    }
});
forumPostSchema.virtual('id')
    .get(function() {
        return this._id.toHexString();
    });
forumPostSchema.set('toJSON', {
    virtuals: true
});
const ForumPost = mongoose.model('ForumPost', forumPostSchema);

// //// Test ////
// async function test() {
//     const person = new Person({
//         name: "Luke Skywalker",
//         email: "Send a message with ghost Obi-One",
//         age: "25",
//         gender: "Male",
//         bio: "I'm a Jedi. If Rey can choose her own parentage, then so can I!",
//     });
//     try {
//         await person.save();
//         console.log("\n\n\n", person, "\n\n\n")
//     } catch (error) {
//         console.log("\n\n\n", error, "\n\n\n")
//     }
// }
// test()


///// CRUDs /////

/// Person ///

// Create
app.post('/api/persons', async (req, res) => {
    console.log("\n\n\n", "Received Create Person", req.body, "\n\n\n")
    const person = new Person({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        bio: req.body.bio,
    });
    try {
        await person.save();
        res.send(person);
        console.log("\n\n\n", person, "\n\n\n")
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Update
app.put('/api/persons/:personId', async (req, res) => {
    try {
        let person = await Person.findOne({_id:req.params.personId});
        if (!person) {
            res.send(404);
            return;
        }
        person.name = req.body.name;
        person.email = req.body.email;
        person.age = req.body.age;
        person.gender = req.body.gender;
        person.bio = req.body.bio;

        await person.save();
        res.send(person);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Delete
app.delete('/api/persons/:personId', async (req, res) => {
    try {
        let person = await Person.findOne({_id:req.params.personId});
        if (!person) {
            res.send(404);
            return;
        }
        //TODO: Delete all of the person's posts

        // Delete the person
        await person.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get Person
app.get('/api/persons/:personId', async (req, res) => {
    try {
        let person = await Person.findOne({_id:req.params.personId});
        res.send(person);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get List of Persons
app.get('/api/persons', async (req, res) => {
    console.log("Getting All Persons")
    try {
        let persons = await Person.find();
        res.send(persons);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

/// ForumPost ///

// Create
app.post('/api/forum_posts', async (req, res) => {
    // Get Post that is being responded to.
    let responseToPost = null
    if (req.body.responseToPostId == null) {
        try {
            responseToPost = await Project.findOne({_id: req.body.responseToPostId});
            if (!responseToPost) {
                res.send(404);
                return;
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
    // Make Post
    const forumPost = new ForumPost({
        personId: req.body.personId,
        comment: req.body.comment,
        timeOfPost: req.body.timeOfPost,
        // isOriginalPost: req.body.isOriginalPost,
        responseTo: responstToPost,
    });
    // Send Post to DB
    try {
        await forumPost.save();
        res.send(forumPost);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// // Create Item
// app.post('/api/projects/:projectID/items', async (req, res) => {
//     try {
//         let project = await Project.findOne({_id: req.params.projectID});
//         if (!project) {
//             res.send(404);
//             return;
//         }
//         let item = new Item({
//             project: project,
//             text: req.body.text,
//             completed: req.body.completed,
//         });
//         await item.save();
//         res.send(item);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });

// Delete Post
    // Is this a Question?

    // If so, delete all of it's responses.

    // Delete it.

// Get List of Forum Ponsts
app.get('/api/forum_posts', async (req, res) => {
    console.log("Getting Forum Posts")
    try {
        let posts = await ForumPost.find();
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));