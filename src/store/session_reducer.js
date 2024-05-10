const initialState = {
    company_id: '',
    user_id: '',
    uid:'',
    client:"",
    access_token: '',
    logged:false //eu nao usaria isso.. eu prefiro analisar se tem client e access_token.. mas se quem sabe
};
  
const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SESSION':
            return {
                ...state,
                access_token: action.payload.access_token,
                client: action.payload.client,   
                company_id: action.payload.company_id,
                user_id: action.payload.user_id,
                uid:  action.payload.uid,
                logged: action.payload.logged    
            }; 

        case 'SESSION_ERROR':
            return {
                ...state,
                logged: action.payload.logged
            }
        default:
        return state;
    }
};

export default sessionReducer;
