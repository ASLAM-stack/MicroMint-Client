import { RiMenuFold2Line, RiMoneyEuroCircleLine } from "react-icons/ri";
import useAdmin from "../../../Hooks/useAdmin";
import useAuth from "../../../Hooks/useAuth";

const DashNav = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <label htmlFor="my-drawer-2" className="lg:hidden block">
            <RiMenuFold2Line className="text-4xl" />
          </label>
          <a className="btn btn-ghost text-xl font-bold">MicroMint</a>
        </div>

        <div className="navbar-end">
          <div className="flex gap-5 mr-2 justify-center">
            <div className="w-full flex justify-center items-center max-[580px]:hidden">
              <p className="font-medium">Availabe Coins: {isAdmin?.coins}<RiMoneyEuroCircleLine className="inline-block text-xl text-orange-400 pb-[1px]"/>
              </p>
               
            </div>
            <div>

            <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt={user?.displayName}  src={user?.photoURL}  />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
        <li><a className="uppercase">{isAdmin?.role}</a></li>
        <li><a>{user?.displayName}</a></li>
        
          <a className="justify-between">
          Availabe Coins: 
            <span className="badge">{isAdmin?.coins} <RiMoneyEuroCircleLine className="inline-block text-xl text-orange-400 pb-[1px]"/></span>
          </a>
        </li>
        
         
      </ul>
    </div>
            </div>
          </div>
          <div className="">
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashNav;
