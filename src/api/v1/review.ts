import express from 'express';
import reviewController from '../../controllers/review';
import passport from 'passport';
const router = express.Router();

router.get('/getAll', reviewController.getAll);
router.get('/', reviewController.getById);
router.get('/likes', reviewController.likes);
router.get('/ratings', reviewController.ratings);
router.get('/comments', reviewController.comments);
router.use(passport.authenticate('jwt', { session: false }));

router.post('/create', reviewController.create);
router.post('/update', reviewController.update);
router.post('/delete', reviewController.deleteReviews);

router.post('/like', reviewController.like);
router.post('/rate', reviewController.rate);
router.post('/comment', reviewController.comment);

router.get('/like', reviewController.getLike);
router.get('/rating', reviewController.getRating);

export default router;
