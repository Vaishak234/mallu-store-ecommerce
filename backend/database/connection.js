const mongoose = require('mongoose')

const connectMongoDB = async () => {
    
    try {
       const connection = await mongoose.connect(process.env.MONGO_URL,{
         useNewUrlParser: true,
         useUnifiedTopology: true
       });
        
       console.log('Mongodb connected to server');
    
   } catch (error) {
       console.log(error);
   }
}

module.exports = connectMongoDB