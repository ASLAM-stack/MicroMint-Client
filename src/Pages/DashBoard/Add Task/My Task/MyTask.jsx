import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../Component/SectionTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

 

const MyTask = () => {
    const axiosSecure = useAxiosSecure()
    const {data : tasks = [],refetch} = useQuery({
        queryKey:['task'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/task')
            return res.data;
        }
    })
    const handleDelete = async(id) =>{
        console.log(id);
        const res = await axiosSecure.delete(`/task/${id}`)
        console.log(res.data);
        if(res.data.deletedCount > 0){
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
    console.log(tasks);
    return (
        <div>
            <SectionTitle subHeading={'Watch Now'} heading={'My task'}></SectionTitle>
            <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          S.N
        </th>
        <th>Image</th>
        <th>Title</th>
        <th>Task Count</th>
        <th>Pay Amount</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}

      {
        tasks?.map( (task,index) =>{
             
           return <tr key={task._id}>
            <th>
               {index}
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={task?.tasktask_image_url
}  alt={task.task_title}  />
                  </div>
                </div>
               
              </div>
            </td>
            <td>
               {task.task_title}
            </td>
            <td>{task.task_quantity
            }</td>
            <td>{task.payable_amount
            }$</td>
            <th>
            <Link to={`/dashboard/myTask/${task._id}`}>
            <MdEditSquare className="text-2xl text-green-500"/>
            </Link>
            </th>
            <th onClick={()=>handleDelete(task._id)}>
            <MdDeleteForever  className="text-2xl text-red-500"/>
            </th>
          </tr>
        })
      }
    
 
    </tbody>
    
  </table>
</div>
            </div>
        </div>
    );
};

export default MyTask;