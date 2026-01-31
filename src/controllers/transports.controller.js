import TransportService from "../services/transports.service.js"

class TransportsController{
    constructor() { }
    
    async addTransport(req, res, next){
        try {
            const data = await TransportService.addTransport(req)
            if(data){
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    async getAllTransports(req, res, next){
        try {
            const data = await TransportService.getAllTransports()
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

    async deleteTransport(req, res, next) {
        try {
            const data = await TransportService.deleteTransport(req)
            if (data) {
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    async changeTransport(req, res, next) {
        try {
            const data = await TransportService.changeTransport(req)
            if (data) {
                return res.status(data.status).json(data)
            }
        } catch (error) {
            next(error)
        }
    }
}

export default new TransportsController()