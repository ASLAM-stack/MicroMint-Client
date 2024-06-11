import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../Component/SectionTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
 
import { RiMoneyEuroCircleLine } from "react-icons/ri";
 
 
import useAuth from "../../../../Hooks/useAuth";

const MySubmissuin = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data : tasks = [],refetch} = useQuery({
        queryKey:['task'],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/submission/${user.email}`)
            return res.data;
        }
    })
    console.log(tasks);
        refetch()
   
    console.log(tasks);
    return (
        <div>
            <SectionTitle subHeading={'Work Place'} heading={'My submission'}></SectionTitle>
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
        <th>Pay Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}

      {
        tasks?.map( (task,index) =>{
             
           return <tr key={task._id}>
            <th>
               {index + 1}
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
            <td>{task.payable_amount
            }<RiMoneyEuroCircleLine className="inline-block text-xl text-orange-400 pb-[1px]"/></td>
            <td>
               {task.status}
            </td>
            
             
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

export default MySubmissuin;