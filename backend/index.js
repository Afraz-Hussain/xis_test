import express from 'express';
const app = express(); 
const port = process.env.PORT || 5000;
app.use(express.json())
import dotenv from "dotenv";
import dbconfig from "./dbconfig.js"
dbconfig();
dotenv.config();

// cors
import cors from "cors";
app.use(cors());
import authRoute from "./routes/auth_route.js"
import ImageRoute from "./routes/Image_route.js"

app.use("/api/auth",authRoute) // for register and login k lyia
app.use("/uploads", express.static("uploads"));
app.use("/api/images", ImageRoute);






app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
