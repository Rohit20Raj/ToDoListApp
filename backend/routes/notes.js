const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route 1: Get all the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }

});

// Route 2: Add Notes using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    // Validating name, email & pwd using pagckage: 'express-validator'
    body('title', 'Enter a title').exists(),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return the user error caught during validation in the form of an array
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();

        res.json(savedNote);
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route 3: Update Notes using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Create new object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).send('Not found'); }

        if (note.user.toString() !== req.user.id) { return res.status(401).send('Not allowed'); }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }

});

// Route 4: Delete Notes using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);

        if (!note) { return res.status(404).send('Not found'); }

        if (note.user.toString() !== req.user.id) { return res.status(401).send('Not allowed'); }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ 'Success': 'Note has been deleted', note: note });
    } catch (error) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }

});
module.exports = router