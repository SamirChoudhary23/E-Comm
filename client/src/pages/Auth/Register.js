import {Layout} from "../../components/Layout/Layout"
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import "../../styles/AuthStyles.css";

export const Register=()=>{
	const [name,setName]=useState("");
	const [email,setEmail]=useState("");
	const [phone,setPhone]=useState("");
	const [address,setAddress]=useState("");
	const [password,setPassword]=useState("");
	const [answer,setAnswer]=useState("");
	const navigate=useNavigate()

	//form function
	const handleSubmit= async (e)=>{
		e.preventDefault();
		try{
			const res= await axios.post(`/api/v1/auth/register`,
				{name,email,phone,address,password,answer}
			);
			if(res && res.data.success){
				toast.success(res.data && res.data.message);

				setTimeout(()=>{
					navigate('/login');
				},1000);
			}else{
				toast.error(res.data.message)
			}
		}catch(error){
			console.log(error)
			toast.error('Something went wrong')
		}
	}

	return(
		<Layout title='Register - EComm'>
		<div className="form-container">
		<h1>Register</h1>
		<form onSubmit={handleSubmit}>
		{/*Name*/}
		  <div className="form-group">
		    <label htmlFor="name">Name</label>
		    <input type="text" value={name} 
		    onChange={(e)=>setName(e.target.value)} className="form-control" id="name" placeholder="Enter Name" required />
		    
		  </div>

		  {/*Email*/}
		  <div className="form-group">
		    <label htmlFor="email">Email</label>
		    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  className="form-control" id="email" placeholder="Enter Email"  required />
		    
		  </div>

		  {/*Phone*/}
		  <div className="form-group">
		    <label htmlFor="phone">Phone</label>
		    <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)}  className="form-control" id="phone" placeholder="Enter Phone Number" required />
		    
		  </div>

		  {/*Address*/}
		  <div className="form-group">
		    <label htmlFor="address">Address</label>
		    <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)}  className="form-control" id="address" placeholder="Enter Address" required />
		    
		  </div>

		  {/*Password*/}
		  <div className="form-group">
		    <label htmlFor="password">Password</label>
		    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="form-control" id="password" placeholder="Enter Password" required />
		  </div>

		  {/*Answer*/}
		  <div className="form-group">
		    <label htmlFor="answer">Answer</label>
		    <input type="text" value={answer}  onChange={(e)=>setAnswer(e.target.value)}  className="form-control" id="address" placeholder="Your Favourite Sports" required />
		  </div>

		  <button type="submit" className="btn btn-primary">Submit</button>

		</form>
		</div>
		</Layout>
	)
}