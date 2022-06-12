const mongoose = require('mongoose');
const connection= async(req,res)=>{
    try{
        const conn = await mongoose.connect(`mongodb+srv://admin:daicalongbn01@cluster0.aoddsw9.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Database connected!")
    }catch(err){
         console.log(err);
    }
}

module.exports=connection;