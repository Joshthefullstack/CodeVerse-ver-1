import express from 'express';
import { UserController } from '../controllers/userController';
import { UserService } from '../services/userService';
import { UserRepository } from '../repositories/user/userRepository';
import pool from '../dbConfig';
import authenticateJWT from '../external-libs/authenticate';

const router = express.Router();


const repository = new UserRepository(pool);
const service = new UserService(repository)
const controller = new UserController(service)

router.post("/sendOtp", controller.sendOTP);
router.post("/register", controller.createUser);
router.post("/login", controller.loginUser);

console.log(typeof authenticateJWT); // Should output 'function'
router.use(authenticateJWT);

router.put("/update-user", controller.updateUser);



export default router;