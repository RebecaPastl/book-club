const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name:{
        type:String, 
        required:[true, 'You must enter a user name.'],
        minlength: [5, 'You need to enter a name with at least 5 characters.']
    },
    avatar:{
        type:String,
        required:[true, 'You must choose an avatar.']
    }
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;