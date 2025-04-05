const {Logger} = require('../config')
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(Data){
        
        const response = await this.model.create(Data);
        return response;
        
    }

    async destroy(Data){
        const response = await this.model.destroy({
            where: {
                id: Data
            }
        })

        if(!response){ 
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND)
        }
        return response;
    }

    async get(Data){
        const response = await this.model.findByPk(Data);
        
        //console.log(response);
        
        if(!response){ 
                       
            throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND)
        }
        return response;
    }

    async getAll(Data){
        const response = await this.model.findAll();
        return response;
    }

    async update(id, data){ //data → {col: cal, ...}
        const response = await this.model.update(Data, {
            where: {
                id: id
            }
        });
        return response;
    }
}


module.exports = CrudRepository;