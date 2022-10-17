import { ADD_CARD, EDIT_CARD, EDIT_MOVE, MOVE_CARD } from "../../Actions/cardAction"
import { cardReducer } from "../../boardContext"

const mockCard = {
    title: "mockTitle",
    desc: "mockDescription",
    date: {
        due: {month: 1, day: 1},
        created: {month: 1, day: 1},
        updated: {month: 1, day: 1}
    },
    assignees: ['14', '13']
}

const defaultState = {
    "0": {
        boardName: "Backlog",
        boardColor: {R: 46, G: 63, B: 179},
        boardCards: [mockCard]
    },
    "1": {
        boardName: "In Progress",
        boardColor: {R: 79, G: 64, B: 251},
        boardCards: [mockCard]
    },
}




describe("Board Reducer tests", () => {
    it("Should return default state", () => {
        expect(cardReducer(defaultState, {type: "", payload: {}})).toEqual(defaultState)
    })


    it("Should be able to move card right", () => {
        const payload = {
            boardID: "0",
            cardIndex: 0,
            right: true
        }

        expect(cardReducer(defaultState, {type: MOVE_CARD, payload: payload})).toEqual(
            {
                "0": {
                    boardName: "Backlog",
                    boardColor: {R: 46, G: 63, B: 179},
                    boardCards: []
                },
                "1": {
                    boardName: "In Progress",
                    boardColor: {R: 79, G: 64, B: 251},
                    boardCards: [
                        {
                            title: "mockTitle",
                            desc: "mockDescription",
                            date: {
                                due: {month: 1, day: 1},
                                created: {month: 1, day: 1},
                                updated: {month: 1, day: 1}
                            },
                            assignees: ['14', '13']
                        },
                        {
                            title: "mockTitle",
                            desc: "mockDescription",
                            date: {
                                due: {month: 1, day: 1},
                                created: {month: 1, day: 1},
                                updated: {month: 1, day: 1}
                            },
                            assignees: ['14', '13']
                        }
                    ]
                },
            }
        )
    })

    it("Shouldn't be able to move a card right if there isn't a board right", () => {
        const payload = {
            boardID: "1",
            cardIndex: 0,
            right: true
        }

        expect(cardReducer(defaultState, {type: MOVE_CARD, payload: payload})).toEqual(
            {
                "0": {
                    boardName: "Backlog",
                    boardColor: {R: 46, G: 63, B: 179},
                    boardCards: [mockCard]
                },
                "1": {
                    boardName: "In Progress",
                    boardColor: {R: 79, G: 64, B: 251},
                    boardCards: [mockCard]
                },
            }
        )
    })


    it("Should be able to move card left", () => {
        const payload = {
            boardID: "1",
            cardIndex: 0,
            right: false
        }

        expect(cardReducer(defaultState, {type: MOVE_CARD, payload: payload})).toEqual(
            {
                "0": {
                    boardName: "Backlog",
                    boardColor: {R: 46, G: 63, B: 179},
                    boardCards: [
                        mockCard,
                        mockCard
                    ]
                },
                "1": {
                    boardName: "In Progress",
                    boardColor: {R: 79, G: 64, B: 251},
                    boardCards: []
                },
            }
        )
    })

    it("Shouldn't be able to move a card left if there isn't a board left", () => {
        const payload = {
            boardID: "0",
            cardIndex: 0,
            right: false
        }

        expect(cardReducer(defaultState, {type: MOVE_CARD, payload: payload})).toEqual(
            {
                "0": {
                    boardName: "Backlog",
                    boardColor: {R: 46, G: 63, B: 179},
                    boardCards: [mockCard]
                },
                "1": {
                    boardName: "In Progress",
                    boardColor: {R: 79, G: 64, B: 251},
                    boardCards: [mockCard]
                },
            }
        )
    })


    it("Should be able to add a new card", () => {
        const payload = {
            boardID: "0",
            title: "new card",
            description: "new card",
            date: {
                due: {month: 1, day: 1},
                created: {month: 1, day: 1},
                updated: {month: 1, day: 1}
            },
            assignees: [0]
        }

        expect(cardReducer(defaultState, {type: ADD_CARD, payload: payload})).toEqual(
            {
                "0": {
                    boardName: "Backlog",
                    boardColor: {R: 46, G: 63, B: 179},
                    boardCards: [
                        mockCard,
                        {
                            title: "new card",
                            desc: "new card",
                            date: {
                                due: {month: 1, day: 1},
                                created: {month: 1, day: 1},
                                updated: {month: 1, day: 1}
                            },
                            assignees: [0]
                        }
                    ]
                },
                "1": {
                    boardName: "In Progress",
                    boardColor: {R: 79, G: 64, B: 251},
                    boardCards: [
                        mockCard
                    ]
                },
            }
        )
    })


    it("should be able to edit a card", () => {
        const payload = {
            boardID: "0",
            cardIndex: 0,
            title: "new title",
            description: "new description",
            date: {
                due: {month: 2, day: 2},
                created: {month: 2, day: 2},
                updated: {month: 2, day: 2}
            },
            assignees: [0]
        }

        expect(cardReducer(defaultState, {type: EDIT_CARD, payload: payload})).toEqual(
            {
                "0": {
                    boardName: "Backlog",
                    boardColor: {R: 46, G: 63, B: 179},
                    boardCards: [
                        {
                            title: "new title",
                            desc: "new description",
                            date: {
                                due: {month: 2, day: 2},
                                created: {month: 2, day: 2},
                                updated: {month: 2, day: 2}
                            },
                            assignees: [0]
                        },
                    ]
                },
                "1": {
                    boardName: "In Progress",
                    boardColor: {R: 79, G: 64, B: 251},
                    boardCards: [
                        mockCard
                    ]
                },
            }
        )
    })


    it("should be able to edit and move a card at the same time", () => {
        const payload = {
            boardID: "0",
            title: "new title",
            description: "new description",
            date: {
                due: {month: 1, day: 1},
                created: {month: 1, day: 1},
                updated: {month: 1, day: 1}
            },
            assignees: [0],
            previousBoardID: "1",
            cardIndex: 0
        }

        expect(cardReducer(defaultState, {type: EDIT_MOVE, payload: payload})).toEqual(
            {
                "0": {
                    boardName: "Backlog",
                    boardColor: {R: 46, G: 63, B: 179},
                    boardCards: [
                        mockCard,
                        {
                            title: "new title",
                            desc: "new description",
                            date: {
                                due: {month: 1, day: 1},
                                created: {month: 1, day: 1},
                                updated: {month: 1, day: 1}
                            },
                            assignees: [0]
                        }
                    ]
                },
                "1": {
                    boardName: "In Progress",
                    boardColor: {R: 79, G: 64, B: 251},
                    boardCards: []
                },
            }
        )
    }) 
})