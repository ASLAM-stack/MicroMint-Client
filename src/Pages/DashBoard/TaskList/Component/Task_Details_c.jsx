import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SectionTitle from "../../../../Component/SectionTitle";
import useAuth from "../../../../Hooks/useAuth";

 

const Task_Details_c = () => {
    const task = useLoaderData()
    console.log(task);
    const {user} = useAuth()
    const currentDateAndTimeInMillis = Date.now();
    const currentDateAndTime = new Date(currentDateAndTimeInMillis);
    console.log(currentDateAndTime);
    const axiosSecure = useAxiosSecure()
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        const taskInfo = {
            task_id:task._id,
            task_title:task.task_title,
            task_detail:task.task_detail,
            task_img_url:task.task_image_url,
            worker_email:user.email,
            worker_name:user.displayName,
            creator_name:task.creator_name,
            creator_email:task.creator_email,
            payable_amount:task.payable_amount,
            completion_date:task.completion_date,
            submission_info:task.submission_info,
            submission_details:data.submission_details,
            current_date:currentDateAndTime,
            status:'pending'
        }
        console.log(taskInfo);
        
        const res = await axiosSecure.post('/submission',taskInfo)
        console.log(res.data);
            if (res.data.insertedId) {
              reset()
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfuly added submission",
                showConfirmButton: false,
                timer: 1500
              });
            }
             
          
  
    };
    return (
        <div>
            <div className="">
      <SectionTitle
        subHeading={"Build Project"}
        heading={"submit task"}
      ></SectionTitle>
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
             <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
             <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Task Title</span>
            </label>
            <input type="text" disabled placeholder="Enter Task Title" defaultValue={task?.task_title}
            name="tilte" {...register("title")}
            className="input input-bordered"  />
             {errors.title && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>

           

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Task Quantity</span>
            </label>
            <input type="number" disabled placeholder="Enter Task Quantity" defaultValue={task?.task_quantity}
            name="quantity" {...register("quantity")}
            className="input input-bordered"  />
             {errors.quantity && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Amount of Per Task($)</span>
            </label>
            <input type="number" disabled placeholder="Enter Amount" defaultValue={task?.per_task_pay}
            name="money" {...register("money")}
            className="input input-bordered"  />
             {errors.money && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Completion Date</span>
            </label>
            <input type="date" disabled placeholder="Enter DateLine" defaultValue={task?.completion_date}
            name="date" {...register("date")}
            className="input input-bordered"  />
             {errors.date && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Task Details</span>
            </label>
            <textarea className='textarea textarea-bordered w-full' rows="4" type="text" disabled defaultValue={task?.task_detail} placeholder="Enter Task Details"
            name="details" {...register("details")}
              />
             {errors.details && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Submission Info</span>
            </label>
            <textarea className='textarea textarea-bordered w-full' rows="4" disabled defaultValue={task?.submission_info} type="text" placeholder="Enter Submission Info"
            name="submission" {...register("submission")}
              />
             {errors.submission && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
        </div>
         
          </div>
          <div>
            {/*  */}
            <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Submission Details</span>
            </label>
            <textarea className='textarea textarea-bordered w-full' rows="4"  type="text" placeholder="Enter Submission Info"
            name="submission_details" {...register("submission_details", { required: true })}
              />
             {errors.submission_details && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="w-full mt-4">
            <button className="btn btn-primary w-full " type="submit">Update Task</button>
         </div>
          </div>
        </form>
      </div>
    </div>
        </div>
    );
};

export default Task_Details_c;