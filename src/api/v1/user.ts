import express from 'express';
import userController from '../../controllers/user';
import passport from 'passport';
const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));
router.get('/getAll', userController.getAll);

router.get('/comments', userController.comments);
router.get('/likes', userController.likes);
router.get('/ratings', userController.ratings);
router.get('/reviews', userController.reviews);

export default router;
