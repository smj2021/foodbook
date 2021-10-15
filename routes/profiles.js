import { Router } from 'express'
import * as indexCtrl from '../controllers/index.js'


const router = Router();

//Routes to landing page
router.get('/', indexCtrl.index)




export {
    router
}