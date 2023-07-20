const mongoose = require('mongoose')
// const victor = "/home/smit/Desktop/project/client/src/components/screens/1st.jpg"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    pic:{
        type:String,
        default:"http://res.cloudinary.com/dszvlltey/image/upload/v1689682576/t59gbny0ptkfh6vretir.webp"
    }
})

mongoose.model('User',userSchema)