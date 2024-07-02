const initialState ={
    categories: [],
    loading: true
};
const CategoryReducer=(state=initialState, action)=>{
    switch(action.type){
        case 'getCategoryData':
            return{
                ...state,
                categories: action.payload,
                loading: false
            };
        default:
            return state;
    }
};
export default CategoryReducer;