import { Navigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";

const PrivateAdmin = ({children}) => {
    const {user,loading} = useAuth() 
    const [isAdmin] = useAdmin()
    if (loading || !isAdmin) {
        return <div className="flex justify-center items-center">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    if (user && isAdmin === 'admin') {
        return children;
    }
    return <Navigate to="/login"></Navigate>
};

export default PrivateAdmin;