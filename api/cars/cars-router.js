// DO YOUR MAGIC
const Car = require('./cars-model')
// const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique} = require('./cars-middleware')
const router = require('express').Router()
router.get('/', async (req, res, next) => {
    try {
        const data = await Car.getAll()
        res.json(data)
    }
    catch(err) {
        next(err)
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        const data = await Car.getById(req.params.id)
        res.json(data)
    }
    catch(err) {
        next(err)
    }
})
router.post('/', async (req, res, next) => {
    try {
        const data = await Car.create(req.body)
        res.json(data)
    }
    catch(err) {
        next(err)
    }
})
module.exports = router