import express from 'express';
import authController from '../../controllers/auth';
import passport from 'passport';
import { isUserAuthenticated } from '../../middlewares';
const router = express.Router();

const successLoginUrl = 'http://localhost:3000';
const errorLoginUrl = 'http://localhost:3000/login';

router.post('/login', authController.login);

router.get('/login/google', passport.authenticate('google', { prompt: 'select_account consent' }));

router.get(
	'/redirect/google',
	passport.authenticate('google', {
		failureMessage: 'Cannot login to Google, please try again later!',
		failureRedirect: errorLoginUrl,
		successRedirect: successLoginUrl
	})
);

router.get('/isAuthenticated', isUserAuthenticated, (req, res) => {
	res.json(req.user);
});

router.delete('/logout', authController.logout);
router.post('/signup', authController.signup);
export default router;
