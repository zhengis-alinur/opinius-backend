import express from 'express';
import authController from '../../controllers/auth';
const router = express.Router();

router.post('/login', authController.login);
router.delete('/logout', authController.logout);
router.post('/signup', authController.signup);
export default router;
