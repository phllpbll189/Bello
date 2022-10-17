import { useContext } from "react";
import { editAndMoveCard } from "../../Contexts/Actions/cardAction";
import { BoardContext } from "../../Contexts/boardContext";
import Card from "../Card/Card";

//Board within the "Wall" component
const Boards = ({boardID, position, board}) => {
    const {boardData, boardDispatch} = useContext(BoardContext)
    const color = board.boardColor

    const gradient = {
        background: `linear-gradient(180deg, rgb(${color.R}, ${color.G}, ${color.B}) 0%, rgb(${color.R/2}, ${color.G/2}, ${color.B/2}) 100%)`
    }

    //Generate Cards with provided data
    function generateCards(cards){
        let cardArr = []

        for(const card of cards){
            cardArr.push(
                <Card 
                    key={cardArr.length}
                    cardID={cardArr.length}
                    boardID={boardID}
                    position={position}
                    card={card}
                />
            );
        }
        return cardArr
    }

    const dragOverHandler = (ev) => {
        ev.preventDefault();
    }

    const dropHandler = (ev) => {
        const data = ev.dataTransfer.getData("text/plain")
        const {title, desc, date, assignees, cardID, previousBoardID} = JSON.parse(data)

        if(previousBoardID == boardID)
            return
        
        boardDispatch(editAndMoveCard({boardID, title, description: desc, date, assignees, previousBoardID, cardIndex: cardID}))
    }

    return (
        <>
            <div className="board-container" onDrop={dropHandler} onDragOver={dragOverHandler}>
                <div style={gradient} className="board-head">
                    <h3>{board.boardName}</h3>
                </div>
                <div className="card-container">
                    {generateCards(board.boardCards)}
                </div>
            </div>
        </>
    )
}

export default Boards