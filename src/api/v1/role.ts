import express from 'express';
import roleController from '../../controllers/role';
const router = express.Router();
import passport from 'passport';

router.use(passport.authenticate('jwt', { session: false }));
router.get('/getAll', roleController.getAll);
router.post('/create', roleController.create);

export default router;
