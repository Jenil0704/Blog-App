import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../url"
import { UserContext } from "../context/UserContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error,setError]=useState(false)
  const {setUser}=useContext(UserContext)
  const navigate=useNavigate()

  const handleLogin=async()=>{
    try{
      const res=await axios.post(URL+"/api/auth/login",{email,password})
      // console.log(res.data)
      setUser(res.data)
      toast.success('Logged In Successfully', {
        position : 'top-right',
        closeOnClick : true
      })
      navigate("/")
    }
    catch(err){
      setError(true)
      toast.error('Something Went Wrong! Please Try Again',{
        position : 'top-right',
        closeOnClick : true
      })
      console.log(err)
    }
  }
  return (
    <>
    <div className="bg-zinc-900 h-screen">
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 text-white">
    <h1 className="text-lg md:text-xl font-bold"><Link to="/">Blog Market</Link></h1>
    <h3><Link to="/register">Register</Link></h3>
    </div>
<div className="w-full flex justify-center items-center h-[80vh] ">
       <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
         <h1 className="text-xl font-semibold text-left mb-5 text-white">Log in to your account</h1>
         <div className="flex gap-5 justify-between">
            <h2 className="text-white">Email : demo@gmail.com</h2>
            <h2 className="text-white">Pass : demo123</h2>
         </div>
         <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 bg-gray-700 rounded-md text-white py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
         <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 bg-gray-700 rounded-md text-white py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
          <button onClick={handleLogin} className="w-full px-4 py-3 text-lg font-bold text-white bg-blue-700 rounded-lg hover:bg-blue-800 ">Log in</button>
         {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
         <div className="flex justify-center items-center space-x-3 text-white">
          <p>New here?</p>
          <p className="text-gray-500 "><Link to="/register">Register</Link></p>
         </div>
       </div>
    </div>
    </div>
    </>
    
  )
}

export default Login