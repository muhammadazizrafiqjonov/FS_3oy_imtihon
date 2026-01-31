import pool from "../database/config.js"
import { extname } from "path"
import { ComparePassword, HashPassword } from "../utils/bcrypt.js"
import JWT from "jsonwebtoken"
import { BadrequestError, ConflictError, InternalServerError, NotFoundError } from "../utils/error.js"
import { join } from "path"

class transportService{

    constructor() { }
    
    async addTransport(req){
        const { branch, model, color, price } = req.body
        const { img } = req.files

        const fileName = new Date().getTime() + extname(img.name)
        
        const existTransport = await pool.query("select * from transports where model=$1 and branch=$2", [model, branch])
        

        if(existTransport.rowCount){
            throw new ConflictError(409, "Transport already exist")
        }

        await pool.query("insert into transports(branch, model, color, img, price) values($1, $2,$3, $4, $5) RETURNING *",
            [branch, model, color, fileName, price]
        )

        file.mv(join(process.cwd(), "src", "uploads", "pictures", fileName), (err) => {
            if(err){
                throw new InternalServerError(500, err)
            }
        })

        return {
            status:201,
            message: "New transport successfully created"
        }
    }

    async getAllTransports(){
        const transports = await pool.query("select * from transports")

        return transports.rows

    }

    async deleteTransport(req) {
        
        const { id } = req.params

        const existTransport = await pool.query("select * from transports where id=$1", [id])

        if (!existTransport.rowCount) {
            throw new NotFoundError(404, "transport is not found") 
        }

        await pool.query("delete * from transports where id = $1", [id])

        return {
            status: 200,
            message:"transport successfully deleted"
        }
    }

    async changeTransport(req) {
        const { branch, model, color, price } = req.body
        const { img } = req.files

        const { id } = req.params

        const fileName = new Date().getTime() + extname(img.name)

        const existName = await pool.query("select * from branches where name=$1", [name])

        if (!existName.rowCount) {
            throw new ConflictError(409, "There is no branch with this name")
        } 

        const existTransport = await pool.query("select * from transports where id=$1", [id])

        if (!existTransport.rowCount) {
            throw new NotFoundError(404, "Transport is not found")
        }

        if (branch) {
            await pool.query("update transports set branch = $1 where id =$2", [branch, id])
        }
        if (model) {
            await pool.query("update transports set model = $1 where id =$2", [model, id])
        }
        if (color) {
            await pool.query("update transports set color = $1 where id =$2", [color, id])
        }
        if (price) {
            await pool.query("update transports set price = $1 where id =$2", [price, id])
        }
        if (img) {
            await pool.query("update transports set img = $1 where id = $2", [fileName, id])
        }

        fs.unlinkSync(join(process.cwd(), "src", "uploads", "pictures", existTransport.rows[0].img))

        file.mv(join(process.cwd(), "src", "uploads", "pictures", fileName), (err) => {
            if(err){
                throw new InternalServerError(500, err)
            }
        })
        
        return {
            status: 200,
            message: "Transport successfully update"
        }


    }
}


export default new transportService