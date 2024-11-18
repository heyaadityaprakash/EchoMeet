import mongoose, { Schema } from "mongoose";

const meetingSchema=new Schema({
    user_id:{type:String},
    meetingCode:{type:String,required:true},
    date:{type:date,default:Date.now,required:true}

})

const Meeting=mongoose.model(Meeting,meetingSchema)
export {Meeting}

//{} is used in export in order to export multiple data at once if {} is not then few data can be exported.
