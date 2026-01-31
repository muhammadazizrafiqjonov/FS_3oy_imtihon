import { NotFoundError, UnauthorizedError } from "../utils/error.js";
import JWT  from "jsonwebtoken";
import pool from "../database/config.js";

export default async(req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      throw new UnauthorizedError(401, "Don't send without token");
    }
    const data = JWT.verify(token, process.env.JWT_SECRET);

    const user = await pool.query("select * from users where id=$1", [data.id])

    if(!user.rowCount){
        throw new NotFoundError(404, "User not found")
    }

    req.user = data
    next()

  } catch (error) {
    if(error.name = "TokenExpiredError"){
        error.status = 400
        next(error)
    }else {
        next(error)
    }
  }
};
