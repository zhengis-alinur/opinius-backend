import express from 'express';
import reviewController from '../../controllers/review';
import passport from 'passport';
const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));
router.get('/getAll', reviewController.getAll);
router.get('/', reviewController.getById);

router.post('/create', reviewController.create);
router.post('/update', reviewController.update);

router.post('/like', reviewController.like);
router.post('/rate', reviewController.rate);
router.post('/comment', reviewController.comment);

router.get('/likes', reviewController.likes);
router.get('/ratings', reviewController.ratings);
router.get('/rating', reviewController.getRating);
router.get('/comments', reviewController.comments);

export default router;
