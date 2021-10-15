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

export {
    newRecipe as new,
    create
}