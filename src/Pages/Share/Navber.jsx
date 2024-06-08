import { Link, NavLink } from "react-router-dom";

const Navber = () => {
  const user = false
  return (
    <div className="shadow">
      <div className="navbar bg-base-100 container">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[30] p-2 shadow bg-base-100 rounded-box w-52"
            >
               <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li>
                    <a href='#about'>About</a>
                </li>
                <li>
                    <a href='#feature'>Features</a>
                </li>
                <li>
                    <a href='#how_It_Work'>How it&apos;s work</a>
                </li>
                <li>
                    <a href='#topEarn'>Top Worker</a>
                </li>
                <li>
                    <a href='#review'>Review</a>
                </li>
                <li>
                <a className="btn mt-1  btn-outline btn-secondary btn-sm">Watch Demo</a>
                </li>
           
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">MicroMint</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li>
                    <a href='#about'>About</a>
                </li>
                <li>
                    <a href='#feature'>Features</a>
                </li>
                <li>
                    <a href='#how_It_Work'>How it&apos;s work</a>
                </li>
                <li>
                    <a href='#topEarn'>Top Worker</a>
                </li>
                <li>
                    <a href='#review'>Review</a>
                </li>
                <li>
                <a href="https://youtu.be/JE3-TN1yUEw?si=KGjiEeFdBSg2DbbC" className="btn mt-1  btn-outline btn-secondary btn-sm" target="_blank">Watch Demo</a>
                </li>
       
          </ul>
        </div>
        <div className="navbar-end">
        {
          user ? <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>DashBoard</a></li>
            <li><a>Available Coins
            <span className="badge">0</span>
              </a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
        :
        <Link to="/login">
        <a className="btn ml-5 btn-outline btn-secondary">Log in</a>
        </Link>
        }
           {/* log in */}
          
        </div>
      </div>
    </div>
  );
};

export default Navber;
