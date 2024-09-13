const modalIndexReducer = (state = "", action) => {
    switch(action.type){
        case 'SET_INDEX':
            return action.index;
        default:
            return state;

    }
}

export default modalIndexReducer;