import { changeAssign, CHANGE_ASSIGN, CHANGE_BOARD, CHANGE_DESC, CHANGE_DUE_DATE, CHANGE_TITLE, CLOSED_STATE, CLOSE_CARD_MODAL, OPEN_CARD_MODAL, OPEN_EXISTING_CARD } from "../../Actions/modalAction"
import { mockData } from "../../mocks/mockModalData"
import { modalReducer } from "../../modalContext"

const mockState = {
    type: CLOSED_STATE,
    title: "title",
    description: "",
    boardID: "0",
    date: {
        due: {month: 1, day: 1},
        created: {month: 1, day: 1},
        updated: {month: 1, day: 1}
    },
    assignees: []
}

const constructMockPayload = (type) => {
    return {
        type: type,
        title: "open title",
        description: "open description",
        boardID: '0',
        date: {month: 3, day: 1},
        cardIndex: 0,
        assignees: 0,
        updated: {month: 5, day: 1}
    }
}

describe("Test modal reducer", () => {
    
    it("should be able to open default card modal", () => {
        const payload = constructMockPayload(OPEN_CARD_MODAL)

        expect(modalReducer(mockState, payload)).toEqual(
            {
                type: payload.type,
                title: payload.title,
                description: payload.description,
                boardID: payload.boardID,
                date: payload.date,
                assignees: payload.assignees
            }
        )
    })

    it("shohuld be able to open existing cards", () => {
        const payload = constructMockPayload(OPEN_EXISTING_CARD)

        expect(modalReducer(mockState, payload)).toEqual(
            {
                type: payload.type,
                title: payload.title,
                description: payload.description,
                boardID: payload.boardID,
                date: payload.date,
                assignees: payload.assignees,
                cardIndex: payload.cardIndex
            }
        )
    })

    it("should be able to change boards to cards", () => {
        const payload = constructMockPayload(CHANGE_BOARD)

        expect(modalReducer(mockState, payload)).toEqual(
            {
                ...mockState,
                boardID: payload.boardID,
                date: {
                    ...mockState.date,
                    updated: payload.updated
                },
            }
        )
    })

    it("should be able to change the due date on card", () => {
        const payload = constructMockPayload(CHANGE_DUE_DATE)

        expect(modalReducer(mockState, payload)).toEqual(
            {
                ...mockState,
                date: {
                    due: payload.date,
                    created: {month: 1, day: 1},
                    updated: payload.updated
                },
            }
        )
    })

    it("should be able to change the title", () => {
        const payload = constructMockPayload(CHANGE_TITLE)

        expect(modalReducer(mockState, payload)).toEqual(
            {
                ...mockState,
                title: payload.title,
                date:{
                    ...mockState.date,
                    updated: payload.updated
                }
            }
        )
    })

    it("should be able to change the description", () => {
        const payload = constructMockPayload(CHANGE_DESC)

        expect(modalReducer(mockState, payload)).toEqual(
            {
                ...mockState,
                description: payload.description,
                date: {
                    ...mockState.date,
                    updated: payload.updated
                }
            }
        )
    })

    it("should be add and remove an assignee", () => {
        const payload = constructMockPayload(CHANGE_ASSIGN)
        const removeAssigneeMock = {
            ...mockState,
            assignees: [payload.assignees],
            date: {
                ...mockState.date,
                updated: payload.updated
            }
        }

        expect(modalReducer(mockState, payload)).toEqual(removeAssigneeMock)

        expect(modalReducer(removeAssigneeMock, payload)).toEqual(
            {
                ...mockState,
                assignees: [],
                date: {
                    ...mockState.date,
                    updated: payload.updated
                }
            }
        )
    })

    it("should be able to close", () => {
        const payload = constructMockPayload(CLOSE_CARD_MODAL)

        const diffMockState = {
            ...mockState,
            type: "NOT_CLOSED"
        }

        expect(modalReducer(diffMockState, payload)).toEqual(
            {
                ...mockState,
            }
        )
    })
})