import mongoose from 'mongoose'

const glbuploaderschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    fileId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'glbmodels.files'
    }
},
{timestamps:true}

)

const glbuploader=  mongoose.model("glbuploader",glbuploaderschema)

export default glbuploader;