import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../../Component/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
 

const TaskDetails = () => {
    const task = useLoaderData()
    const axiosSecure = useAxiosSecure()
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
      const totalPay = data.quantity * data.money;
        const taskInfo = {
            task_title:data.title,
            task_detail:data.details,
            task_quantity:data.quantity,
            per_task_pay:data.money,
            payable_amount:totalPay,
            completion_date:data.date,
            submission_info:data.submission,
        }
        console.log(taskInfo);
        const res = await axiosSecure.patch(`/task/${task._id}`,taskInfo)
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfuly update task",
            showConfirmButton: false,
            timer: 1500
          });
        }
  
    };
    return (
        <div className="">
      <SectionTitle
        subHeading={"Build Project"}
        heading={"update task"}
      ></SectionTitle>
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
             <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
             <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Task Title</span>
            </label>
            <input type="text" placeholder="Enter Task Title" defaultValue={task?.task_title}
            name="tilte" {...register("title", { required: true })}
            className="input input-bordered"  />
             {errors.title && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>

           

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Task Quantity</span>
            </label>
            <input type="number" placeholder="Enter Task Quantity" defaultValue={task?.task_quantity}
            name="quantity" {...register("quantity", { required: true })}
            className="input input-bordered"  />
             {errors.quantity && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Amount of Per Task($)</span>
            </label>
            <input type="number" placeholder="Enter Amount" defaultValue={task?.per_task_pay}
            name="money" {...register("money", { required: true })}
            className="input input-bordered"  />
             {errors.money && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Completion Date</span>
            </label>
            <input type="date" placeholder="Enter DateLine" defaultValue={task?.completion_date}
            name="dat" {...register("date", { required: true })}
            className="input input-bordered"  />
             {errors.date && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Task Details</span>
            </label>
            <textarea className='textarea textarea-bordered w-full' rows="4" type="text" defaultValue={task?.task_detail} placeholder="Enter Task Details"
            name="details" {...register("details", { required: true })}
              />
             {errors.details && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Submission Info</span>
            </label>
            <textarea className='textarea textarea-bordered w-full' rows="4" defaultValue={task?.submission_info} type="text" placeholder="Enter Submission Info"
            name="submission" {...register("submission", { required: true })}
              />
             {errors.submission && <span className='text-red-500 mt-2'>This field is required</span>}
          </div>
        </div>
         <div className="w-full mt-4">
            <button className="btn btn-primary w-full " type="submit">Update Task</button>
         </div>
          </div>
        </form>
      </div>
    </div>
    );
};

export default TaskDetails;