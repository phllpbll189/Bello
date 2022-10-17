import { CLOSED_STATE } from "../Actions/modalAction"

export const mockData = {
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