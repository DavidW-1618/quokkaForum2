const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

///// Schema and Model /////

const personsRequirement = require("./persons.js");
const Person = personsRequirement.model;

const forumPostSchema = new mongoose.Schema({
    Person: {
        type: mongoose.Schema.ObjectId,
        ref: 'Person'
    },
    comment: String,
    timeOfPost: Date,
    // isOriginalPost: Boolean,
    responseToPost: String,
});
forumPostSchema.virtual('id')
    .get(function() {
        return this._id.toHexString();
    });
forumPostSchema.set('toJSON', {
    virtuals: true
});
const ForumPost = mongoose.model('ForumPost', forumPostSchema);


/// ForumPost CRUDs ///

// Create
router.post('/', async (req, res) => {
    console.log("\n\n\n", "Received Create Forum Post", req.body, "\n\n\n")
    // Get Post that is being responded to.
    try {
        console.log("--1: ", req.body.personId);
        let person = await Person.findOne({_id: req.body.personId});
        console.log("--2")
        // // Todo: Figure out how to tell if 404 came back.
        // if (!person) {
        //     // Make this person.
        //     let newPerson = new Person({
        //         name: req.body.name,
        //         email: req.body.email,
        //         age: 0,
        //         gender: "unknown",
        //         bio: "This person prefers to keep an air of mystery about them.",
        //     });
        //     await newPerson.save();
        //     person = newPerson;
        // }
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
router.put('/:id', async (req, res) => {
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
router.delete('/:postId/', async (req, res) => {
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


// If so, delete all of it's responses.
// Delete it.

// Get List of Forum Posts
router.get('/', async (req, res) => {
    console.log("\n\n\n", "Received Get All Forum Posts", req.body, "\n\n\n");
    let posts = null;
    // Get Posts
    try {
        posts = await ForumPost.find().populate('Person');;
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    // console.log("Posts:")
    // console.log(posts)
    // console.log("")

    // Sort List
    // todo: # Is posts a list with a sort() method?
    posts = posts.sort(function(a, b){return a.timeOfPost - b.timeOfPost});

    // Get Questions and Answers
    let questions = posts.filter(a => a.responseToPost == null);
    let answers = posts.filter(a => a.responseToPost != null);

    // console.log("Questions Initial:")
    // console.log(questions)
    // console.log("")
    // console.log("Answers Initial:")
    // console.log(answers)
    // console.log("")

    // Organize Them All
    for (let i = 0; i < questions.length; i++){
        // for (let q of questions) {
        //     q.responses = [];
        questions[i] = questions[i].toObject()
        let curAnswers = answers.filter(a => a.responseToPost == questions[i]._id);
        questions[i]["responses"] = curAnswers;
    }
    // console.log("Questions:")
    // console.log(questions)
    // console.log("")

    // Send Posts
    // console.log("Sending this:");
    // console.log(questions);
    try {
        res.send([questions]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    model: ForumPost,
    routes: router,
}