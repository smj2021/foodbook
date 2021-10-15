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
        res.render('recipes/,', {
            recipes,
            title: 'All Recipes'
        })
    })
}

export {
    newRecipe as new,
    create
}