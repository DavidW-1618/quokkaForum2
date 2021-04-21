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
mongoose.connect('mongodb://localhost:27017/quakka_forum5', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

const users = require("./users.js");
app.use("/api/users", users.routes);
const validUser = users.valid;
const Person = users.model

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //Schemes and Models
//
// const personSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     age: Number,
//     gender: String,
//     bio: String,
// });
// personSchema.virtual('id')
//     .get(function() {
//         return this._id.toHexString();
//     });
// personSchema.set('toJSON', {
//     virtuals: true
// });
// const Person = mongoose.model('Person', personSchema);
//
// ///////

const forumPostSchema = new mongoose.Schema({
    Person: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    comment: String,
    timeOfPost: Date,
    responseToPost: String, // TA told me that it is not possible for schemas to reference themselves. So this is my
                            // work around.
});
forumPostSchema.virtual('id')
    .get(function() {
        return this._id.toHexString();
    });

// This is a method that will be called automatically any time we convert a user
// object to JSON. It deletes the password hash from the object. This ensures
// that we never send password hashes over our API, to avoid giving away
// anything to an attacker.
forumPostSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.Person.password;
    return obj;
}

forumPostSchema.set('toJSON', {
    virtuals: true
});
const ForumPost = mongoose.model('ForumPost', forumPostSchema);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Password Filters

function personFindOne(filters) {
    let result = Person.findOne(filters);
    delete result.password;
    return result;
}
async function postsFind() {
    let results = await ForumPost.find().populate('Person').lean();
    // results = results.toObject();
    for (let i = 0; i < results.length; i++) {
        let result = results[i];
        delete result.Person.password;
        results[i] = result;
    }
    return results;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Persons Routes

const personRouter = express.Router();

// Update
personRouter.put('/:personId', validUser, async (req, res) => {
    console.log("\n\n\n", "Received Update Person", req.body, "\n\n\n")
    try {
        let person = await Person.findOne({_id:req.params.personId});
        if (!person) {
            res.send(404);
            return;
        }

        // Check to see if email already exists and if so send a 403 error. A 403
        // error means permission denied. // Make sure that the email was not unchanged though.
        const existingUser = await Person.findOne({
            email: req.body.email
        });
        if (existingUser && existingUser._id != req.params.personId)
            return res.status(403).send({
                message: "Email already exists for another user. Person not updated."
            });

        person.firstName = req.body.firstName;
        person.lastName = req.body.lastName;
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
personRouter.delete('/:personId', validUser, async (req, res) => {
    console.log("\n\n\n", "Received Delete Person", req.body, "\n\n\n")
    try {
        let person = await Person.findOne({_id:req.params.personId});
        if (!person) {
            res.send(404);
            return;
        }
        //Delete all of the person's posts
        // await Person.delete({personId: person._id})
        let posts = await ForumPost.find({Person: person})
        console.log("All Posts")
        console.log(posts)
        for (post of posts) {
            if (post.responseToPost == null || post.responseToPost == undefined) {
                // If so, delete all of it's responses.
                console.log("This post has responses:")
                console.log(post)
                let questions = await ForumPost.find({responseToPost: post._id})
                console.log("These are the responses:")
                console.log(questions)
                for (question of questions) {
                    try {
                        question.delete()
                    } catch {
                        // We may have already deleted this post if this post was by the same person.
                        red = 3
                        red = red
                        // Do nothing.
                    }
                }
            }
            try {
                post.delete()
            } catch {
                // We may have already deleted this post if this post was a response to another post by the same person.
                red = 3
                red = red
                // Do nothing.
            }

        }

        // Delete the person
        await person.delete();
        // Remove login cookie thing.
        req.session = null;
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get Person
personRouter.get('/:personId', async (req, res) => {
    console.log("\n\n\n", "Received Get Person", req.body, "\n\n\n")
    try {
        let person = await Person.findOne({_id:req.params.personId});
        res.send(person);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// // Get Person By Email
// personRouter.get('/byemail/:email',  async (req, res) => {
//     console.log("\n\n\n", "Received Get Person ByEmail", req.body, "\n\n\n")
//     try {
//         let person = await Person.findOne({email:req.params.email});
//         res.send(person);
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// });

// Get List of Persons
personRouter.get('/', async (req, res) => {
    console.log("\n\n\n", "Received Get All Persons", req.body, "\n\n\n")
    try {
        let persons = await Person.find();
        res.send(persons);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Forum Posts Routes

const forumPostRouter = express.Router();

// Create
forumPostRouter.post('/',validUser,  async (req, res) => {
    console.log("\n\n\n", "Received Create Forum Post", req.body, "\n\n\n")
    // Get Post that is being responded to.
    try {
        let person = await Person.findOne({_id: req.body.personId});
        // Make Post
        console.log("Person found:")
        console.log(person)
        const forumPost = new ForumPost({
            Person: person, //also tried setting it to person  //HELP: person
            comment: req.body.comment,
            timeOfPost: req.body.timeOfPost,
            responseToPost: req.body.responseToPost,
        });
        // Send Post to DB
        await forumPost.save();
        res.send(forumPost);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Update
forumPostRouter.put('/:id',validUser,  async (req, res) => {
    console.log("\n\n\n", "Received Update Forum Post", req.body, "\n\n\n")
    try {
        // Get Post.
        let post = await ForumPost.findOne({_id: req.params.id})
        if (!post) {
            res.send(404);
            return;
        }
        post.comment = req.body.comment;
        await post.save();
        console.log("Post Update Saved.");
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


// Delete Post
forumPostRouter.delete('/:postId/',validUser,  async (req, res) => {
    try {
        let post = await ForumPost.findOne({_id:req.params.postId});
        if (!post) {
            res.send(404);
            return;
        }
        // Is this a Question?
        if (post.responseToPost == null || post.responseToPost == undefined) {
            // If so, delete all of it's responses.
            let questions = await ForumPost.find({responseToPost: post._id})
            for (question of questions) {
                question.delete()
            }
        }
        // Delete the post.
        await post.delete()
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get List of Forum Posts
forumPostRouter.get('/', async (req, res) => {
    console.log("\n\n\n", "Received Get All Forum Posts", req.body, "\n\n\n");
    let posts = null;
    // Get Posts
    try {
        // posts = await ForumPost.find().populate('Person');
        posts = await postsFind();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

    // Sort List
    // todo: # Is posts a list with a sort() method?
    posts = posts.sort(function(a, b){return a.timeOfPost - b.timeOfPost});

    // Get Questions and Answers
    let questions = posts.filter(a => a.responseToPost == null);
    let answers = posts.filter(a => a.responseToPost != null);

    // Organize Them All
    for (let i = 0; i < questions.length; i++){
        // for (let q of questions) {
        //     q.responses = [];
        // questions[i] = questions[i].toObject()
        let curAnswers = answers.filter(a => a.responseToPost == questions[i]._id);
        questions[i]["responses"] = curAnswers;
    }
    try {
        res.send([questions]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use("/api/persons", personRouter);
app.use("/api/forum_posts", forumPostRouter);

app.listen(3003, () => console.log('Server listening on port 3004!'));