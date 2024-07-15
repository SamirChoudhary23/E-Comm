import {Layout} from "../../components/Layout/Layout"
import {useState} from 'react'
import axios from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'
import toast from 'react-hot-toast'
import {useAuth} from "../../context/auth"
import "../../styles/AuthStyles.css";

export const Login=()=>{
	const [email,setEmail]=useState("");
	const [password,setPassword]=useState("");
	const [auth,setAuth]=useAuth()

	const navigate=useNavigate()
	const location=useLocation()
	//form function
	const handleSubmit= async (e)=>{
		e.preventDefault();
		try{
			const res= await axios.post(`/api/v1/auth/login`,
				{email,password}
			);
			if(res.data.success){
				toast.success(res.data.message)
				setAuth({
						...auth,
						user:res.data.user,
						token:res.data.token,
					});
				localStorage.setItem('auth',JSON.stringify(res.data))
				setTimeout(()=>{
					navigate(location.state || '/home');
				},3000);
			}else{
				toast.error(res.data.message)
			}
		}catch(error){
			console.log(error)
			toast.error('Something went wrong')
		}
	}

	return(
		<Layout title='Login - EComm'>
		<div className="form-container">
		<h1>Login</h1>
		<form onSubmit={handleSubmit}>
		

		  {/*Email*/}
		  <div className="form-group">
		    <label htmlFor="email">Email</label>
		    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  className="form-control" id="email" placeholder="Enter Email"  required />
		  </div>

		  {/*Password*/}
		  <div className="form-group">
		    <label htmlFor="password">Password</label>
		    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="form-control" id="password" placeholder="Enter Password" required />
		  </div>

		  <div className="mb-3">
		  <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot Password?</button>
		  </div>

		  <button type="submit" className="btn btn-primary">Login</button>

		</form>
		</div>
		</Layout>
	)
}