import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())
app.use("/public",express.static(path.join(process.cwd(), "public")))

//importing routes
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import errorHandler from "./middlewares/error.middleware.js"

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/posts", postRoutes)
app.use("/api/v1/categories", categoryRoutes)

app.use(errorHandler);

export {app}