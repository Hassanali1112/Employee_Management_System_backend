import connectDB from "./db/index.js";
import { User } from "./models/users.model.js";

const addAdmin = async () => {
  
  try {
    console.log("before creation")
    const admin = await User.create(
      {
        name : "Hassan ali",
        email : "dev.hassanali63@gmail.com",
        password : "Hassan0312@",
        role : "admin"
      }
    )
    console.log("admin created successfully!")
  } catch (error) {
    console.log("admin creation error :", error)
  }
}
connectDB()
.then(()=>{
  addAdmin()
})

