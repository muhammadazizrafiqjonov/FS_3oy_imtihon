import staffService from "../services/staff.service.js"

class StaffController{
    constructor() { }
    
    async register(req, res, next){
        try {
            const data = await staffService.register(req.body)
            if(data){
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const data = await staffService.login(req.body)
            if (data) {
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    async getAllStaffs(req, res, next){
        try {
            const data = await staffService.getAllStaffs()
            if(!data.length){
                return res.status(200).json({
                    status:200,
                    message:"Staffs empty"
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

    async getOneStaff(req, res, next) {
        try {
            const data = await staffService.getOneStaff(req.params)

            return res.status(200).json({
                status: 200,
                data
            })

        } catch (error) {
            next(error )
        }
    }

    async deleteStaff(req, res, next) {
        try {
            const data = await staffService.deleteStaff(req)
            if (data) {
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    async changeStaff(req, res, next) {
        try {
            const data = await staffService.changeStaff(req)
            if (data) {
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }
}

export default new StaffController()