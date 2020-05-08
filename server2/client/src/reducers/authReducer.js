const initialState = {
    token : JSON.parse(localStorage.getItem('login')) ? JSON.parse(localStorage.getItem('login')).token : null,
};

export default function(state = initialState,action){
    switch(action.type){
                case 'LOGIN':
                    return {
                        ...state,
                        token : JSON.parse(localStorage.getItem('login')) ? JSON.parse(localStorage.getItem('login')).token : null
                    }
                    
                case 'LOGOUT':
                    return {
                        ...state,
                        token : null,
                    }
                    /*
                case 'ADD_ETUDIANT':
                    return {
                        ...state,
                        etudiants : [action.payload, ...state.etudiants]
                    }
                case 'UPDATE_ETUDIANT':
                    return {
                        ...state,
                        etudiants : state.etudiants.map(etudiant => etudiant._id !== action.payload._id ? etudiant : action.payload)
                    }
                case 'GET_ETUDIANTS_FILIERE' :
                    return {
                        ...state,
                        etudiants : state.etudiants.filter(etudiant => etudiant.filiere === action.filiere)
                    }*/
                default : {
                    return state;
                    }
    }
}