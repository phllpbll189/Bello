import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useState } from "react"
import { useContext } from "react"
import { BoardContext } from "../../../Contexts/boardContext"
import { ModalContext } from "../../../Contexts/modalContext"
import { changeBoard } from "../../../Contexts/Actions/modalAction"
import { CLOSED } from "./constants"

export const BoardSect = ({setModalState, modalState}) => {
    const {modalData, modalDispatch} = useContext(ModalContext)
    const {boardData, boardDispatch} = useContext(BoardContext)
    const [board, setBoard] = useState(modalData.boardID)

    const genBoards = () => {
        const menuItems = []

        for(let [boardID, value] in Object.entries(boardData)){
            menuItems.push(<MenuItem value={boardID}>{boardData[boardID].boardName}</MenuItem>)
        }

        return menuItems
    }

    const handleChange = (event) => {
        modalDispatch(changeBoard(event.target.value))
        setBoard(event.target.value)
    }

    return (
        <>
            <div className="drop-container">
                <FormControl fullWidth size="small">
                    <InputLabel>Select Board</InputLabel>
                    <Select
                    onFocus={() => setModalState(CLOSED)}
                    value={board}
                    label={"Select Board"}
                    onChange={handleChange}
                    >
                        {genBoards()}
                    </Select>
                </FormControl>
            </div>
        </>
    )
}