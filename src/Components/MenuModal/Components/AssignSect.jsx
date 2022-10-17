import { useContext } from "react"
import smProfile from "../../../Assets/smallProfileImage.svg"
import { ModalContext } from "../../../Contexts/modalContext"
import { TeamContext } from "../../../Contexts/teamContext"
import { AssignModal } from "./AssignModal"
import { ASSIGN, CLOSED } from "./constants"
import { SectionLabel } from "./SectionLabel"

export const AssignSect = ({setModalState, modalState}) => {
    const {teamData} = useContext(TeamContext)
    const {modalData} = useContext(ModalContext);
    const active = modalState === ASSIGN

    //close or open modal
    const handleModalState = () => {
        if(active)
            setModalState(CLOSED)
        else
            setModalState(ASSIGN)
    }

    const generateAssignees = (assignees) => {
        const formatedAssignees = []
        
        assignees.forEach(assignee =>
            formatedAssignees.push(
                <div className="header-bar">
                    <span className="dot">{teamData[assignee].charAt(0)}</span>
                    <span>{teamData[assignee]}</span>
                </div>
            )
        )
        return formatedAssignees
    }

    return (
        <>
            <SectionLabel img={smProfile} label="Assignees" expand={handleModalState} active={active}/>
       
            <div className="Assignees">
                {generateAssignees(modalData.assignees)}
            </div>
            {active ? <AssignModal/> : <></>}
        </>
    )
}
