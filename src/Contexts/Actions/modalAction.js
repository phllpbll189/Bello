import { DateWrapper } from "../../Components/MenuModal/Components/dateWrapper";

export const OPEN_CARD_MODAL = "CARD_MODAL";
export const BOARD_MODAL = "BOARD_MODAL";
export const CLOSE_CARD_MODAL = "CLOSE_CARD_MODAL";
export const CLOSED_STATE = "CLOSED_STATE";
export const OPEN_EXISTING_CARD = "OPEN_EXISTING_CARD";
export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_BOARD = 'CHANGE_BOARD';
export const CHANGE_DESC = 'CHANGE_DESC';
export const CHANGE_DUE_DATE = 'CHANGE_DUE_DATE';
export const CHANGE_ASSIGN = 'CHANGE_ASSIGN';

export const openCardModal = (boardID, title, description, date, assignees) => {
    return {
        type: OPEN_CARD_MODAL,
        boardID,
        title,
        description,
        date,
        assignees
    }
}

export const openExistingCardModal = (boardID, cardIndex, title, description, date, assignees) => {
    return {
        type: OPEN_EXISTING_CARD,
        boardID,
        title,
        description,
        date,
        cardIndex,
        assignees
    }
}

export const changeAssign = (assignees) => {
    return {
        type: CHANGE_ASSIGN,
        assignees: assignees,
        updated: getDateHelper()
    }
}

export const changeBoard = (boardID) => {
    return {
        type: CHANGE_BOARD,
        boardID: boardID,
        updated: getDateHelper()
    }
}

export const changeDueDate = (date) => {
    return {
        type: CHANGE_DUE_DATE,
        date: date,
        updated: getDateHelper()
    }
}

export const changeDesc = (desc) => {
    return {
        type: CHANGE_DESC,
        description: desc,
        updated: getDateHelper()
    }
}

export const changeTitle = (title) => {
    return {
        type: CHANGE_TITLE,
        title: title,
        updated: getDateHelper()
    }
}


export const closeCardModal = () => {
    return {
        type: CLOSE_CARD_MODAL
    }
}

function getDateHelper() {
    const converter = new DateWrapper()
    return converter.monthDay
}