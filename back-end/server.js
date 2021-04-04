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
    console.log("\n\n\n", "Received Update Person", req.body, "\n\n\n")
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
    console.log("\n\n\n", "Received Delete Person", req.body, "\n\n\n")
    try {
        let person = await Person.findOne({_id:req.params.personId});
        if (!person) {
            res.send(404);
            return;
        }
        //Delete all of the person's posts
        await Person.deleteMany({personId: person._id})

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
    console.log("\n\n\n", "Received Get Person", req.body, "\n\n\n")
    try {
        let person = await Person.findOne({_id:req.params.personId});
        res.send(person);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get Person By Email
app.get('/api/persons/byemail/:email', async (req, res) => {
    console.log("\n\n\n", "Received Get Person ByEmail", req.body, "\n\n\n")
    try {
        let person = await Person.findOne({email:req.params.email});
        res.send(person);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get List of Persons
app.get('/api/persons', async (req, res) => {
    console.log("\n\n\n", "Received Get All Persons", req.body, "\n\n\n")
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
    console.log("\n\n\n", "Received Create Forum Post", req.body, "\n\n\n")
    // Get Post that is being responded to.
    try {
        let person = Person.findOne({email: req.body.email});
        // Todo: Figure out how to tell if 404 came back.
        if (!person) {
            // Make this person.
            let newPerson = new Person({
                name: req.body.name,
                email: req.body.email,
                age: 0,
                gender: "unknown",
                bio: "This person prefers to keep an air of mystery about them.",
            });
            await newPerson.save();
            person = newPerson;
        }
        // Make Post
        const forumPost = new ForumPost({
            personId: person._id
            comment: req.body.comment,
            timeOfPost: req.body.timeOfPost,
            responseToPost: req.body.responstToPost,
        });
        // Send Post to DB
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

// Update
app.put('/api/forum_posts', async (req, res) => {
    console.log("\n\n\n", "Received Update Forum Post", req.body, "\n\n\n")
    try {
        // Get Post.
        let post = Post.findOne({_id: req.body._id})
        if (!post) {
            res.send(404);
            return;
        }
        // TODO: Make sure only the comment is being sent and edited.
        post.comment = req.body.comment;
        await post.save();
        console.log("Post Update Saved.");
        res.sendStatus(500)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


// Delete Post
app.delete('/api/forum_posts/:postId/', async (req, res) => {
    try {
        let post = await ForumPost.findOne({_id:req.params.postId});
        if (!item) {
            res.send(404);
            return;
        }
        // Is this a Question?
        if (post.responseToPost == null) {
            // If so, delete all of it's responses.
            await ForumPost.deleteMany({resonseToPost: post._id})
        }
        // Delete the post.
        await post.delete()
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


    // If so, delete all of it's responses.
    // Delete it.

// Get List of Forum Posts
app.get('/api/forum_posts', async (req, res) => {
    console.log("\n\n\n", "Received Get All Forum Posts", req.body, "\n\n\n")
    try {
        let posts = await ForumPost.find();
        res.send(posts);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));