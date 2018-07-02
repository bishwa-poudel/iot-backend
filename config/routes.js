/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  // home route
  'GET /': 'HomeController.index',

  // user routes
  'POST /users': 'UserController.create',
  'GET /users': 'UserController.findAll',
  'GET /users/:id': 'UserController.findOne',
  'PUT /users/:id': 'UserController.update',
  'DELETE /users/:id': 'UserController.delete',

  // device routes
  'POST /devices': 'DeviceController.create',
  'GET /devices': 'DeviceController.findAll',
  'GET /devices/:id': 'DeviceController.findOne',
  'PUT /devices/:id': 'DeviceController.update',
  'DELETE /devices/:id': 'DeviceController.delete',
  
  // reservation routes
  'POST /devices/:id/reserve': 'ReservationController.create',
  'GET /devices/:id/reservations': 'ReservationController.findAllForOne',
  'GET /reservations' : 'ReservationController.findAll',
  'GET /reservations/:resid': 'ReservationController.findOne',
  'PUT /reservations/:id': 'ReservationController.update',
  'DELETE /reservations/:id': 'ReservationController.delete',
  


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
