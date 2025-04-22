import express from 'express';
import { UserController } from '../controllers/userController';
import { UserService } from '../services/userService';
import { UserRepository } from '../repositories/user/userRepository';
const authenticate = require("../external-libs/authenticate");
import pool from '../dbConfig';


const router = express.Router();


const repository = new UserRepository(pool);
const service = new UserService(repository)
const controller = new UserController(service)

router.post("/sendOtp", controller.sendOTP);
router.post("/register", controller.createUser);
router.post("/login", controller.loginUser);

router.use(authenticate);

router.put("/update-user", controller.updateUser);



export default router;