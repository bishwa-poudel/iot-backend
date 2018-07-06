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

// check if device is already reserved
const isReserved = async (start, end, deviceid) => {
  // check if there overlap in time ranges
  try {
    const reservation = await Reservation.find({_device: deviceid, start_time: {'<': end}, end_time: {'>': start}})
    if(reservation.length == 0){
      return [false]
    }
    return [true, reservation]
  } catch (err) {
    res.json(err)
  }
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

    // check if device is already reserved in that time
    const status = await isReserved(data.start_time, data.end_time, data._device)
    if(status[0]){
      return ResponseService.json(200, res, 'Sorry: Time period overlaps with other reservation', status[1]) 
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
   * @route       :: GET /reservations/:id
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
   * @route       :: GET /reservations
   */
  findAll: async function (req, res) {
    let limit = parseInt(req.query.limit) || 3
    let totalPages = Math.ceil(await Reservation.count()/limit)
    let page = req.query.page ? parseInt(req.query.page) : 1
    if(req.query.page > totalPages) {
      return ResponseService.json(404, res, 'Page number exceeded')
    }
    try {
      const reservations = await Reservation.find({limit, skip: limit*(page-1)})
      var previous = page!=1 ? `/reservations?page=${page-1}&limit=${limit}` : null
      const next = page != totalPages ? `/reservations?page=${page + 1}&limit=${limit}` : null
      const meta = {totalPages, previous, next}
      if(reservations.length == 0){
        return ResponseService.json(404, res, 'No reservations done')
      }
      return ResponseService.json(200, res, 'Reservations found successfully', reservations, meta)
    } catch (error) {
      return res.json(err)
    }
  },

  /**
   * `ReservationController.update()`
   * @description :: Update a reservation
   * @route       :: PUT /reservations/:id
   */
  update: async function (req, res) {
    // get id
    const id = req.params.id
    if(!id){
      return ResponseService.json(400, res, 'Missing parameter: id')
    }
    // get data
    const data = _.pick(req.body, allowedParameters)
    // update data
    try{
      if(await Reservation.count({id})){
        const reservation = await Reservation.update({id}, data).fetch()
        return ResponseService.json(200, res, 'Reservation rescheduled successfully', reservation)
      }
      return ResponseService.json(404, res, 'Reservation not found')
    }catch(err){
      return res.json(err)
    }
  },

  /**
   * `ReservationController.delete()`
   * @description :: Delete a reservation
   * @route       :: DELETE /reservations/:id
   */
  delete: async function (req, res) {
    // get id
    const id = req.params.id
    if(!id){
      return ResponseService.json(400, res, 'Missing parameter: id')
    }
    // delete reservation
    try{
      if(await Reservation.count({id})){
        const reservation = await Reservation.destroy({id}).fetch()
        return ResponseService.json(200, res, 'Reservation removed successfully', reservation)
      }
      return ResponseService.json(404, res, 'Reservation doesn\'t exist')
    }catch(err){
      return res.json(err)
    }
  }

};

