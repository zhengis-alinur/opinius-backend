import express from 'express';
import reviewController from '../../controllers/review';
import { checkAuthenticated } from '../../middlewares';
const router = express.Router();

router.use(checkAuthenticated);
router.get('/getAll', reviewController.getAll);
router.get('/', reviewController.getById);
router.post('/create', reviewController.create);
router.post('/like', reviewController.like);
router.post('/rate', reviewController.rate);
router.post('/comment', reviewController.comment);

export default router;
