import { Note } from '../models/note.js'
import { Recipe } from '../models/recipe.js'

//Directs to recipes/:id to add new notes.
function newNote(req, res) {
    Note.find({}, function (err, notes) {
        res.render('recipe/', {
            title: 'Add Note',
            notes,
        })
    })
}

//Creates the note with data payload and redirects after submit.
function create(req, res) {
    Note.create(req.body, function (err, note) {
        res.redirect('/recipes/:id')
    })
}

//Directs to note editing form.
function edit(req, res) {
    Note.findById(req.params.id)
        .then(function (note) {
            res.render('notes/edit', {
                title: `Editing ${note.content}`,
                note,
                recipeId: req.params.recipeId
            })
        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/')
        })
}

//Directs to note update action.
function update(req, res) {
    Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(function (note) {
            res.redirect(`/recipes/${req.params.recipeId}`)
        })
        .catch(function (error) {
            res.render('error', {
                message: 'notes update method failed',
                error
            })
        })
}

//Directs to note delete action.
function delNote(req, res) {
    Note.findByIdAndDelete(req.params.id)
        .then(function (note) {
            res.redirect(`/recipes/${req.params.recipeId}`)
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
    update,
    delNote as delete
}