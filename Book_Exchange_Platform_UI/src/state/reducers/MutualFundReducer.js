const MutualFundReducer = (state = {}, action) => {
    switch(action.type){
        case 'mutualFund':
            return action.payload;
        default:
            return state;
    }
    
}

export default MutualFundReducer;