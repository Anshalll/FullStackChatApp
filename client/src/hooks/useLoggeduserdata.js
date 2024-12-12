import { useSelector } from "react-redux";


export const useLoggeduserdata = () => {
  
        const {loggedUserData , loading} = useSelector((state) => state.Loggeduserslice)
        return {loggedUserData , loading}
}