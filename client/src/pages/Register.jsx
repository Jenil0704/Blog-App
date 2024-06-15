import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useState } from "react"
import axios from 'axios'
import {URL} from '../url'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const navigate=useNavigate()

  const handleRegister=async ()=>{
    
    try{
      const res=await axios.post(URL+"/api/auth/register",{username,email,password})
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
      setError(false)
      navigate("/login");
      toast.success('Account Created Successfully!', {
        position: "top-right",
      closeOnClick : true});      
    }
    catch(err){
      setError(true)
      toast.error('Registration Failed! Please Try Again', {
        position: "top-right",
        closeOnClick: true,
        });
      console.log(err)
    }

  } 
  return (
    <>
    <div className="bg-zinc-900 h-screen">  
      <div className="flex items-center justify-between text-white px-6 md:px-[200px] py-4">
    <h1 className="text-lg md:text-xl font-bold "><Link to="/">Blog Market</Link></h1>
    <h3><Link to="/login">Login</Link></h3>
    </div>
    <div className="w-full flex justify-center items-center h-[80vh] ">
       <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
         <h1 className="text-xl font-semibold text-left mb-3 text-white">Create an account</h1>
         <input onChange={(e)=>setUsername(e.target.value)} className="w-full px-4 bg-gray-700 rounded-md text-white py-2 border-2 border-black outline-0" type="text" placeholder="Enter your username" />
         <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 bg-gray-700 rounded-md text-white py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
         <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 bg-gray-700 rounded-md text-white py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
         <button onClick={handleRegister} className="w-full bg-blue-700 px-4 py-3 text-lg font-bold text-white rounded-lg hover:bg-blue-800 ">Register</button>
         {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
         <div className="flex justify-center items-center space-x-3 text-white">
          <p>Already have an account?</p>
          <p className="text-gray-500 "><Link to="/login">Login</Link></p>
         </div>
       </div>
    </div>
    </div>
    </>
    
  )
}

export default Register