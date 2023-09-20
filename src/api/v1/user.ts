import express from 'express';
import userController from '../../controllers/user';
import passport from 'passport';
const router = express.Router();

router.get('/getAll', userController.getAll);
router.get('/', userController.getById);
router.get('/comments', userController.comments);
router.get('/likes', userController.likes);
router.get('/ratings', userController.ratings);
router.get('/reviews', userController.reviews);
router.get('/favorites', userController.favorites);
router.get('/stats', userController.stats);

router.use(passport.authenticate('jwt', { session: false }));
router.post('/delete', userController.deleteUser);
router.post('/setAvatar', userController.setAvatar);

export default router;
