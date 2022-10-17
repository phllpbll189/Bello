import { useContext, useEffect } from "react"
import { useState } from "react"
import { changeDueDate } from "../../../Contexts/Actions/modalAction"
import { ModalContext } from "../../../Contexts/modalContext"
import { DateWrapper } from "./dateWrapper"
import { MoveButton } from "../../Card/Components/MoveButton"
import { LEFT, RIGHT } from "../../constants"

export const DateModal = () => {
    const {modalData, modalDispatch} = useContext(ModalContext)
    const datehelper = new DateWrapper(modalData.date.due)

    const [selectedMonth, setSelectedMonth] = useState(datehelper.monthDay.month)
    const [selectedDate, setSelectedDate] = useState(datehelper.monthDay)
    const [calenderContent, setCalendarContent] = useState(generateDates())

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    //prevent running genDates every click
    //not sure if necassary but good practice.
    useEffect(() => {
        setCalendarContent(generateDates())
    }, [selectedMonth])

    //generates the correct numbers for dates
    //using hoisting to my advantage here.
    function generateDates() {
        datehelper.calendarMonth = selectedMonth
        let result = []

        while(!datehelper.lastOfCalendarMonth()){
            result.push(datehelper.monthDay)
            datehelper.next()
        }

        return result
    }

    //compare 2 date objects
    const sameDate = (firstDate, secondDate) => {
        return (firstDate.day == secondDate.day && secondDate.month == firstDate.month)
    }

    const createWeek = () => {
        const result = []

        weekdays.forEach(day => {
            result.push(<span className="week-day">{day}</span>)
        })
        return result
    }

    const handleDateSelection = (date) => {
        setSelectedDate(date)
        setSelectedMonth(date.month)
        modalDispatch(changeDueDate(date))
    }

    const changeMonth = (direction) => {
        if(direction == LEFT){
            setSelectedMonth(selectedMonth - 1)
        } else {
            setSelectedMonth(selectedMonth + 1)
        }
    }

    //generate spans with correct functions and classes
    const createCalendarDays = () => {
        let result = createWeek()
        calenderContent.forEach(date => {
            if(sameDate(date, selectedDate)){
                result.push(<span className="selected date-span">{date.day}</span>)
            }
            else{
                result.push(
                <span
                 className={date.month == selectedMonth ? "current date-span" : "previous date-span"}
                 onClick={() => handleDateSelection(date)}
                >{date.day}</span>)
            }
        })
        return result
    }

    return(
        <div className="selector-modal date">
            <div className="date-month-header">
                <MoveButton direction={LEFT} pos={[]} onClick={() => changeMonth(LEFT)}/>
                <h4 style={{textAlign: "center"}}>{months[selectedMonth]}</h4>
                <MoveButton direction={RIGHT} pos={[]} onClick={() => changeMonth(RIGHT)}/>
            </div>
            <div className="date-num-container">
                {createCalendarDays()}
            </div> 
        </div>
    )
}