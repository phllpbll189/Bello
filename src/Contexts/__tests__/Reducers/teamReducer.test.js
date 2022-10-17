import { ADD_USER } from "../../Actions/teamAction"
import { teamReducer } from "../../teamContext"

const mockData = {
    0: "Arpine Lyputyan",
}

describe("testing teamReducer", () => {
    it("should be able to add to the team", () => {
        expect(teamReducer(mockData, {type: ADD_USER, payload: {user: "Phillip Bell"}})).toEqual(
            {
                ...mockData,
                1: "Phillip Bell"
            }
        )
    })
})