
const express = require('express');
const Notes = require('../mongoose_models/Notes');
const { body, validationResult} = require('express-validator');

const router = express.Router();



//ROUTE 1 : Creating a new note & adding it to the database
router.post('/createnote', [
    body("title", "Too Short Title").isLength({ min: 3 }),
    body("description", "Describe More").isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
    //If there are errors, return Bad Request & display all the errors
    if(!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
    else {
        const {title, description, tag} = req.body;
        try {
            let note = new Notes({ title, description, tag});
            const saveNote = await note.save();
            res.send(note);
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send("Internal Server Error..");
        }
    }

});




//ROUTE 2 : Read all notes from the database
router.get('/allnotes', async (req, res) => {

    try {
        const allNotes = await Notes.find({});      //find({}) is used to fetch all the notes from the db
        res.json(allNotes);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error..");
        }
    }
);




//ROUTE 3 : Update existing note from the database
router.put('/update/:id', async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        const newNote = {}      //Creating a new note when user wants to update

        if(title) newNote.title = title;
        if(description) newNote.description = description;
        if(tag) newNote.tag = tag;

        const note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        if(!note) res.status(404).send('Not Found..');
        res.json(note);

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error..");
        }
    }
);




//ROUTE 4 : Delete a note from the database
router.delete('/delete/:id', async (req, res) => {

    try {

        const note = await Notes.findByIdAndDelete(req.params.id);
        if(!note) res.status(404).send('Not Found..');
        res.send("Note Deleted Successfully");

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error..");
        }
    }
);




module.exports = router;
