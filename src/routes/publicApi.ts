import express from "express"
import { CustomerController } from "../controllers/customerController"
import { RestaurantController } from "../controllers/restaurantController"
import { OrderController } from "../controllers/orderController"

export const publicRouter = express.Router()

// --- CUSTOMER API ---
publicRouter.post("/customers", CustomerController.create)
publicRouter.get("/customers/:customerId", CustomerController.get) 
publicRouter.patch("/customers/:customerId", CustomerController.update) 
publicRouter.delete("/customers/:customerId", CustomerController.delete)

// --- RESTAURANT API ---
publicRouter.post("/restaurants", RestaurantController.create)
publicRouter.get("/restaurants/filter/opened", RestaurantController.getOpenClose)
publicRouter.get("/restaurants/filter/closed", RestaurantController.getOpenClose)
publicRouter.get("/restaurants/:restaurantId", RestaurantController.get)
publicRouter.patch("/restaurants/:restaurantId", RestaurantController.update)
publicRouter.delete("/restaurants/:restaurantId", RestaurantController.delete)

// --- ORDER API ---
publicRouter.post("/orders", OrderController.create)
publicRouter.get("/orders", OrderController.get)
publicRouter.get("/orders/customer/:customerId", OrderController.get)
publicRouter.get("/orders/restaurant/:restaurantId", OrderController.get)