import { Router } from "express";

import { createUser } from "./controller/UserController";


export const router = Router()

router.post('/user', createUser)