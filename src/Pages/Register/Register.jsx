import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";

 
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const Register = () => {
    const axiosPublic = useAxiosPublic()
  const {googleSignIn} = useAuth()
  const {register,handleSubmit,reset,formState:{errors}} = useForm()
    const {createUser,updateUser } = useAuth()
    const navigate = useNavigate() 
    const [show,setShow] = useState(false)
    const onSubmit =  async (data) =>{ 
        console.log(data)
        const imageFile = {image:data.image[0]}
      const res = await axiosPublic.post(image_hosting_api,imageFile,{
        headers:{'content-type' : 'multipart/form-data'}
      })
      const photoURL = res.data.data.display_url;
      const coins = data.role === 'freelancer' ? 10 : 15;
    console.log(coins);

      createUser(data.email,data.password)
      .then(result => {
        const loggerUser = result.user;
        console.log(loggerUser);
        updateUser(data.name,photoURL)
        .then(result =>{
          console.log(result);
          
          //create user in database

          const userInfo = {
            name: data.name,
            email:data.email,
            role: data.role,
            coins:coins,
            total_pay:0
          }
          axiosPublic.post('/users',userInfo)
          .then(res =>{
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Register Successfully",
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
          
         
        }) 
        navigate('/dashboard');
      })
      .catch(error =>
        {
          console.log(error);
        }
      ) 
    }
    const handleGoogleSingIn = () => {
      googleSignIn()
      .then(result => {
        console.log(result);
        const userInfo = {
          email:result.user.email,
          name:result.user.displayName,
          role:'freelancer',
          coins:10,
          total_pay:0
        }
        axiosPublic.post('/users',userInfo)
        .then(res =>{
           console.log(res.data);
           navigate('/dashboard')
        })
      })
    }
     const handleShow = () =>{
      setShow(!show)
     }
    return (
        <div className="container flex justify-center items-center flex-col
        ">
            <div className="my-12 md:w-1/2 w-full p-4 md:p-8 shadow rounded-2xl">
                <div className="text-center space-y-2">
                    <h1 className=" text-4xl font-bold">Register Now</h1>
                    <p>Register to access all of our features...</p>
                </div>
                <div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input type="text" placeholder="You Full Name"
            name="name" {...register("name", { required: true })}
            className="input input-bordered"  />
             {errors.name && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo Url</span>
            </label>
            <input type="file" name="image" className="file-input file-input-bordered w-full " {...register("image", { required: true })} />
             {errors.image && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">What&apos;s your role?</span>
            </label>
            
   
  <select placeholder='Select your role' name="role" className="select select-bordered" {...register("role", { required: true })} >
    {/* <option disabled selected>Select your role</option> */}
    <option value="freelancer">Freelancer</option>
    <option value="client">Client</option>
    
  </select>
   
 
             {errors.role && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="email"
            name="email" {...register("email", { required: true })}
            className="input input-bordered"   />
             {errors.email && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type={show ? 'text':'password'} placeholder="password" 
            name="password" {...register("password", { required: true ,pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/  ,minLength:6,maxLength:20, })}
            className="input input-bordered"   /> 
            <span onClick={handleShow} className="absolute right-5 bottom-3">{show ?<IoEyeOutline className="text-xl"/>:<IoEyeOffOutline className="text-xl"/> }</span> 
             {errors.password?.type === 'required' && <span className='text-red-500 mt-2'>This field is required</span>}
             {errors.password?.type === 'minLength' && <span className='text-red-500 mt-2'>Password must be 6 charaters</span>}
             {errors.password?.type === 'maxLength' && <span className='text-red-500 mt-2'>Password must be within 20 characters</span>}
             {errors.password?.type === 'pattern' && <span className='text-red-500 mt-2'>Passwoed have one upper and lower case,one number and special charactor</span>}
          </div>
          <div className="form-control mt-4 ">
             
            <button type="submit" className="btn btn-primary text-lg"  >Register </button>
          </div>
        </form>
        <div className='text-center'>
        <Link className='text-base text-center font-medium text-[#D1A054]' to='/login'>Already registered?<span className='font-bold'>Go to log in</span></Link>
        <div>
          <p className='text-base mt-2'>Or sign in with</p>
          <div className='  flex justify-center gap-4 py-4'>
           
          <AiFillGoogleCircle onClick={handleGoogleSingIn} className='text-3xl cursor-pointer' />
          <FaGithub className='text-3xl' />
          </div>
        </div>
      </div>
                </div>
            </div>
        </div>
    );
};

export default Register;