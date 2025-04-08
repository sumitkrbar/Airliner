const {StatusCodes} = require('http-status-codes')
const { AirplaneService } =  require('../services');
const {ErrorResponse} = require('../utils/common')
const AppError = require('../utils/errors/app-error')
function validateCreateRequest(req, res, next){
    if(!req.body.modelNumber){
        ErrorResponse.message = 'Something went wrong while creating airplane';
        ErrorResponse.error = new AppError(['Model Number not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST)
        return res 
                .status(StatusCodes.BAD_REQUEST)
                .json({ErrorResponse}) 

    }
    next();
}

async function validateUpdateRequest(req, res, next){
    if(!req.body) {
        ErrorResponse.message = 'Something went wrong while updating airplane';
        ErrorResponse.error = new AppError(['Data not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.id) {
        ErrorResponse.message = 'Something went wrong while updating airplane';
        ErrorResponse.error = new AppError(['Airplane ID not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}