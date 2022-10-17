import { addUser, ADD_USER } from "../../Actions/teamAction"

describe("team action tests", () => {
    
    test("add user returns correct object", () => {
        expect(addUser("phillip")).toEqual({
            type: ADD_USER,
            payload:{
                user: "phillip"
            }
        })
    })
})