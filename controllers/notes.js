import { Note } from '../models/note.js'

function newNote(req, res) {
    Note.find({}, function (err, notes) {
        res.render('recipe/', {
            title: 'Add Note',
            notes,
        })
    })
}

function create(req, res) {
    Note.create(req.body, function (err, note) {
        res.redirect('/recipes/')
    })
}

export {
    newNote as new,
    create
}