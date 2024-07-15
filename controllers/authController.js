import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import {hashPassword, comparePassword} from "../helpers/authHelper.js"
import jwt from 'jsonwebtoken'

export const registerController=async(req,res)=>{
	try{
	const {name,email,password,phone,address,answer}=req.body
	//validation
	if(!name || !email || !password || !phone || !address || !answer){
		return res.send({message:'Please  fill all details'})
	}
	//check user
	const existingUser= await userModel.findOne({email})
	//existing user
	if(existingUser){
		return res.status(200).send({
			success:false,
			message:'Already Registered Please login',
		})
	}

	//Register user
	const hashedPassword=await hashPassword(password)

	//save
	const user=await new userModel({name, email, phone, address, password:hashedPassword,answer}).save()

	res.status(201).send({
		success:true,
		message:'User registered Successfully',
		user,
	})


	}catch(error){
		console.log(error)
		res.status(500).send({
			success:false,
			message:'Error in registration',
			error
		})
	}
}

//login controller
export const loginController =async (req,res)=>{
	try{
	const {email, password}=await req.body
	if(!email || !password){
		return res.status(400).send({
			success:false,
			message:'Please enter credentials',
		})
	}

	//check user
	const user=await userModel.findOne({email})
	if(!user){
		return res.status(404).send({
			success:false,
			message:'Email not registered'
		})
	}

	const match= await comparePassword(password, user.password)
	if(!match){
		return res.status(200).send({
			success:false,
			message:'Invalid password',
		})
	}

	//token
	const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'30d'});

	res.status(200).send({
		success:true,
		message:'Login Successfully',
		user:{
			name: user.name,
			email:user.email,
			phone:user.phone,
			address:user.address,
			role:user.role,
		},
		token,
	});

	}catch(error){
		console.log(error)
		res.status(500).send({
			success:false,
			message:'Error in login',
			error
		})
	}
}

//forgotPasswordController
export const forgotPasswordController=async(req,res)=>{
	try{
		const {email,answer,newPassword}=req.body
		if(!email || !answer || !newPassword){
			res.status(400).send({
				message:'Fill all fields',
			})
		}
		//check email and answer
		const user=await userModel.findOne({email,answer})
		//validation
		if(!user){
			return res.status(404).send({
				success:false,
				message:'Wrong email or answer',
			})
		}

		const hashed=await hashPassword(newPassword)
		await userModel.findByIdAndUpdate(user._id,{password:hashed});
		res.status(200).send({
			success:true,
			message:'Password reset successfully',
		});

	}catch(error){
		console.log(error)
		res.status(500).send({
			success:false,
			message:'Something went wrong',
			error
		})
	}
}


//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};


//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};


//All orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};



