import { SectionLabel } from "./SectionLabel"
import dateIcon from "../../../Assets/DateIcon.svg"
import { CLOSED, DATE } from "./constants"
import { DateModal } from "./DateModal"
import { ModalContext } from "../../../Contexts/modalContext"
import { useContext } from "react"

const DUE_DATE = "due"
const CREATED_DATE = "created"
const UPDATED_DATE = "updated"

export const DateSect = ({setModalState, modalState}) => {
    const {modalData} = useContext(ModalContext)
    const active = modalState == DATE

    const handleModalState = () => {
        if(active){
            setModalState(CLOSED)
            return
        }
        setModalState(DATE)
    }

    //creates element that shows the dates related to card
    const createSpan = (dateType) => {
        if(typeof modalData.date[dateType] == "undefined"){
            return <></>
        }
        const string = dateType.charAt(0).toUpperCase() + dateType.slice(1) + ": "

        return (
            <>
                <span className="date-text">{string}</span>
                <span>{modalData.date[dateType].month+1 + "/" + modalData.date[dateType].day}</span>
            </>
        )
  
    }

    return(
        <>
            <SectionLabel img={dateIcon} label="Date" expand={handleModalState} active={active}/>
            <div className="date-container">
                {createSpan(DUE_DATE)}
                <br/>
                {createSpan(CREATED_DATE)}
                <br/>
                {createSpan(UPDATED_DATE)}
            </div>
            {active ? <DateModal/> : <></>}
        </>
    )
}