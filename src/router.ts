import { Router } from "express";

import { createUser, deleteAllUsers, getAllUsers } from "./controller/UserController";
import { createAccess, getAllAccesses } from "./controller/AccessController";
import { createStore, getAllStore } from "./controller/StoreController";
import { createProduct } from "./controller/ProductController";
import { signIn } from "./controller/SessionController";


export const router = Router()

router.post('/user', createUser)
router.delete('/deleteAllUsers', deleteAllUsers)
router.get('/getAllUsers', getAllUsers)

router.post('/access', createAccess)
router.get('/accesses', getAllAccesses)

router.post('/store/:userId', createStore)
router.get('/stores', getAllStore)

router.post('/product/:storeId', createProduct)

router.post('/sign-in', signIn)