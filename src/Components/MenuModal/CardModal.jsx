import { useState } from 'react';
import { useContext } from 'react';
import { closeCardModal, OPEN_EXISTING_CARD } from '../../Contexts/Actions/modalAction';
import { editAndMoveCard, editCard, addCard } from '../../Contexts/Actions/cardAction';
import { ModalContext } from '../../Contexts/modalContext';
import { BoardContext } from '../../Contexts/boardContext';
import { Button, Box } from '@mui/material';
import { box, buttonStyles } from './MUIstyles';
import { Title } from './Components/Title';
import { DescSect } from './Components/DescSect';
import { AssignSect } from './Components/AssignSect';
import { CLOSED } from './Components/constants';
import { BoardSect } from './Components/BoardSect';
import { DateSect } from './Components/DateSect';

const CardModal = () => {
    //fetch global data
    const {modalData, modalDispatch} = useContext(ModalContext)
    const {boardData, boardDispatch} = useContext(BoardContext)
    
    const [boardSelection, setSelect] = useState(modalData.boardID);
    const [selectorModal, setSelectorModal] = useState(CLOSED);

    //quick access to bool values
    const isOldCard = modalData.type === OPEN_EXISTING_CARD
    const isChangingBoards = boardSelection != modalData.boardID

    const closeModal = () => {
        modalDispatch(closeCardModal())
        setSelectorModal(CLOSED) //close selector modal too
    };

    //adds new card to selected board
    const handleSubmit = () => {
        if (!isOldCard){
            boardDispatch(addCard({...modalData}))
            closeModal()
            return
        }

        if(isChangingBoards)
            boardDispatch(editAndMoveCard({...modalData, previousBoardID: boardSelection}))

        else 
            boardDispatch(editCard({...modalData}))

        closeModal()
    }

    return(
        <div
         className='menu-modal'
         onMouseDown={closeModal}
        >
            <div className='modal-content' onMouseDown={(event) => {event.stopPropagation()}}>
                <div className='form-wrapper'>
                    <Box onSubmit={() => {handleSubmit()}}  sx={box}>

                        {/*title, description, board*/}         
                        <Title/>
                        <DescSect setModalState={setSelectorModal}/>
                        <AssignSect setModalState={setSelectorModal} modalState={selectorModal}/>
                        <BoardSect setModalState={setSelectorModal}/>
                        <DateSect setModalState={setSelectorModal} modalState={selectorModal}/>

                        <br/>  
                        <Button 
                        type="button"
                        variant="contained"
                        sx={buttonStyles}
                        onClick={handleSubmit}
                        > Confirm </Button>

                        <Button 
                        type='button'
                        variant='text'
                        sx={buttonStyles}
                        onClick={closeModal}
                        > Cancel </Button>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default CardModal