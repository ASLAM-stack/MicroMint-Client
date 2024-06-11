import { Link, Outlet} from "react-router-dom";
import DashNav from "../Pages/DashBoard/Component/DashNav";
import { FaHistory, FaHome, FaTasks } from "react-icons/fa";
import { GiClockwork } from "react-icons/gi";
import { RiShoppingCartFill } from "react-icons/ri";
import { FaUsersGear } from "react-icons/fa6";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const DashBoard = () => {
  const {logOut} = useAuth()
  const [Role] = useAdmin()
  const isAdmin = Role?.role;
  if (!isAdmin) {
    return <div className="flex justify-center items-center">
      <span className="loading loading-bars loading-lg"></span>
    </div>
  }
   
  return (
    <div className="container">
      <div>
        <DashNav></DashNav>
      </div>
      <div className="flex">

        <div>
          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
             
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 md:w-80 w-48 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                {isAdmin === 'freelancer' && (
  <>
    <li><Link className="md:text-lg font-semibold"><FaHome className="text-orange-400 text-xl"/>Home</Link></li>
    <li><Link to='/dashboard/taskList' className="md:text-lg font-semibold"><FaTasks className="text-orange-400 text-xl"/>Task List</Link></li>
    <li><Link to='/dashboard/mySubmission' className="md:text-lg font-semibold"><GiClockwork className="text-orange-400 text-xl"/>My Submissions</Link></li>
  </>
)}

{isAdmin === 'client' && (
  <>
    <li><Link to='/dashboard/clientHome' className="md:text-lg font-semibold"><FaHome className="text-orange-400 text-xl"/>Home</Link></li>
    <li><Link to='/dashboard/addTask' className="md:text-lg font-semibold"><FaTasks className="text-orange-400 text-xl"/>Add New Task</Link></li>
    <li><Link to='/dashboard/myTask' className="md:text-lg font-semibold"><GiClockwork className="text-orange-400 text-xl"/>My Task</Link></li>
    <li><Link to='/dashboard/buyCoin' className="md:text-lg font-semibold"><RiShoppingCartFill className="text-orange-400 text-xl"/>Purchase Coin</Link></li>
    <li><Link className="md:text-lg font-semibold"><FaHistory className="text-orange-400 text-xl"/>Payment History</Link></li>
  </>
)}

{isAdmin === 'admin' && (
  <>
    <li><Link className="md:text-lg font-semibold"><FaHome className="text-orange-400 text-xl"/>Home</Link></li>
    <li><Link className="md:text-lg font-semibold"><FaUsersGear className="text-orange-400 text-xl"/>Manage Users</Link></li>
    <li><Link className="md:text-lg font-semibold"><GiClockwork className="text-orange-400 text-xl"/>Manage Task</Link></li>
  </>
)}

                
                
                

                <hr className="shadow mt-10"/>
                <li><Link to='/' className="md:text-lg font-semibold" ><FaHome className="text-orange-400 text-xl"/>Home Page</Link></li>
                <button onClick={logOut} className="btn btn-primary">Log Out</button>


              </ul>
            </div>
          </div>
        </div>
        <div className="outlet w-full">
         <Outlet></Outlet>
      </div>
      </div>
      
    </div>

  );
};

export default DashBoard;
