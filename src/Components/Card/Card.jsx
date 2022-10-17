import activeArrow from "../../Assets/cardArrow.svg"
import inactiveArrow from "../../Assets/cardArrowInactive.svg"
import { useContext } from "react"
import { moveCard } from "../../Contexts/Actions/cardAction"
import { openExistingCardModal } from "../../Contexts/Actions/modalAction"
import { TeamContext } from "../../Contexts/teamContext"
import { ModalContext } from "../../Contexts/modalContext"
import { BoardContext } from "../../Contexts/boardContext"
import { LEFT, RIGHT } from "../constants"
import { MoveButton } from "./Components/MoveButton"

const Card = ({cardID, boardID, position, card}) => {
    const {teamData} = useContext(TeamContext)
    const {modalDispatch} = useContext(ModalContext)
    const {boardDispatch} = useContext(BoardContext)

    //populates the card with correct string
    const handleAssignments = () => {
        const memberCount = card.assignees.length

        switch(memberCount){
            case 0: return ""
            case 1: return teamData[card.assignees[0]]
            default: return `${teamData[card.assignees[0]]}...`
        }
    }

    const handleOpenCard = () => {
        modalDispatch(openExistingCardModal(boardID, cardID, card.title, card.desc, card.date, card.assignees))
    }

    const handleDrag = (ev) => {
        ev.preventDefault()
    }

    const handleDragStart = (ev) => {
        const transferData = {
            ...card,
            cardID,
            previousBoardID: boardID
        }
        const dataToTransfer = JSON.stringify(transferData)

        ev.dataTransfer.dropEffect = "copy"
        ev.dataTransfer.setData("text/plain", dataToTransfer)
    }

    return (
        <div className="card" onClick={handleOpenCard} draggable={true} onDrag={handleDrag} onDragStart={handleDragStart}>
            <MoveButton direction={LEFT} pos={position} onClick={() => boardDispatch(moveCard(boardID, cardID, false))}/>

            <div className="card-description">
                <p className="card-title">{card.title}</p>
                <div className="last-card-info">
                    <p>{handleAssignments()}</p>
                </div>
            </div>

            <MoveButton direction={RIGHT} pos={position} onClick={() => boardDispatch(moveCard(boardID, cardID, true))}/>
        </div>
    );
}

export default Card