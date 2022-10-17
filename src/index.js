import React, { useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import Project from './Pages/Project'; 
import { BoardContext, boardState, cardReducer } from './Contexts/boardContext';
import { TeamContext, teamState, teamReducer } from './Contexts/teamContext';
import { ModalContext, modalState, modalReducer} from './Contexts/modalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const [boardData, boardDispatch] = useReducer(cardReducer, boardState);
  const [teamData, teamDispatch] = useReducer(teamReducer, teamState);
  const [modalData, modalDispatch] = useReducer(modalReducer, modalState)
  
  return (
    <BoardContext.Provider value={{boardData, boardDispatch}}>
      <TeamContext.Provider value={{teamData, teamDispatch}}>
        <ModalContext.Provider value={{modalData, modalDispatch}}>
          <Project/>
        </ModalContext.Provider>
      </TeamContext.Provider>
    </BoardContext.Provider>
  )
}

root.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>
);


