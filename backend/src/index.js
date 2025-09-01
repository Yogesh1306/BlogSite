import dotenv from "dotenv"
import { connectDB } from "./db/index.js"
import { app } from "./app.js"
import { Category } from "./models/category.model.js"

dotenv.config({
    path: "./.env"
})

// const seedCategories = async ()=>{
//     const categories = ["Science", "Technology", "Education", "Fiction", "History", "Life", "Travel", "Photography", "Food", "Drinks", "Perfumes", "Health"];

//     // Clean array → remove empty & trim spaces
//     const cleanCategories = categories
//     .map(c => c.trim())  // remove extra spaces
//     .filter(c => c.length > 0); // remove empty strings

//     for( const name of cleanCategories){

//         await Category.findOneAndUpdate(
//             {name},
//             {name},
//             {
//                 upsert: true,
//                 new: true 
//             }
//         )
//     };

//     console.log("categories Inserted successfully");
    
// }

connectDB()
.then(async ()=>{
    const port = process.env.PORT || 8000;

    // Seed categories here
    // await seedCategories();

    app.listen(port, ()=>{
        console.log(`Server running at http://localhost:${port}`);
        
    })
})
.catch((err)=>{
    console.log("Error connecting Database!!\nError: ",err);
    
})