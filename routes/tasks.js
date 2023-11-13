import express from 'express';
import {protect} from '../middleware/autorization.js';
import * as taskController from '../controllers/tasks.js'  ;


const router = express.Router();

router.post('/addTask', protect , taskController.addTask);
router.put('/updateTask/:id', protect , taskController.updateTask);
router.delete('/deleteTask/:id', protect , taskController.deleteTask);
router.put('/updateStatus/:id', protect , taskController.updateTaskStatus);
router.get('/retriveAllTasks', protect , taskController.getTasksByUser);



export default router