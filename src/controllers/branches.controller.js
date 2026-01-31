import branchService from "../services/branches.service.js"

class BranchController{
    constructor() { }
    
    async addBranch(req, res, next){
        try {
            const data = await branchService.addBranch(req)
            if(data){
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    async getAllBranches(req, res, next){
        try {
            const data = await branchService.getAllBranches()
            if(!data.length){
                return res.status(200).json({
                    status:200,
                    message:"Branches empty"
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

    async getOneBranch(req, res, next) {
        try {
            const data = await branchService.getOneBranch(req)

            return res.status(200).json({
                status: 200,
                data
            })

        } catch (error) {
            next(error )
        }
    }

    async deleteBranch(req, res, next) {
        try {
            const data = await branchService.deleteBranch(req)
            if (data) {
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    async changeBranch(req, res, next) {
        try {
            const data = await branchService.changeBranch(req)
            if (data) {
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }
}

export default new BranchController()