import { Router } from "express";
import permissionController from "../controllers/permission.controller.js"
import validation from "../middleware/validation.js";
import checktoken from "../middleware/checktoken.js";

const router = Router()

router
    .get("/api/staffs", checktoken, permissionController.getAllStaffs)
    .get("/api/staff/:id", checktoken, permissionController.getOneStaff)
    .post("/api/register", validation.register, permissionController.register)
    .post("/api/login", validation.login, permissionController.login)
    .put("/api/staff/:id", checktoken, permissionController.changeStaff)
    .delete("/api/staff/:id", checktoken, permissionController.deleteStaff)
      

export default router