var mongoose = require('mongoose');
var UsersSchema = require('../schemas/UsersSchema');
var Users = mongoose.model('Users',UsersSchema);
module.exports = Users;