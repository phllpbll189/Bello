export const ADD_CARD = 'ADD_CARD';
export const MOVE_CARD = 'MOVE_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const EDIT_MOVE = 'EDIT_MOVE';

export const moveCard = (boardID, cardIndex, right) => {
    return {
        type: MOVE_CARD,
        payload: {
            boardID,
            cardIndex,
            right
        }
    }
}

export const addCard = ({boardID, title, description, date, assignees}) => {
    return {
        type: ADD_CARD,
        payload: {
            boardID,
            title,
            description,
            date,
            assignees
        }
    }
}

export const editCard = ({boardID, cardIndex, title, description, date, assignees}) => {
    return {
        type: EDIT_CARD,
        payload: {
            boardID,
            cardIndex,
            title,
            description,
            date,
            assignees
        }
    }
}

export const editAndMoveCard = ({boardID, title, description, date, assignees, previousBoardID, cardIndex}) => {
    return {
        type: EDIT_MOVE,
        payload: {
            boardID,
            title,
            description,
            date,
            assignees,
            previousBoardID,
            cardIndex
        }
    }
}

