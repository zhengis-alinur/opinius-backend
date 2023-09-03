import express from 'express';
import userController from '../../controllers/user';
import { checkAuthenticated } from '../../middlewares';
const router = express.Router();

router.use(checkAuthenticated);
router.get('/getAll', userController.getAll);

export default router;
