import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'


const router = Router();

//Routes to landing page
router.get('/', isLoggedIn, profilesCtrl.index)


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
}

export {
    router
}

