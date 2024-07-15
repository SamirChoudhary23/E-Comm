import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import jwt from 'jsonwebtoken'
import ConnectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from 'cors'
// import path from 'path'
// import {fileURLToPath} from 'url'

//configure env
dotenv.config()

//database config
ConnectDB()

//esmodule fix
// const __filename=fileURLToPath(import.meta.url);
// const __dirname=path.dirname(__filename);

//rest object
const app=express()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
// app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);


//for production
// app.use('*',function(req,res){
// 	res.sendFile(path.join(__dirname,"./client/build/index.html"));
// })


//rest api
//for localhost
app.get("/",(req,res)=>{
	res.send(
		"<h1>Heljlo</h1>"
	);
});

//PORT
const PORT=process.env.PORT ;

app.listen(PORT,()=>console.log(`Server running on ${process.env.DEV_MODE} mode on PORT ${PORT}`.white.bold))