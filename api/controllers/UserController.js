/**
 * UserController
 *
 * @description :: Server-side actions for handling user related incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 * @author      :: https://github.com/beingbishwa
 */

module.exports = {
  /**
   * `UserController.create()`
   */
  create: async function(req, res) {
    const allowedParameters = ["name", "email", "password", "user_level"]
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
    
  },

  /**
   * `UserController.findAll()`
   */
  findAll: async function (req, res) {
    
  },

  /**
   * `UserController.update()`
   */
  update: async function (req, res) {
    
  },

  /**
   * `UserController.delete()`
   */
  delete: async function (req, res) {
    
  },
  
  test: (req, res) => {
    return ResponseService.json(200, res, 'Data created succcessfully', {
        name: "bishwa",
        email: "bispoul181@gmail.com",
        password: "123abc"
    })
  }

};
