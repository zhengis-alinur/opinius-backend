import express from 'express';
import categoryController from '../../controllers/category';
const router = express.Router();
import passport from 'passport';

router.use(passport.authenticate('jwt', { session: false }));
router.get('/getAll', categoryController.getAll);
router.post('/create', categoryController.create);

export default router;
