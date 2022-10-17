import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { useContext } from "react"
import { changeAssign } from "../../../Contexts/Actions/modalAction"
import { ModalContext } from "../../../Contexts/modalContext"
import { TeamContext } from "../../../Contexts/teamContext"
                                        
export const AssignModal = () => { //use state assignees instead of context so users choices can be temporary until saved.
    const {teamData} = useContext(TeamContext)
    const {modalData, modalDispatch} = useContext(ModalContext)

    const checkAssigned = (key) => { return (modalData.assignees.indexOf(key) != -1) }

    //generetes members in a form
    const generateMembers = () => {
        const checkBoxes = []
         
        for(let [key, name] of Object.entries(teamData)){
            checkBoxes.push(
                <FormControlLabel control={
                    <Checkbox 
                        checked={checkAssigned(key)}
                        onChange={() => modalDispatch(changeAssign(key))}
                    />
                }
                label={name}
                />
            )
        }
        return checkBoxes
    }

    return (
        <div className="selector-modal assign">
            <div className="selector-modal-title-wrapper">
                <h4 className="selector-modal-title">Assign</h4>
            </div>

            <div className="list-container">
                <FormGroup>
                    {generateMembers()}
                </FormGroup>
            </div>
        </div>
    )
}