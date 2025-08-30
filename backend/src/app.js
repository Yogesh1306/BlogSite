import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json({limit: "16kb"}))
app.use(urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

//importing routes
import userRoutes from "./routes/user.routes.js"

app.use("/api/v1/users", userRoutes)



export {app}