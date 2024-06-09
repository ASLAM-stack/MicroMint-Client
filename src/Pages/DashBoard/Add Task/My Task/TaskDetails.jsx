import { useLoaderData } from "react-router-dom";

const TaskDetails = () => {
    const task = useLoaderData()
    console.log(task);
    return (
        <div>
            {task.task_title}
        </div>
    );
};

export default TaskDetails;