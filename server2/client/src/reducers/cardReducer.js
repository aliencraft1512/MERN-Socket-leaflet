
const initialState = {
    cards:[]
};

export default function(state = initialState,action){
   
    
    switch(action.type){
                case 'GET_CARDS':
                    return {
                        ...state,
                        cards : action.payload
                    }
                case 'DELETE_CARD':
                    return {
                        ...state,
                        cards : state.cards.filter(card => card._id !== action.payload)
                    }
                case 'ADD_CARD':
                    return {
                        ...state,
                        cards : [action.payload, ...state.cards]
                    }
                case 'UPDATE_CARD':
                    return {
                        ...state,
                        cards : state.cards.map(card => card._id !== action.payload._id ? card : action.payload)
                    }
                default : {
                    return state;
                    }
    }
}