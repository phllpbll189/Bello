import BoardSettings from "./Components/BoardSettings.jsx";
import BoardSelector from "./Components/BoardSelector.jsx";
import CardModal from "../MenuModal/CardModal";
import Board from "../Board/Board.jsx";
import { CLOSED_STATE } from "../../Contexts/Actions/modalAction.js";
import { useContext } from 'react';
import { BoardContext } from '../../Contexts/boardContext.js';
import { ModalContext } from '../../Contexts/modalContext.js';
import { LEFT, RIGHT } from "../constants.js";

//"wall" that contains Boards, board settings, and board selector
const Wall = () => {
    const {boardData, } = useContext(BoardContext)
    const {modalData, } = useContext(ModalContext)
    const boardArr = []
    
    //creates string that contains either L or R to tell the position.
    const characterizedPosition = (boardArr, boards) => {
        let position = []
        if (boardArr.length === 0){
            position.push(LEFT)
        }
        if(boardArr.length === Object.keys(boards).length - 1){
            position.push(RIGHT)
        }
        return position
    }

    //create boards
    for (const key of Object.keys(boardData)){
        const position = characterizedPosition(boardArr, boardData)

        boardArr.push(
            <Board
                key={key}
                boardID={key}
                position={position}
                board={boardData[key]}
            />
        ) 
    }

    const isClosed = CLOSED_STATE === modalData.type
    
    return (
    
        <>
            {isClosed ? <></> : <CardModal/>}
            <BoardSelector/>
            <div className="project-view-container">
                
                <BoardSettings/>
                <div className="project-container">
                    {boardArr}
                </div>
            </div>
        </>
    )
}

export default Wall