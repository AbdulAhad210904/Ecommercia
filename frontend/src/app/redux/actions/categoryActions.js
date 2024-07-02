import axios from "axios";
export const getCategoryData = () => {
    return async (dispatch)=>{
        try{
            const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
            dispatch({
                type: "getCategoryData",
                payload: response.data,
            });
        }catch(error){
            console.error('Error fetching Category data:', error);
        }
    }
};