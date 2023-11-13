import express from 'express';
import {protect} from '../middleware/autorization.js';
import * as userController from '../controllers/user.js'  ;


const router = express.Router();

router.post('/signup', protect , userController.SignUp);
router.post('/signin', userController.SignIn);



export default router