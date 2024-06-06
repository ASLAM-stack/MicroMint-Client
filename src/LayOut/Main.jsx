import { Outlet } from "react-router-dom";
import Navber from "../Pages/Share/Navber";
import Footer from "../Pages/Share/Footer";

const Main = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;