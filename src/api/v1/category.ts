import express from 'express';
import categoryController from '../../controllers/category';
const router = express.Router();
import { checkAuthenticated } from '../../middlewares';

router.use(checkAuthenticated);
router.get('/getAll', categoryController.getAll);
router.post('/create', categoryController.create);

export default router;
