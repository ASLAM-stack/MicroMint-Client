import { createContext, useState } from "react";

 
export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setloading] = useState(true)
    
    return (
        <div>
            
        </div>
    );
};

export default AuthProvider;