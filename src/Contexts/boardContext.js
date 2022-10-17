import { createContext } from "react";
import {MOVE_CARD, ADD_CARD, EDIT_CARD, EDIT_MOVE} from './Actions/cardAction';
import { mockData } from "./mocks/mockBoardData";

const boardState = mockData

//create context
const BoardContext = createContext( mockData )
BoardContext.displayName = 'board-store';

//create reducer
const cardReducer = (state=boardState, {type, payload}) => {
    switch (type){
        case MOVE_CARD:
            return moveCard(state, payload.boardID, payload.cardIndex, payload.right)
        case ADD_CARD:
            return appendCard(state, payload.boardID, payload.title, payload.description, payload.date, payload.assignees)
        case EDIT_CARD:
            return editCard(state, payload.boardID, payload.cardIndex, payload.title, payload.description, payload.date, payload.assignees)
        case EDIT_MOVE:
            return editMove(state, payload.boardID, payload.title, payload.description, payload.date, payload.assignees, payload.previousBoardID, payload.cardIndex)
        default:
            return state
    }
}

//=================== Functions ================================

const editMove = (store, boardID, title, desc, date, assignees, previousBoardID, cardIndex) => {
    return {
        ...store, 

        [previousBoardID]: {
            ...store[previousBoardID],
            boardCards: [
                ...store[previousBoardID].boardCards.slice(0, cardIndex),
                ...store[previousBoardID].boardCards.slice(cardIndex + 1),
            ]
        },

        [boardID]: {
            ...store[boardID],
            boardCards:[
                ...store[boardID].boardCards,
                {title, desc, date, assignees}
            ]
        }
    }
}

const editCard = (store, boardID, cardIndex, title, description, date, assignees) => {
    return {
        ...store,

        [boardID]: {
            ...store[boardID],

            boardCards: [
                ...store[boardID].boardCards.slice(0, cardIndex),
                {
                    title: title,
                    desc: description,
                    date: date,
                    assignees: assignees},
                ...store[boardID].boardCards.slice(cardIndex + 1),
            ]
        }
    }
}

const appendCard = (store, boardID, title, description, date, assignees) => {
    return {
        ...store,

        [boardID]: {
            ...store[boardID],
            boardCards: [
                ...store[boardID].boardCards,
                {title: title, desc: description, date: date, assignees: assignees},
            ]
        }
    }

}

//returns boards after a card has been moved
const moveCard = (store, boardID, cardIndex, right) => {
    const targetBoardID = getNextorPreviousIndex(store, boardID, right)

    //return if invalid input
    if(targetBoardID === boardID) return store
    
    return {
        ...store,

        //add card to current board
        [targetBoardID]: {
            ...store[targetBoardID],

            boardCards: [
                ...store[targetBoardID].boardCards,
                store[boardID].boardCards[cardIndex]
            ],
        },

        //cut out card from previous board
        [boardID]: {
            ...store[boardID],

            boardCards: [
                ...store[boardID].boardCards.slice(0, cardIndex),
                ...store[boardID].boardCards.slice(cardIndex + 1),
            ]
        }
    }
}

//will help in the future when using UUID's instead of iterative integers
const getNextorPreviousIndex = (boards, boardID, right=true) => {
    const keys = Object.keys(boards)
    const currentKeyIndex = keys.indexOf(boardID)

    //make sure input is valid
    if(right && currentKeyIndex === keys.length - 1) return boardID
    if(!right && currentKeyIndex === 0) return boardID

    if (right) {
       return keys[(currentKeyIndex + 1)]
    }
    return keys[(currentKeyIndex - 1)]
}


export {boardState, BoardContext, cardReducer}



