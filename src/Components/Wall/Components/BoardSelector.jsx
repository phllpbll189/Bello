
//Bar that lies to the left of the "Boards" Allows switching between different boards
const BoardSelector = () => {

    return(
        <div className="board-selectors">
            <h3 id="selector-header">Walls</h3>
            <button className="active">Wall 1</button>
            <button className="inactive">Wall 2</button>
        </div>
    )
}

export default BoardSelector