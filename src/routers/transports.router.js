import { Router } from "express";
import transportsController from "../controllers/transports.controller.js"
import validation from "../middleware/validation.js";
import checktoken from "../middleware/checktoken.js";

const router = Router()

router
    .get("/api/transports", checktoken, transportsController.getAllTransports)
    .post("/api/transport", checktoken, validation.branch, transportsController.addTransport)
    .put("/api/transport/:id", checktoken, transportsController.changeTransport)
    .delete("/api/transport/:id", checktoken, transportsController.deleteTransport)
      

export default router