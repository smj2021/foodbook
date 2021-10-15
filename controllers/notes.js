import { Note } from '../models/note.js'

function newNote(req, res) {
    Note.find({}, function (err, notes) {
        res.render('notes/new', {
            title: 'Add Note',
            notes,
        })
    })
}

function create(req, res) {
    Note.create(req.body, function (err, note) {
        res.redirect('/notes/new')
    })
}

export {
    newNote as new,
    create
}