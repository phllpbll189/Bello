import { DateWrapper } from "../dateWrapper"

describe("tests dateWrapper object", () => {
    const mockDate = new Date('2022-1-25')
    
    beforeAll(() => {
        jest.useFakeTimers('modern')
        jest.setSystemTime(new Date('2022-1-25'))
    })

    //constructor tests
    it("should be able to be constructed from nothing", () => {
        const mockDateWrapper = new DateWrapper()
        expect(mockDateWrapper.date).toEqual(mockDate)
    })

    it("Should be able to have predefined date in constructor", () => {
        const mockDateWrapper = new DateWrapper({day: 25, month: 0})
        expect(mockDateWrapper.date).toEqual(mockDate)
    })

    it("Should handle incorrect input to the constructor", () => {
       expect(() => {new DateWrapper("not a date")}).toThrowError("not correct constructor item")
       expect(() => {new DateWrapper({})}).toThrowError("not correct constructor item")
       expect(() => {new DateWrapper({day: 32})}).toThrowError("not correct constructor item")
       expect(() => {new DateWrapper({month: 1})}).toThrowError("not correct constructor item")
       expect(() => {new DateWrapper({month: 12, day: 1})}).toThrowError("month or date is to large")
       expect(() => {new DateWrapper({month: 6, day: 32})}).toThrowError("month or date is to large")
    })

    //monthDay tests
    it("Should return monthDay obj in correct format", () => {
        const mockDateWrapper = new DateWrapper()
        const monthDayObj = {day: 25, month: 0}

        expect(Object.keys(mockDateWrapper.monthDay)).toContain("month")
        expect(Object.keys(mockDateWrapper.monthDay)).toContain("day")
        expect(Object.keys(mockDateWrapper.monthDay).length).toEqual(2)
        expect(mockDateWrapper.monthDay).toEqual(monthDayObj)
    })

    it("should begin months index at 0 with monthDay()", () => {
        //month of january (1) should return as month of 0 for beginning of array
        const mockDateWrapper = new DateWrapper()
        mockDateWrapper.Date = mockDate
        expect(mockDateWrapper.monthDay).toEqual({month: 0, day: 25})

        const endDate = new Date('2022-12-2')
        mockDateWrapper.Date = endDate
        expect(mockDateWrapper.monthDay).toEqual({month: 11, day: 2})
    })

    //next day tests
    test("next sets date to next day", () => {
        //setup mockDateWrapper like this to avoid local timezone issues
        const mockDateWrapper = new DateWrapper({month: 0, day: 25})

        //test it goes to next day normally
        mockDateWrapper.next()
        expect(mockDateWrapper.monthDay).toEqual({month: 0, day: 26})

        //test that it goes into the next year
        mockDateWrapper.Date = new Date('2022-12-31T00:00:00')
        mockDateWrapper.next()
        expect(mockDateWrapper.date).toEqual(new Date('2023-01-01T00:00:00')) 
    })

    //set calendarMonth() tests
    test("set calendar month sets to the beginning of the selected calendar month", () => {
        //NOTE the calendar month can start on the previous month if the month doesn't start on a sunday
        const mockDateWrapper = new DateWrapper()
        mockDateWrapper.calendarMonth = 0

        expect(mockDateWrapper.monthDay).toEqual({month: 11, day: 26})
    })

    test("set calendar month throws on bad input", () => {
        const mockDateWrapper = new DateWrapper()
        
        expect(() => {mockDateWrapper.calendarMonth = 12}).toThrow("Invalid Argument: Recieved 12, Expected a number under 12")
    })

    //lastOfCalendarMonth() tests
    test("lastOfCalendarMonth() can detect when calendar month ended", () => {
        const mockDateWrapper = new DateWrapper({month: 6, day: 31})
        expect(mockDateWrapper.lastOfCalendarMonth()).toBeFalsy()

        mockDateWrapper.next()
        expect(mockDateWrapper.lastOfCalendarMonth()).toBeTruthy()
    })

    test("Date setter throws if date is set incorrectly", () => {
        const mockDateWrapper = new DateWrapper()
        expect(() => {mockDateWrapper.Date = "this is not a date"}).toThrow("not a date object")
    })
})