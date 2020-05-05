export const getCards = (cards) => {
    return {
        type : 'GET_CARDS',
        payload : cards
    }
}
export const deleteCard = (id) => {
    return {
        type : 'DELETE_CARD',
        payload : id
    }
}
export const addCard = (card) => {
    return {
        type : 'ADD_CARD',
        payload : card
    }
}
export const updateCard = (card) => {
    return {
        type : 'UPDATE_CARD',
        payload : card
    }
}
