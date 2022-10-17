import TitleIcon from "../../../Assets/TItleIcon.svg"
import { TextField } from "@mui/material"
import { titleText } from "../MUIstyles"
import { useContext } from "react"
import { ModalContext } from "../../../Contexts/modalContext"
import { changeTitle } from "../../../Contexts/Actions/modalAction"
import { useState } from "react"

export const Title = () => {
    const {modalData, modalDispatch} = useContext(ModalContext)
    //store in component so it doesn't reset after every keystroke
    const [title, setTitle] = useState(modalData.title);

    return (
        <div className="header-bar Bar">
            <img src={TitleIcon}/>
            
            <TextField
            value={title}
            onChange={(event) => {setTitle(event.target.value)}}
            onBlur={() => {modalDispatch(changeTitle(title))}}
            placeholder='title'
            variant='standard'
            margin="dense"
            sx={titleText}
            />
        </div>
    ) 
}