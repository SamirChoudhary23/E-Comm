import mongoose from 'mongoose'
import colors from 'colors'

const ConnectDB=async()=>{
	try{
		const conn=await mongoose.connect(process.env.MONGO_URI)
		console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
	}catch(error){
		console.log(error)
		process.exit(1)
	}
}
export default ConnectDB