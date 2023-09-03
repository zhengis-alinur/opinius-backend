import express from 'express';
import tagController from '../../controllers/tag';
const router = express.Router();
import { checkAuthenticated } from '../../middlewares';

router.use(checkAuthenticated);
router.get('/getAll', tagController.getAll);
router.post('/create', tagController.create);

export default router;
