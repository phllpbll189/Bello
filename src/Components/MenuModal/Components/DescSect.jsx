
import DescIcon from "../../../Assets/DescriptionIcon.svg"
import { TextField } from "@mui/material"
import { textAreaStyle } from "../MUIstyles"
import { SectionLabel } from "./SectionLabel"
import { CLOSED } from "./constants"
import { useState } from "react"
import { ModalContext } from "../../../Contexts/modalContext"
import { changeDesc } from "../../../Contexts/Actions/modalAction"
import { useContext } from "react"

export const DescSect = ({setModalState}) => {
    const {modalData, modalDispatch} = useContext(ModalContext)
    const [contents, setContents] = useState(modalData.description) //store in state to prevent dispatch after every key
    
    return (
        <>
            <SectionLabel img={DescIcon} label="Description"/>

            <TextField
            onFocus={() => setModalState(CLOSED)}
            onBlur={() => modalDispatch(changeDesc(contents))}
            value={contents}
            minRows={15}
            maxRows={25}
            multiline
            variant="filled"
            margin="dense"
            sx={textAreaStyle}
            onChange={(event) => setContents(event.target.value)}
            />
        </>
    )
}