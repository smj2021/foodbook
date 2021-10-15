import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'

const router = Router();

router.get('/', recipesCtrl.index);

router.get('/new', recipesCtrl.new);

router.post('/', recipesCtrl.create);

router.get(':id', recipesCtrl.show);

router.post(':id/notes', recipesCtrl.addNote);

export {
    router
}
