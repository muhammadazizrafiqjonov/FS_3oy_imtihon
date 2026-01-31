import pool from "../database/config.js"
import { ConflictError, NotFoundError } from "../utils/error.js"

class AdminService{

    constructor() { }
    
    async addAdmin(req){
        const { name, address } = req.body
        
        const existAdmin = await pool.query("select * from staffs")
        

        if(existAdmin.rowCount){
            throw new ConflictError(409, "Admin already exist")
        }

        await pool.query("insert into branches(name, address) values($1, $2) RETURNING *",
            [name, address]
        )

        return {
            status:201,
            message: "New branch successfully created"
        }
    }

    async getAllAdmins(){
        const admins = await pool.query("select * from admins")

        return admins.rows

    }

    async getOneAdmin(req) {

        const { id } = req.params
 
        const existAdmin = await pool.query("select * from admin where id=$1", [id])

        if (!existAdmin.rowCount) {
            throw new NotFoundError(404, "admin is not found")
        }

        return existAdmin.rows
    }

    async deleteAdmin(req) {
        
        const { id } = req.params

        const existAdmin = await pool.query("select * from admins where id=$1", [id])

        if (!existAdmin.rowCount) {
            throw new NotFoundError(404, "admin is not found") 
        }

        await pool.query("delete * from admins where id = $1", [id])

        return {
            status: 200,
            message:"admin successfully deleted"
        }
    }
}


export default new AdminService