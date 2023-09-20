import express from 'express';
import tagController from '../../controllers/tag';
const router = express.Router();
import passport from 'passport';

router.use(passport.authenticate('jwt', { session: false }));
router.get('/getAll', tagController.getAll);
router.get('/stats', tagController.stats);
router.post('/create', tagController.create);

export default router;
