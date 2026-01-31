import { Router } from "express";
import AdminController from "../controllers/admins.controller.js"
import validation from "../middleware/validation.js";
import checktoken from "../middleware/checktoken.js";

const router = Router()

router
    .get("/api/admins", checktoken, AdminController.getAllAdmins)
    .get("/api/admin/:id", checktoken, AdminController.getOneAdmin)
    .post("/api/admin", checktoken, validation.branch, AdminController.addAdmin)
    .delete("/api/admin/:id", checktoken, AdminController.deleteAdmin)
      

export default router