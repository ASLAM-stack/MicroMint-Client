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
import MyTask from "../Pages/DashBoard/Add Task/My Task/MyTask";
import TaskDetails from "../Pages/DashBoard/Add Task/My Task/TaskDetails";
import TaskList from "../Pages/DashBoard/TaskList/TaskList";
import Task_Details_c from "../Pages/DashBoard/TaskList/Component/Task_Details_c";
import MySubmissuin from "../Pages/DashBoard/TaskList/Component/MySubmissuin";
import ClientHome from "../Pages/DashBoard/Client/Home/ClientHome";
import PrivateClient from "./Private_Router/PrivateClient";
import Payment from "../Pages/DashBoard/Client/Home/Payment";
  
  
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
          element:<PrivateClient>
            <AddTask></AddTask>
          </PrivateClient>
        },
        {
          path:'/dashboard/myTask',
          element:<PrivateClient>
            <MyTask></MyTask>
          </PrivateClient>
        },
        {
          path:'/dashboard/myTask/:id',
          element:<TaskDetails></TaskDetails>,
          loader: async({params}) =>  fetch(`http://localhost:5000/task/${params.id}`)
        },
        {
          path:'/dashboard/taskList',
          element:<TaskList></TaskList>,
        },
        {
          path:'/dashboard/taskDetail/:id',
           
          element:<Task_Details_c></Task_Details_c>,
          loader: async({params}) =>  fetch(`http://localhost:5000/task/${params.id}`)

        },
        {
          path:"/dashboard/mySubmission",
          element:<MySubmissuin></MySubmissuin>
        },
        {
          path:'/dashboard/clientHome',
          element:<PrivateClient>
            <ClientHome></ClientHome>
          </PrivateClient>
        },
        {
          path:'/dashboard/buyCoin',
          element:<PrivateClient>
            <Payment></Payment>
          </PrivateClient>
        }
         
      ]
    }
  ]);
  export default router;