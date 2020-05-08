export const loginFunc = (username) => {
    return {
        type : 'LOGIN',
        payload :username
        }
}

export const logoutFunc = () => {
    return {
        type : 'LOGOUT'
        }
}
/*
export const addEtudiant = (etudiant) => {
    return {
        type : 'ADD_ETUDIANT',
        payload : etudiant
    }
}
export const updateEtudiant = (etudiant) => {
    return {
        type : 'UPDATE_ETUDIANT',
        payload : etudiant
    }
}
export const getEtudiantsFiliere = (filiere) => {
    return {
        type : 'GET_ETUDIANTS_FILIERE',
        payload : filiere
    }
}*/