/**
 * ReservationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 * @author      :: https://github.com/beingbishwa
 */

const moment = require('moment')

const allowedParameters = ["start_time", "end_time", "_user"]

const validateDate = (start, end, format="MM-DD-YYYY HH:mm:ss") => {
  const start_time = moment(start, format, true)
  const end_time = moment(end, format, true)

  // check if date is in a given format
  if(!start_time.isValid() || !end_time.isValid()){
    return 'Error: Invalid date-time format'
  }
  
  // check isbefore
  if(end_time.isBefore(start_time)){
    return 'Error: Start-time should be before end-time'
  }

  return [start_time.unix(), end_time.unix()]
}

module.exports = {


  /**
   * `ReservationController.create()`
   * @description :: Create a reservation for a device
   * @route       :: POST /devices/:id/reserve
   * @param start_time :: should be string in the form '2014-01-05 12:45:57'
   * @param end_time :: should be string in a form '2014-01-05 12:45:57'
   */
  create: async function (req, res) {
    // get id from url
    const deviceid = req.params.id

    // check if such device exists
    try {
      if(await Device.count({id:deviceid}) == 0){
        return ResponseService.json(400, res, 'No such device exists')
      }
    } catch (err) {
      return ResponseService.json(500, res, 'Internal Server Error') 
    }

    // pick allowed parameter
    const data = _.pick(req.body, allowedParameters)
    data._device = deviceid

    const validationResult = validateDate(data.start_time, data.end_time)

    if(typeof(validationResult) == 'string'){
      return ResponseService.json(400, res, validationResult)
    }else if(typeof(validationResult) == 'object'){
      [data.start_time, data.end_time] = validationResult
    }

    // create new reservation
    try {
      const reservation = await Reservation.create(data).fetch()
      return ResponseService.json(201, res, 'Device reserved successfully', reservation)
    } catch (err) {
      res.json(err)
    }
  },

  /**
   * `ReservationController.findAllForOne()`
   * @description :: Get all reservations for a device
   * @route       :: GET /devices/:id/reservations
   */
  findAllForOne: async function (req, res) {
    // get device id
    const id = req.params.id
    if(!id){
      return ResponseService.json(400, res, 'Missing parameter: device-id')
    }

    // get reservations for device
    try {
      const reservations = await Reservation.find({_device: id})
      if(reservations.length == 0){
        return ResponseService.json(200, res, 'No reservations yet for the device')  
      }
      return ResponseService.json(200, res, 'Reservations found successfully', reservations)
    } catch (err) {
      return res.json(err)
    }
  },

  /**
   * `ReservationController.findOne()`
   * @description :: Get a particular reservation
   */
  findOne: async function (req, res) {
    // get id
    const id = req.params.id
    if(!id){
      return ResponseService.json(400, res, 'Missing parameter: device-id')
    }
    // find reservation
    try {
      const reservation = await Reservation.findOne({id})
      if(!reservation){
        return ResponseService.json(404, res, 'Reservation not found')
      }
      return ResponseService.json(200, res, 'Reservation found successfully', reservation)
    } catch (err) {
      return res.json(err)
    }
  },

  /**
   * `ReservationController.findAll()`
   * @description :: Get all reservations of a user
   */
  findAll: async function (req, res) {
    try{
      const reservations = await Reservation.find()
      if(reservations.length == 0){
        return ResponseService.json(200, res, 'No reservations by this user')
      }
      return ResponseService.json(200, res, 'Reservations found successfully', reservations)
    }catch(err){
      return res.json(err)
    }
  },

  /**
   * `ReservationController.update()`
   * @description :: Update a reservation
   */
  update: async function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },

  /**
   * `ReservationController.delete()`
   * @description :: Delete a reservation
   */
  delete: async function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }

};

