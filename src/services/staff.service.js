import pool from "../database/config.js"
import { extname } from "path"
import { ComparePassword, HashPassword } from "../utils/bcrypt.js"
import JWT from "jsonwebtoken"
import { BadrequestError, ConflictError, InternalServerError, NotFoundError } from "../utils/error.js"
import { join } from "path"

class StaffService{

    constructor() { }
    
    async register(body){
        const { branch, username, password, repeat_password, birthdate, gender, role} = body

        if (password != repeat_password) {
            throw new BadrequestError(400, "Passwords are not equal")
        }

        const existStaff = await pool.query("select * from staffs where username = $1", [username])
        

        if(existStaff.rowCount){
            throw new ConflictError(409, "Staff already exist")
        }

        const newStaff = await pool.query("insert into staffs(branch, username, password, birthdate, gender) values($1, $2, $3,$4, $5) RETURNING *",
            [branch, username, await HashPassword(password), birthdate, gender]
        )


        return {
            status:201,
            message: "New Staff successfully created",
            accessToken:JWT.sign({id:newStaff.rows[0].id, username:newStaff.rows[0].username},process.env.JWT_SECRET,{expiresIn:'20m'}),
            refreshToken: JWT.sign({id:newStaff.rows[0].id, username:newStaff.rows[0].username},process.env.JWT_SECRET,{expiresIn:'1d'}),
        }
    }

    async login(body) {
        const { username, password } = body

        const existStaff = await pool.query("select * from staffs where username=$1", [username])

        if (!existStaff.rowCount) {
            throw new NotFoundError(404, "username or password is incorrect")
        }

        if(!(await ComparePassword(password, existStaff.rows[0].password))){
            throw new NotFoundError(404, "username or password is incorrect")
        }

        return {
            status:200,
            message: "Staff successfully login",
            accessToken:JWT.sign({id:existStaff.rows[0].id, username:existStaff.rows[0].username},process.env.JWT_SECRET,{expiresIn:'20m'}),
            refreshToken: JWT.sign({id:existStaff.rows[0].id, username:existStaff.rows[0].username},process.env.JWT_SECRET,{expiresIn:'1d'}),
        }
    }

    async getAllStaffs(){
        const staffs = await pool.query("select id, branch, username, birthdate, gender from staffs")

        return staffs.rows

    }

    async getOneStaff(req) {

        const { id } = req.params
 
        const existStaff = await pool.query("select * from staffs where id=$1", [id])

        if (!existStaff.rowCount) {
            throw new NotFoundError(404, "Staff is not found")
        }

        return existStaff.rows
    }

    async deleteStaff(req) {
        
        const { id } = req.params

        const existStaff = await pool.query("select * from staffs where id=$1", [id])

        if (!existStaff.rowCount) {
            throw new NotFoundError(404, "Staff is not found") 
        }

        await pool.query("delete * from staffs where id = $1", [id])

        return {
            status: 200,
            message:"Staff successfully deleted"
        }
    }

    async changeStaff(req) {
        const { branch, username, old_password, new_password, birthdate } = req.body

        const { id } = req.params

        const existBranch = await pool.query("select * from branches where name=$1", [branch])

        if (!existBranch.rowCount) {
            throw new NotFoundError(404, "Branch is not found")
        } 
        const existStaff = await pool.query("select * from staffs where id=$1", [id])

        if (!existStaff.rowCount) {
            throw new NotFoundError(404, "Staff is not found")
        }

        if(!(await ComparePassword(old_password, existStaff.rows[0].password))){
            throw new NotFoundError(404, "username or password is incorrect")
        }

        if (branch) {
            await pool.query("update staffs set branch = $1 where id =$2", [branch, id])
        }
        if (username) {
            await pool.query("update staffs set username = $1 where id =$2", [username, id])
        }
        if (new_password) {
            await pool.query("update staffs set password = $1 where id =$2", [new_password, id])
        }
        if (birthdate) {
            await pool.query("update staffs set birthdate = $1 where id =$2", [birthdate, id])
        }
        
        return {
            status: 200,
            message: "Staff successfully update"
        }


    }
}


export default new StaffService