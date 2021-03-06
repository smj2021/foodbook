import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'

const router = Router();

router.get('/new', isLoggedIn, recipesCtrl.new);
router.get('/', isLoggedIn, recipesCtrl.index);
router.post('/', isLoggedIn, recipesCtrl.create);
router.get('/:id', isLoggedIn, recipesCtrl.show);
router.get('/:id/edit', isLoggedIn, recipesCtrl.edit);
router.put('/:id/', isLoggedIn, recipesCtrl.update);
router.post('/:id/notes', isLoggedIn, recipesCtrl.addNote);
router.delete('/:id', isLoggedIn, recipesCtrl.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

export {
    router
}







