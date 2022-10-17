import { useContext } from "react";
import { openCardModal } from "../../../Contexts/Actions/modalAction";
import { ModalContext } from "../../../Contexts/modalContext";
import { DateWrapper } from "../../MenuModal/Components/dateWrapper";

//Bar the lies above the "Boards" provides controll to board
const BoardSettings = () => {
    const {modalDispatch} = useContext(ModalContext);

    const newCardHandler = () => {
        console.log("Dispatching")
        const date = new DateWrapper()

        modalDispatch(openCardModal("0", "title", "", { created: date.monthDay, updated: date.monthDay}, []))
    }

    return(
        <div id='board-settings'>
            <button className="inactive" onClick={newCardHandler}>New Card</button>
            <button className="inactive">New Board</button>
            <button className="inactive">Board Settings</button>
        </div>
    )
}

export default BoardSettings