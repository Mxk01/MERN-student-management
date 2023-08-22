let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let groupSchema = new Schema({
    name : {
        type:String
    },
    students : [{ type:mongoose.Schema.Types.ObjectId, ref:'User' }],
    teachers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    courses:[{type:mongoose.Schema.Types.ObjectId,ref:'Course'}],

},{timestamps:true})

module.exports = mongoose.model('Group',groupSchema);
