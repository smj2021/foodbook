import { Router } from 'express';
import * as notesCtrl from '../controllers/notes.js'

const router = Router();

router.get('/new', isLoggedIn, notesCtrl.new);
router.post('/', isLoggedIn, notesCtrl.create);
router.get('/:id/edit/:recipeId', isLoggedIn, notesCtrl.edit);
router.put('/:id/:recipeId', isLoggedIn, notesCtrl.update);
router.delete('/:id/:recipeId', isLoggedIn, notesCtrl.delete);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

export {
    router
}