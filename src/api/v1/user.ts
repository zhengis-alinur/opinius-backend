import express from 'express';
import userController from '../../controllers/user';
import passport from 'passport';
const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));
router.get('/getAll', userController.getAll);
router.get('/', userController.getById);

router.get('/comments', userController.comments);
router.get('/likes', userController.likes);
router.get('/ratings', userController.ratings);
router.get('/reviews', userController.reviews);
router.get('/stats', userController.stats);

export default router;
