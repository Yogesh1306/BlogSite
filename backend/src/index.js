import dotenv from "dotenv"
import { connectDB } from "./db/index.js"
import { app } from "./app.js"
import { Category } from "./models/category.model.js"

dotenv.config({
    path: "./.env"
})

connectDB()
.then(async ()=>{
    const port = process.env.PORT || 8000;

    app.listen(port, ()=>{
        console.log(`Server running at http://localhost:${port}`);
        
    })
})
.catch((err)=>{
    console.log("Error connecting Database!!\nError: ",err);
    
})