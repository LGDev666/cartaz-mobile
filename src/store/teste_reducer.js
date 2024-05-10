const initialState = {
    ok:'ok'
};
  
const testeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'change':
            return {
                ...initialState,
                change: action.value
            }
        default:
            return state;
    }
};

export default testeReducer;
