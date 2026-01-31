import { Router } from "express";
import staffController from "../controllers/staff.controller.js"
import validation from "../middleware/validation.js";
import checktoken from "../middleware/checktoken.js";

const router = Router()

router
    .get("/api/staffs", checktoken, staffController.getAllStaffs)
    .get("/api/staff/:id", checktoken, staffController.getOneStaff)
    .post("/api/register", validation.register, staffController.register)
    .post("/api/login", validation.login, staffController.login)
    .put("/api/staff/:id", checktoken, staffController.changeStaff)
    .delete("/api/staff/:id", checktoken, staffController.deleteStaff)
      

export default router