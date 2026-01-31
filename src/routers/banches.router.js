import { Router } from "express";
import branchController from "../controllers/branches.controller.js"
import validation from "../middleware/validation.js";
import checktoken from "../middleware/checktoken.js";

const router = Router()

router
    .get("/api/branches", checktoken, branchController.getAllBranches)
    .get("/api/branch/:id", checktoken, branchController.getOneBranch)
    .post("/api/branch", checktoken, validation.branch, branchController.addBranch)
    .put("/api/branch/:id", checktoken, branchController.changeBranch)
    .delete("/api/branch/:id", checktoken, branchController.deleteBranch)
      

export default router