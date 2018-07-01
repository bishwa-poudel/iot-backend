/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 * @author      :: https://github.com/beingbishwa
 */

module.exports = {
  test: (req, res) => {
    return ResponseService.json(200, res, 'Data created succcessfully', {
        name: "bishwa",
        email: "bispoul181@gmail.com",
        password: "123abc"
    })
  }

};
