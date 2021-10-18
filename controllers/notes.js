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
        res.redirect('/recipes/:id')
    })
}

function edit(req, res) {
    Note.findById(req.params.id)
        .then(function (note) {
            res.render('notes/edit', {
                title: `Editing ${note.content}`,
                note,
            })
        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/')
        })
}

function update(req, res) {
    Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(function (note) {
            res.redirect(`/notes/${note._id}`)
        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/')
        })
}

export {
    newNote as new,
    create,
    edit,
    update
}