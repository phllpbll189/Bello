//left and right move buttons for cards
import activeArrow from "../../../Assets/cardArrow.svg"
import inactiveArrow from "../../../Assets/cardArrowInactive.svg"
import { LEFT } from "../../constants"

export const MoveButton = ({direction, pos, onClick}) => {
    const disabled = pos.includes(direction)
    const classname = direction + " arrow"

    const funcWrapper = (event) => {
        event.stopPropagation()
        onClick()
    }

    return (
        <button disabled={disabled}>
            <img 
                src={disabled ? inactiveArrow : activeArrow}   
                className={classname}
                onClick={funcWrapper}
                alt="Right Arrow"
                /> 
        </button> 
    )
}