let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let courseSchema = new Schema({
    name : {
        type:String
    },
    description:{
        type:String
    },
    students : [{ type:mongoose.Schema.Types.ObjectId, ref:'Student' }],
    taughtBy:[{type:mongoose.Schema.Types.ObjectId,ref:'Teacher'}],
    credits: {type:Number},
    isLaborator:{type:Boolean},
    isSeminar:{type:Boolean},
    isCourse:{type:Boolean}
},{timestamps:true})

module.exports = mongoose.model('Course',courseSchema);
