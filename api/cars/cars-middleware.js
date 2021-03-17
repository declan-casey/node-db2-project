const Car = require("./cars-model");
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await Car.getById(req.params.id);
    if(!car){
      res.status(404).json({
        message: "This car could not be found"
      })
    } else{
      req.car = car
      next()
    }
  } catch(err){
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const vin = req.body.vin
    const make = req.body.make
    const model = req.body.model
    const mileage = req.body.vin

    if (!vin || !make || !model || !mileage){
      res.status(400).json({
        message: "Please fill out the required fields"
      })
    } else if (typeof vin !== "string"){
        res.status(400).json({
          message: "Vin must be a string"
        })
    } else if (typeof make !== "string"){
        res.status(400).json({
          message: "Make must be a string"
        })
    } else if (typeof model !== "string"){
        res.status(400).json({
          message: "Model must be a string"
        })
    } else if (typeof vin !== "string"){
        res.status(400).json({
          message: "Vin must be a string"
        })
}
  } catch(err){
    res.status(500).json(err);
    next();
  }
}

const checkVinNumberValid = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const newVin = await Car.create(req.body.vin)
    let validVin = vinValidator.validate(newVin);
    return validVin
  } catch (err){
      res.status(500).json({err})
      next();
  }

}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const car = await Car.getAll();
    const result = car.filter( vehicle=> {
      if(vehicle.vin === req.body.vin.trim()){
        return vehicle
      }
    });
    if(result.length > 0){
      res.status(400).json({
        message: "This VIN already exists"
      })
    } else{
      next()
    }
  } catch(err){
    next(err)
  }
}
