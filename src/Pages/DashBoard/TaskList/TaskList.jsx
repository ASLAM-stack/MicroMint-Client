import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Component/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TaskListCard from "./Component/TaskListCard";

 

const TaskList = () => {
    const axiosSecure = useAxiosSecure()
    const {data : tasks = []} = useQuery({
        queryKey:['task'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/task')
            return res.data;
        }
    })
    
    return (
        <div>
            <SectionTitle subHeading={'Earn More'} heading={'task list'}></SectionTitle>
            <div className="p-8 flex gap-8 flex-wrap justify-around">
                {
                    tasks.map(item => <TaskListCard key={item._id} item={item}></TaskListCard>)
                }
            </div>
        </div>
    );
};

export default TaskList;