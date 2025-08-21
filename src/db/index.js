import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"
import dotenv from "dotenv"

dotenv.config({
  path : "./.env"
})


 const connectDB = async () =>{
  try {

   const dbInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    console.log("DB host : ",dbInstance.connection.host)
    
  } catch (error) {
    console.log(error)
  }
}
export default connectDB