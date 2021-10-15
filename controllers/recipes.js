import { Recipe } from '../models/recipe.js';
import { Note } from '../models/note.js'

function newRecipe(req, res) {
    res.render('/recipes/new', {
        title: 'New Recipe',
    })
}

function create(req, res) {
    console.log(req.body)
    Recipe.create(req.body, function (err, recipe) {
        console.log(recipe)
        res.redirect('/recipes')
    })
}

function index(req, res) {
    Recipe.find({}, function (err, recipes) {
        res.render('recipes/index', {
            recipes,
            title: 'All Recipes'
        })
    })
}


function show(req, res) {
    Recipe.findById(req.params.id).populate('notes').exec(function (err, recipe) {
        Note.find({ _id: { $nin: recipe.notes } }, function (err, notes) {
            res.render('recipes/new', {
                title: 'Recipe Details',
                recipe,
                notes: notes,
            })
        })
    })
}

function addNote(req, res) {
    Recipe.findById(req.params.id, function (err, recipe) {
        recipe.notes.push(req.body.noteId)
        recipe.save(function (err) {
            res.redirect(`/recipes/${recipe._id}`)
        })
    })
}


export {
    newRecipe as new,
    create,
    index,
    show,
    addNote
}