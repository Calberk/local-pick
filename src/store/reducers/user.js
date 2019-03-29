export default function(state={}, action){
    switch(action.type){
        case 'CURRENT_USER':
            return{...state, user: action.payload}
            break;
        default: 
        return state;
    }
}