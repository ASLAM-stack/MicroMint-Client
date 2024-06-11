import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

 

const TaskListCard = ({item}) => {
    return (
        <div>
            <div className="card w-full bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img  src={item.task_image_url} alt="Shoes" className="rounded-xl w-[304px] h-[205px]"  />
  </figure>
  <div className="card-body ">
    <h2 className="card-title">{item.task_title}</h2>
    <p>Creator: {item.creator_name}</p>
    <p>Quantity: {item.task_quantity}</p>
    <p>Payment: {item.payable_amount
    }<RiMoneyEuroCircleLine className="inline-block text-xl text-orange-400 pb-[1px]"/></p>
    <p>Dead-Line: {item.completion_date}</p>
    <div className="card-actions">
      <Link to={`/dashboard/taskDetail/${item._id}`} className="btn w-full btn-primary">Task Details</Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default TaskListCard;