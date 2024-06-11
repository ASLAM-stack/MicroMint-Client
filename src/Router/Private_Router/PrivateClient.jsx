import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";

 

const PrivateClient = ({children}) => {
    const {user,loading} = useAuth() 
    const [isAdmin] = useAdmin()
    const client = isAdmin?.role === 'client'
    if (loading || !client) {
        return <div className="flex justify-center items-center">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    if (user && client) {
        return children;
    }
    return <Navigate to="/login"></Navigate>
};

export default PrivateClient;