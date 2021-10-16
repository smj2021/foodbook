import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'

const router = Router();

router.get('/new', isLoggedIn, recipesCtrl.new);

router.get('/', isLoggedIn, recipesCtrl.index);

router.get('/:id', isLoggedIn, recipesCtrl.show);

router.post('/', isLoggedIn, recipesCtrl.create);

router.post(':id/notes', isLoggedIn, recipesCtrl.addNote);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

export {
    router
}
