import { useForm } from "react-hook-form";
import SectionTitle from "../../../Component/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAdmin from "../../../Hooks/useAdmin";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddTask = () => {
  const {user} = useAuth()
  const [isAdmin,refetch] = useAdmin()
  const adminCoin = isAdmin?.coins;
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const creator_name =user?.displayName;
    const creator_email = user?.email;
    const imageFile = {image:data.image[0]}
      const res = await axiosPublic.post(image_hosting_api,imageFile,{
        headers:{'content-type' : 'multipart/form-data'}
      })
      const task_image_url = res.data.data.display_url;
      const totalPay = data.quantity * data.money;
      const currentCoin = adminCoin - totalPay;
      const updateInfo={currentCoin}  
      const taskInfo = {
        task_title:data.title,
        task_detail:data.details,
        task_quantity:data.quantity,
        per_task_pay:data.money,
        payable_amount:totalPay,
        completion_date:data.date,
        submission_info:data.submission,
        task_image_url,
        creator_name,
        creator_email
      }
      if (totalPay < adminCoin || totalPay === adminCoin ) {

        const res = await axiosSecure.patch(`/user/${isAdmin?.email}`,updateInfo)
        if (res.data.modifiedCount > 0) {
          const taskRes = await axiosSecure.post('/task',taskInfo)
          console.log(taskRes.data);
          if (taskRes.data.insertedId) {
            reset()
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfuly added task",
              showConfirmButton: false,
              timer: 1500
            });
          }
          refetch()
        }
     
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Not enough coins to add the task",
          text: "Please Purchase Coin From below link",
          footer: '<Link to="">Purchase Coin</Link>'
        });
        navigate('/dashboard/clientHome')
      }
      

  };
  return (
    <div className="">
      <SectionTitle
        subHeading={"Build Project"}
        heading={"add new task"}
      ></SectionTitle>
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
             <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
             <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Task Title</span>
            </label>
            <input type="text" placeholder="Enter Task Title"
            name="tilte" {...register("title", { required: true })}
            className="input input-bordered"  />
             {errors.title && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Task Photo</span>
            </label>
            <input type="file" name="image" className="file-input file-input-bordered w-full " {...register("image", { required: true })} />
             {errors.image && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Task Quantity</span>
            </label>
            <input type="number" placeholder="Enter Task Quantity"
            name="quantity" {...register("quantity", { required: true })}
            className="input input-bordered"  />
             {errors.quantity && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Amount of Per Task($)</span>
            </label>
            <input type="number" placeholder="Enter Amount"
            name="money" {...register("money", { required: true })}
            className="input input-bordered"  />
             {errors.money && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Completion Date</span>
            </label>
            <input type="date" placeholder="Enter DateLine"
            name="dat" {...register("date", { required: true })}
            className="input input-bordered"  />
             {errors.date && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Task Details</span>
            </label>
            <textarea className='textarea textarea-bordered w-full' rows="1" type="text" placeholder="Enter Task Details"
            name="details" {...register("details", { required: true })}
              />
             {errors.details && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Submission Info</span>
            </label>
            <textarea className='textarea textarea-bordered w-full' rows="4" type="text" placeholder="Enter Submission Info"
            name="submission" {...register("submission", { required: true })}
              />
             {errors.submission && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
        </div>
         <div className="w-full mt-4">
            <button className="btn btn-primary w-full " type="submit">Add a Task</button>
         </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
