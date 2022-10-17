import { createContext } from "react";
import { CLOSED_STATE, OPEN_CARD_MODAL, CLOSE_CARD_MODAL, OPEN_EXISTING_CARD, CHANGE_ASSIGN, CHANGE_BOARD, CHANGE_DUE_DATE, CHANGE_DESC, CHANGE_TITLE } from "./Actions/modalAction"
import { mockData } from "./mocks/mockModalData";

const modalState = mockData

//create context
const ModalContext = createContext( modalState )
ModalContext.displayName = 'modal-store';

//create reducer
const modalReducer = (store=modalState, {type, title, description, boardID, date, cardIndex, assignees, updated}) => {
    switch(type){
        case OPEN_CARD_MODAL:
            return openCardModal(type, title, description, boardID, date, assignees)

        case CLOSE_CARD_MODAL:
            return closeCardModal(store)

        case OPEN_EXISTING_CARD:
            return openExistingCard(type, title, description, boardID, date, cardIndex, assignees)
        
        case CHANGE_ASSIGN:
            return changeAssign(store, assignees, updated)

        case CHANGE_BOARD:
            return changeBoard(store, boardID, updated)

        case CHANGE_DUE_DATE:
            return changeDueDate(store, date, updated)

        case CHANGE_DESC:
            return changeDesc(store, description, updated)
        
        case CHANGE_TITLE:
            return changeTitle(store, title, updated)

        default:
            return store
    }
}

//=================== Functions ================================

const changeAssign = (store, assignee, updated) => {
    let assignees = []
    const index = store.assignees.indexOf(assignee)
    if(index == -1){
        assignees = [...store.assignees, assignee]
    } else {
        assignees = [
            ...store.assignees.slice(0, index),
            ...store.assignees.slice(index + 1),
        ]
    }

    return {
        ...store,
        assignees: assignees,
        date: {
            ...store.date,
            updated: updated
        }
    }

}

const changeDesc = (store, description, updated) =>{
    return {
        ...store,
        description: description,
        date: {
            ...store.date,
            updated: updated
        }
    }
}

const changeTitle = (store, title, updated) => {
    return {
        ...store,
        title: title,
        date: {
            ...store.date,
            updated: updated
        }
    }
}

const changeDueDate = (store, date, updated) => {
    return {
        ...store,
        date: {
            ...store.date,
            due: date,
            updated: updated
        }
    }
}

const changeBoard = (store, board, updated) => {
    return {
        ...store,
        boardID: board,
        date: {
            ...store.date,
            updated: updated
        }
    }
}

const openCardModal = (type, title, description, boardID, date, assignees) => {
    return {
        title,
        description,
        boardID,
        date:{
            ...date
        },
        type,
        assignees
    }
}

const openExistingCard = (type, title, description, boardID, date, cardIndex, assignees) => {
    return {
        title,
        description,
        boardID,
        cardIndex,
        date:{
            ...date
        },
        type,
        assignees
    }
}

const closeCardModal = (store) => {
    return modalState
}

export {modalState, ModalContext, modalReducer}

