import { Router } from 'express';
import * as notesCtrl from '../controllers/notes.js'

const router = Router('');

router.get('/new', notesCtrl.new);
router.post('/', notesCtrl.create);

export {
    router
}