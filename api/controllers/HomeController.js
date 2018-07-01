/**
 * HomeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 * @author      :: https://github.com/beingbishwa
 */

module.exports = {
  index: (req, res) => {
      const message = 'IOT backend is ready to get some requests'
      return ResponseService.json(200, res, message)
  }

};

