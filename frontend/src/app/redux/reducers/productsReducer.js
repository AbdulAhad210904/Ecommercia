const initialState = {
    products: [],
    loading: true};

    const productsReducer = (state = initialState, action) => {
        switch (action.type) {
            case 'getProductData':
                return {
                    ...state,
                    products: action.payload,
                    loading: false
                };
            default:
                return state;
        }
    };

    export default productsReducer;