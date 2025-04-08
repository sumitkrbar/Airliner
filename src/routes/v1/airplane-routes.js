const express = require('express')

const {AirplaneController} = require('../../controllers')
const {AirplaneMiddlewares} = require('../../middlewares')
const router = express.Router();

// /api/v1/airplanes POST
router.post('/', 
    
    AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.createAirplane);

router.patch('/',AirplaneMiddlewares.validateUpdateRequest,  AirplaneController.updateAirplane); // you still have to handle wrong IDs (when IDs does not match any entry)

    // /api/v1/airplanes GET
router.get('/', 
    AirplaneController.getAirplanes);

    // /api/v1/airplanes/:id GET
router.get('/:id', 
    AirplaneController.getAirplane);

    // /api/v1/airplanes/:id GET
router.delete('/:id', 
    AirplaneController.destroyAirplane);
    

module.exports = router;