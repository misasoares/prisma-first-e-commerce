import { Router } from "express";

import { createUser } from "./controller/UserController";
import { createAccess, getAllAccesses } from "./controller/AccessController";
import { createStore, getAllStore } from "./controller/StoreController";
import { createProduct } from "./controller/ProductController";


export const router = Router()

router.post('/user', createUser)

router.post('/access', createAccess)
router.get('/accesses', getAllAccesses)

router.post('/store/:userId', createStore)
router.get('/stores', getAllStore)

router.post('/product/:storeId', createProduct)

