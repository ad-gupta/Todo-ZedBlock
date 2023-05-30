import {Router} from  'express';
import { logout, signin, signup } from '../controllers/user.js';

const router = Router();

// SIGN UP
router.post("/signup", signup);

// SIGN IN
router.post("/signin", signin);

// // LOG OUT
router.get("/logout", logout)

export default router;