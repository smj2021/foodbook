import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'


const router = Router();

//Routes to landing page
router.get('/', isLoggedIn, profilesCtrl.index);
router.get('/:id', isLoggedIn, profilesCtrl.show);
router.get('/:id/edit', isLoggedIn, profilesCtrl.edit);
router.put('/:id/', isLoggedIn, profilesCtrl.update);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

export {
    router
}

