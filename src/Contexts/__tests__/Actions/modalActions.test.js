import { changeAssign, CHANGE_ASSIGN, openCardModal, OPEN_CARD_MODAL, openExistingCardModal, OPEN_EXISTING_CARD, changeBoard, CHANGE_BOARD, changeDueDate, changeDesc, changeTitle, CHANGE_TITLE, CHANGE_DESC, CHANGE_DUE_DATE, closeCardModal, CLOSE_CARD_MODAL} from "../../Actions/modalAction"

describe("modal action tests", () => {
    const mockDate = {
        due: {month: 1, day: 1}, 
        created: {month: 2, day: 2},
        updated: {month: 3, day: 3}
    }

    beforeAll(() => {
        jest.useFakeTimers('modern')
        jest.setSystemTime(new Date('2022-7-25'))
    })

    test("open card modal returns the expected object", () => {
        expect(openCardModal("0", "hello", "world", mockDate, [0])).toEqual(
            {
                type: OPEN_CARD_MODAL,
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
        )
    })

    test("open existing card modal returns expected object", () => {
        expect(openExistingCardModal("0", 0, "hello", "world", mockDate, [0])).toEqual(
            {
                type: OPEN_EXISTING_CARD,
                boardID: "0",
                title: "hello",
                description: "world",
                date: {
                    due: {month: 1, day: 1}, 
                    created: {month: 2, day: 2},
                    updated: {month: 3, day: 3}
                },
                cardIndex: 0,
                assignees: [0]
            }
        )
    })

    test("change assign action returns expected object", () => {

        expect(changeAssign(0)).toEqual(
            {
                type: CHANGE_ASSIGN,
                assignees: 0,
                updated: {
                    month: 6,
                    day: 25
                }
            }
        )
    })

    test("change board action returns expected object", () => {
        expect(changeBoard(0)).toEqual(
            {
                type: CHANGE_BOARD, 
                boardID: 0,
                updated: {
                    month: 6,
                    day: 25
                }
            }
        )
    })

    test("change due date returns expected object", () =>{
        expect(changeDueDate({due: {month: 1, day: 1}})).toEqual({
            type: CHANGE_DUE_DATE,
            date: {due: {month: 1, day: 1}},
            updated: {
                month: 6,
                day: 25
            }
        })
    })
    test("change description returns expected object", () =>{
        expect(changeDesc("world")).toEqual({
            type: CHANGE_DESC,
            description: "world",
            updated: {
                month: 6,
                day: 25
            }
        })
    })
    test("change title returns expected object", () =>{
        expect(changeTitle("hello")).toEqual({
            type: CHANGE_TITLE,
            title: "hello",
            updated: {
                month: 6,
                day: 25
            }
        }) 
    })
    test("close card modal returns expected object", () => {
        expect(closeCardModal()).toEqual({
            type: CLOSE_CARD_MODAL
        })
    })
})