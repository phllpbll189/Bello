import {MOVE_CARD, moveCard, addCard, ADD_CARD, EDIT_CARD, EDIT_MOVE, editCard, editAndMoveCard} from "../../Actions/cardAction"

describe("actions return correct object", () => {
    const mockDate = {
        due: {month: 1, day: 1}, 
        created: {month: 2, day: 2},
        updated: {month: 3, day: 3}
    }
    
    test("Move Card action returns the correct object", () => {
        expect(moveCard("0", 0, true)).toEqual({
            type: MOVE_CARD,
            payload: {
                boardID: "0",
                cardIndex: 0,
                right: true
            }
        })
    })

    test("Add Card Returns the correct object", () => {
        expect(addCard({boardID: "0", title: "hello", description: "world", date: mockDate, assignees: [0]})).toEqual({
            type: ADD_CARD,
            payload: {
                boardID: "0",
                title: "hello",
                description: "world",
                date: {
                    due: {month: 1, day: 1}, 
                    created: {month: 2, day: 2},
                    updated: {month: 3, day: 3}
                },
                assignees: [0]
            }
        })
    })

    test("Edit Card Returns the correct object", () => {
        expect(editCard({boardID: "0", cardIndex: 2, title: "hello", description: "world", date: mockDate, assignees: [0]})).toEqual({
            type: EDIT_CARD,
            payload: {
                boardID: "0",
                cardIndex: 2,
                title: "hello",
                description: "world",
                date: {
                    due: {month: 1, day: 1}, 
                    created: {month: 2, day: 2},
                    updated: {month: 3, day: 3}
                },
                assignees: [0]
            }
        })
    })

    test("Edit and Move Returns the correct object", () => {
        expect(editAndMoveCard({boardID: "0", title: "hello", description: "world", date: mockDate, assignees: [0], previousBoardID: "1", cardIndex: 0})).toEqual({
            type: EDIT_MOVE,
            payload: {
                boardID: "0",
                title: "hello",
                description: "world",
                date: {
                    due: {month: 1, day: 1}, 
                    created: {month: 2, day: 2},
                    updated: {month: 3, day: 3}
                },
                assignees: [0],
                previousBoardID: "1",
                cardIndex: 0
            }
        })
    })
})