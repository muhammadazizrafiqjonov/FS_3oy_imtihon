import AdminService from "../services/admins.service.js"

class AdminController{
    constructor() { }
    
    async addAdmin(req, res, next){
        try {
            const data = await AdminService.addAdmin(req)
            if(data){
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    async getAllAdmins(req, res, next){
        try {
            const data = await AdminService.getAllAdmins()
            if(!data.length){
                return res.status(200).json({
                    status:200,
                    message:"Transports empty"
                })
            }

            return res.status(200).json({
                status:200,
                data
            })

        } catch (error) {
            next(error)            
        }
    }

     async getOneAdmin(req, res, next) {
            try {
                const data = await branchService.getOneAdmin(req)
    
                return res.status(200).json({
                    status: 200,
                    data
                })
    
            } catch (error) {
                next(error )
            }
        }
    

    async deleteAdmin(req, res, next) {
        try {
            const data = await AdminService.deleteAdmin(req)
            if (data) {
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

}

export default new AdminController()