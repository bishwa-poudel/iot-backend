/**
 * UserController
 *
 * @description :: Server-side actions for handling user related incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 * @author      :: https://github.com/beingbishwa
 */

const allowedParameters = ["name", "email", "password", "user_level"]
module.exports = {
  /**
   * `UserController.create()`
   */
  create: async function(req, res) {
    // pick required fields
    const data = _.pick(req.body, allowedParameters)
    try{
      const user = await User.create(data).fetch()
      return ResponseService.json(201, res, 'User created successfully', user)
    }catch(err){
      return res.json(err)
    }
  },

  /**
   * `UserController.findOne()`
   */
  findOne: async function (req, res) {
    // get id
    const id = req.params.id
    if(!id){
      return ResponseService.json(400, res, 'Missing parameter: id')
    }
    // find user
    try {
      const user = await User.findOne({id})
      console.log(user)
      if(!user){
        return ResponseService.json(404, res, 'User not found')
      }
      return ResponseService.json(200, res, 'User found successfully', user)
    } catch (error) {
      return res.json(err)
    }
  },

  /**
   * `UserController.findAll()`
   */
  findAll: async function (req, res) {
    let limit = parseInt(req.query.limit) || 3
    let totalPages = Math.ceil(await User.count()/limit)
    let page = req.query.page ? parseInt(req.query.page) : 1
    if(req.query.page > totalPages) {
      return ResponseService.json(404, res, 'Page number exceeded')
    }
    try {
      const users = await User.find({limit, skip: limit*(page-1)})
      var previous = page!=1 ? `/users?page=${page-1}&limit=${limit}` : null
      const next = page != totalPages ? `/users?page=${page + 1}&limit=${limit}` : null
      const meta = {totalPages, previous, next}
      if(users.length == 0){
        return ResponseService.json(404, res, 'No user exists')
      }
      return ResponseService.json(200, res, 'Users found successfully', users, meta)
    } catch (error) {
      return res.json(err)
    }
  },

  /**
   * `UserController.update()`
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
      if(await User.count({id})){
        const user = await User.update({id}, data).fetch()
        return ResponseService.json(200, res, 'User updated successfully', user)
      }
      return ResponseService.json(404, res, 'User not found')
    }catch(err){
      return res.json(err)
    }
  },

  /**
   * `UserController.delete()`
   */
  delete: async function (req, res) {
    // get id
    const id = req.params.id
    if(!id){
      return ResponseService.json(400, res, 'Missing parameter: id')
    }
    // delete user
    try{
      if(await User.count({id})){
        const user = await User.destroy({id}).fetch()
        return ResponseService.json(200, res, 'User removed successfully', user)
      }
      return ResponseService.json(404, res, 'User not found')
    }catch(err){
      return res.json(err)
    }
  },
  
  test: (req, res) => {
    return ResponseService.json(200, res, 'Data created succcessfully', {
        name: "bishwa",
        email: "bispoul181@gmail.com",
        password: "123abc"
    })
  }

};
