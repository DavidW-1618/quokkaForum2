const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

///// Scheme and Model /////

const forumPostRequirement = require("./forumPosts.js");
const ForumPost = forumPostRequirement.model;

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

/// Person ///

// Create
router.post('/', async (req, res) => {
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
router.put('/:personId', async (req, res) => {
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
router.delete('/:personId', async (req, res) => {
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
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Get Person
router.get('/:personId', async (req, res) => {
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
router.get('/byemail/:email', async (req, res) => {
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
router.get('/', async (req, res) => {
    console.log("\n\n\n", "Received Get All Persons", req.body, "\n\n\n")
    try {
        let persons = await Person.find();
        res.send(persons);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


module.exports = {
    model: Person,
    routes: router,
}