const initialState = {
    id: "",
    name: "",
    isLoggedIn: true
}

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SIGN_IN':
            return {id: action.id, name: action.name, isLoggedIn: action.isLoggedIn};
        case 'SIGN_OUT':
            return initialState;
        default:
            return state;

    }
}

export default loginReducer;