/**
 * DeviceController
 *
 * @description :: Server-side actions for handling device related incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 * @author      :: https://github.com/beingbishwa
 */

const allowedParameters = ["name"]
module.exports = {
  /**
   * `DeviceController.create()`
   */
  create: async function (req, res) {
    // pick required fields
    const data = _.pick(req.body, allowedParameters)
    try{
      const device = await Device.create(data).fetch()
      return ResponseService.json(201, res, 'Device added successfully', device)
    }catch(err){
      return res.json(err)
    }
  },

  /**
   * `DeviceController.findone()`
   */
  findone: async function (req, res) {
    // get id
    const id = req.params.id
    if(!id){
      return ResponseService.json(400, res, 'Missing parameter: id')
    }
    // find device
    try {
      const device = await Device.findOne({id})
      if(!device){
        return ResponseService.json(404, res, 'Device not found')
      }
      return ResponseService.json(200, res, 'Device found successfully', device)
    } catch (error) {
      return res.json(err)
    }
  },

  /**
   * `DeviceController.findall()`
   */
  findall: async function (req, res) {
    let limit = parseInt(req.query.limit) || 3
    let totalPages = Math.ceil(await Device.count()/limit)
    let page = req.query.page ? parseInt(req.query.page) : 1
    if(req.query.page > totalPages) {
      return ResponseService.json(404, res, 'Page number exceeded')
    }
    try {
      const devices = await Device.find({limit, skip: limit*(page-1)})
      var previous = page!=1 ? `/devices?page=${page-1}&limit=${limit}` : null
      const next = page < totalPages ? `/devices?page=${page + 1}&limit=${limit}` : null
      const meta = {totalPages, previous, next}
      if(devices.length == 0){
        return ResponseService.json(404, res, 'No devices exist')
      }
      return ResponseService.json(200, res, 'Devices found successfully', devices, meta)
    } catch (error) {
      return res.json(err)
    }
  },

  /**
   * `DeviceController.update()`
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
      if(await Device.count({id})){
        const device = await Device.update({id}, data).fetch()
        return ResponseService.json(200, res, 'Device updated successfully', device)
      }
      return ResponseService.json(404, res, 'Device not found')
    }catch(err){
      return res.json(err)
    }
  },

  /**
   * `DeviceController.delete()`
   */
  delete: async function (req, res) {
    // get id
    const id = req.params.id
    if(!id){
      return ResponseService.json(400, res, 'Missing parameter: id')
    }
    // delete device
    try{
      if(await Device.count({id})){
        const device = await Device.destroy({id}).fetch()
        return ResponseService.json(200, res, 'Device removed successfully', device)
      }
      return ResponseService.json(404, res, 'Device not found')
    }catch(err){
      return res.json(err)
    }
  }

};

