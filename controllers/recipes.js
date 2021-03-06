import { Recipe } from '../models/recipe.js';
import { Note } from '../models/note.js'

//Renders the add recipe form.
function newRecipe(req, res) {
    const newRecipe = new Recipe();
    const created = newRecipe.createdOn;
    const createDate = created.toLocaleString();
    res.render('recipes/new', {
        title: "What's Cookin?",
        createDate,
    })
}

//Sumbits the new recipe to the database.
function create(req, res) {
    Recipe.create(req.body, function (err, recipe) {
        res.redirect('/recipes')
    })
}

//Renders the recipe index page for viewing all recipes.
function index(req, res) {
    Recipe.find({}, function (err, recipes) {
        res.render('recipes/index', {
            recipes,
            title: "In the Kitchen",
            // user: req.user,
        })
    })
}

//Renders individual recipe characteristics.
function show(req, res) {
    Recipe.findById(req.params.id)
        .populate('notes')
        .exec(function (err, recipe) {
            Note.find({ _id: { $nin: recipe.notes } }, function (err, notes) {
                res.render('recipes/show', {
                    title: "Chef's Secrets!",
                    recipe,
                    notes: notes,
                })
            })
        })
}

//Enables user to add notes or instructions to an individual recipe.
function addNote(req, res) {
    Recipe.findById(req.params.id, function (err, recipe) {
        Note.create({
            content: req.body.note,
        }, function (err, note) {
            recipe.notes.push(note._id)
            recipe.save(function (err) {
                res.redirect(`/recipes/${recipe._id}`)
            })
        })
    })
}

//Renders the edit form.
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

//Submits the data payload when a user updates a recipe.
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

//Removes a recipe from the database.
function delRecipe(req, res) {
    Recipe.findByIdAndDelete(req.params.id)
        .then(function (recipe) {
            res.redirect('/recipes')
        })
        .catch(function (err) {
            console.log(err)
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