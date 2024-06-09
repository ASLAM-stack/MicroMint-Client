import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../LayOut/Main";
import Error from "../Pages/Share/Error";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/Login/LogIn";
import Register from "../Pages/Register/Register";
import DashBoard from "../LayOut/DashBoard";
import AddTask from "../Pages/DashBoard/Add Task/AddTask";
  
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<LogIn></LogIn>
        },
        {
            path:'/register',
            element:<Register></Register>
        }
      ]
    },
    {
      path:'dashboard',
      element:<DashBoard/>,
      children:[
        {
          path:'/dashboard/addTask',
          element:<AddTask></AddTask>
        }
      ]
    }
  ]);
  export default router;