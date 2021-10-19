import { Recipe } from '../models/recipe.js';
import { Note } from '../models/note.js'

function newRecipe(req, res) {
    const newRecipe = new Recipe();
    const created = newRecipe.createdOn;
    const createDate = created.toLocaleString();
    res.render('recipes/new', {
        title: "What's Cookin?",
        createDate,
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
            title: "In the Kitchen",
            // user: req.user,
        })
    })
}


function show(req, res) {
    Recipe.findById(req.params.id).populate('notes').exec(function (err, recipe) {
        Note.find({ _id: { $nin: recipe.notes } }, function (err, notes) {
            if(err){
                console.log(err)
            }
            res.render('recipes/show', {
                title: "Chef's Secrets!",
                recipe,
                notes: notes,
            })
        })
    })
}

function addNote(req, res) {
    console.log(req.body) //remove before deploy
    console.log(req.params.id) //remove before deploy
    Recipe.findById(req.params.id, function (err, recipe) {
        Note.create({
            content: req.body.note,
        }, function (err, note) {
            console.log('note:', note) //remove before deploy
            recipe.notes.push(note._id)
            recipe.save(function (err) {
                console.log('err', err) //remove before deploy
                res.redirect(`/recipes/${recipe._id}`)
            })
        })
    })
}

function edit(req, res) {
    Recipe.findById(req.params.id)
        .then(function (recipe) {
            res.render('recipes/edit', {
                title: `Editing ${recipe.name}`,
                recipe,
            })
        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/')
        })
}

function update(req, res) {
    Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(function (recipe) {
            res.redirect(`/recipes/${recipe._id}`)
        })
        .catch(function (err) {
            console.log(err)
            res.redirect('/')
        })
}

function delRecipe(req, res) {
    Recipe.findByIdAndDelete(req.params.id)
        .then(function (recipe) {
            res.redirect('/recipes')
        })
        .catch(function (err) {
            comsole.log(err)
            res.redirect('/')
        })
}

export {
    newRecipe as new,
    create,
    index,
    show,
    addNote,
    edit,
    update,
    delRecipe as delete
}