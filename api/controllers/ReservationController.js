/**
 * ReservationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 * @author      :: https://github.com/beingbishwa
 */

module.exports = {
  

  /**
   * `ReservationController.create()`
   * 
   * @description :: Create a reservation for a device
   */
  create: async function (req, res) {
    return res.json({
      todo: 'create() is not implemented yet!'
    });
  },

  /**
   * `ReservationController.findAllForOne()`
   * @description :: Get all reservations for a device
   */
  findAllForOne: async function (req, res) {
    return res.json({
      todo: 'findAllForOne() is not implemented yet!'
    });
  },

  /**
   * `ReservationController.findOne()`
   * @description :: Get a particular reservation
   */
  findOne: async function (req, res) {
    return res.json({
      todo: 'findOne() is not implemented yet!'
    });
  },

  /**
   * `ReservationController.findAll()`
   * @description :: Get all reservations (admin will get all reservations | User will get his reservations)
   */
  findAll: async function (req, res) {
    return res.json({
      todo: 'findall() is not implemented yet!'
    });
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

