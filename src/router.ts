import { Router } from "express";

import { createUser, deleteAllUsers, getAllUsers, getUniqueUser } from "./controller/UserController";
import { createAccess, getAllAccesses } from "./controller/AccessController";
import { createStore, getAllStore } from "./controller/StoreController";
import { createProduct, getAllProducts } from "./controller/ProductController";
import { signIn } from "./controller/SessionController";
import { authMiddleware } from "./middleware/AuthMiddleware";
import { createSale } from "./controller/SaleController";

export const router = Router();

router.post("/user", createUser);
router.delete("/deleteAllUsers", authMiddleware(["adm"]), deleteAllUsers);
router.get("/getAllUsers", authMiddleware(["adm"]), getAllUsers);
router.get("/getUniqueUsers", authMiddleware(["adm", "Vendedor", "Cliente"]), getUniqueUser);

router.post("/access", authMiddleware(["adm"]), createAccess);
router.get("/accesses", authMiddleware(["adm", "Vendedor"]), getAllAccesses);

router.post("/store", authMiddleware(["adm", "Vendedor"]), createStore);
router.get("/stores", getAllStore);

router.post("/product/:storeId", authMiddleware(["adm", "Vendedor"]), createProduct);
router.get("/products", authMiddleware(["adm", "Vendedor", "Comprador"]), getAllProducts);

router.post('/create-sale',authMiddleware(["adm", "Vendedor", "Cliente"]) ,createSale)

router.post("/sign-in", signIn);
