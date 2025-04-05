const {Logger} = require('../config')

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
        return response;
    }

    async get(Data){
        const response = await this.model.findByPk(Data);
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