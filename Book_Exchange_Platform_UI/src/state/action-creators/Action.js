export const loginAction = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'login',
            payload: data
        })
    }
}

export const logoutAction = () => {
    return (dispatch) => {
        dispatch({
            type: 'logout',
            payload: {}
        })
    }
}

export const mutualFundAction = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'mutualFund',
            payload: data
        })
    }
}