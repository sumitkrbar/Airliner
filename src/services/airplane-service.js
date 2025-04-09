const {StatusCodes} = require('http-status-codes')
const { AirplaneRepository } = require('../repositories');
const {} = require('../repositories/airplane-repository');
const AppError = require('../utils/errors/app-error');
const { log } = require('winston');

const airplaneRepository = new AirplaneRepository();
async function createAirplane (data){
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        console.log("git error", error.name );
        
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane (data){
    
    try {
        const isAirplanePresent = await airplaneRepository.get(data.id);
        
        const airplane = await airplaneRepository.update(data);
        console.log(airplane);
        
        
        return airplane;
    } catch (error) {
        
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        if(error.statusCode==StatusCodes.NOT_FOUND) {
            throw new AppError(`No airplane found with id ${data.id}`, StatusCodes.NOT_FOUND)
        }
        
        throw new AppError('Cannot update Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not present', error.statusCode)
        }
        throw new AppError(`Cannot fetch data of the airplane with id ${id}`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id) {
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not present', error.statusCode)
        }
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR )
    }
}
module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}