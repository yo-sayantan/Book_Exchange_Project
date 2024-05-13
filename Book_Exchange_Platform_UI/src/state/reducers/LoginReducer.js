const LoginReducer = (state = {}, action) => {
    switch(action.type){
        case 'login':
            return action.payload;
        case 'logout':
            return action.payload;
        default:
            return state;
    }
    
}

export default LoginReducer;