import { useSelector } from "react-redux"

export const useChatdata =  () => {
    const {loading, chat , error}  = useSelector((state) =>  state.ChatSlice)
    
    return {loading, chat , error}
}