let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let userSchema = new Schema({
    username : {
        type:String
    },
    
    email:{
        type:String
    },
    cnp:{
        type:String,
        // required:true
    },

    password:{
        type:String
    },
    an : {
        type:String,
        default:''
    },
    departament: {
        type:String,
        default:''
    },
    courses:[{type:mongoose.Schema.Types.ObjectId,ref:'Course'}],
    teachers : [{ type:mongoose.Schema.Types.ObjectId, ref:'User' }],
    students : [{ type:mongoose.Schema.Types.ObjectId, ref:'User' }],
    note: [ {type:mongoose.Schema.Types.ObjectId, ref:'User' }],
    isStudent:{
        type:Boolean
    },
    isTeacher : {type:Boolean},
    
    isAdmin : {
        type:Boolean
    },
    hasTeacherCode:{
        type:Boolean
    },
      
    isPresent : {type:Boolean},
    hasFailedClasses: {type:Boolean},
    resetPasswordToken : {type:String},
    resetPasswordExpire : {type:Date}
},{timestamps:true})

module.exports = mongoose.model('User',userSchema);