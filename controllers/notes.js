import { Note } from '../models/note.js'
import { Recipe } from '../models/recipe.js'

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
                recipeId: req.params.recipeId
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
            console.log(note)
            res.redirect(`/recipes/${req.params.recipeId}`)
        })
        .catch(function (error) {
            res.render('error', {
                message: 'notes update method failed',
                error
            })
        })
}

function delNote(req, res) {
    Note.findByIdAndDelete(req.params.id)
        .then(function (note) {
            console.log(note)
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