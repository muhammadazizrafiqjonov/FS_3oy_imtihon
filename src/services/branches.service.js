import pool from "../database/config.js"
import { ConflictError, NotFoundError } from "../utils/error.js"

class branchService{

    constructor() { }
    
    async addBranch(req){
        const { name, address } = req.body
        
        const existBranch = await pool.query("select * from branches where name=$1", [name])
        

        if(existBranch.rowCount){
            throw new ConflictError(409, "Branch already exist")
        }

        await pool.query("insert into branches(name, address) values($1, $2) RETURNING *",
            [name, address]
        )

        return {
            status:201,
            message: "New branch successfully created"
        }
    }

    async getAllBranches(){
        const branches = await pool.query("select * from branches")

        return branches.rows

    }

    async getOneBranch(req) {

        const { id } = req.params
 
        const existBranch = await pool.query("select * from branches where id=$1", [id])

        if (!existBranch.rowCount) {
            throw new NotFoundError(404, "branch is not found")
        }

        return existBranch.rows
    }

    async deleteBranch(req) {
        
        const { id } = req.params

        const existBranch = await pool.query("select * from branches where id=$1", [id])

        if (!existBranch.rowCount) {
            throw new NotFoundError(404, "branch is not found") 
        }

        await pool.query("delete * from branches where id = $1", [id])

        return {
            status: 200,
            message:"Branch successfully deleted"
        }
    }

    async changeBranch(req) {
        const { name, address} = req.body

        const { id } = req.params

        const existName = await pool.query("select * from branches where name=$1", [name])

        if (existName.rowCount) {
            throw new ConflictError(409, "There is a branch with this name")
        } 

        const existBranch = await pool.query("select * from branches where id=$1", [id])

        if (!existBranch.rowCount) {
            throw new NotFoundError(404, "branch is not found")
        }

        if (name) {
            await pool.query("update branches set name = $1 where id =$2", [name, id])
        }
        if (address) {
            await pool.query("update branches set address = $1 where id =$2", [address, id])
        }
        
        return {
            status: 200,
            message: "branch successfully update"
        }


    }
}


export default new branchService