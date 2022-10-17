import { createContext } from "react";
import { ADD_USER } from "./Actions/teamAction";
import { mockData } from "./mocks/mockTeamData";

const teamState = mockData

//create context
const TeamContext = createContext( teamState )
TeamContext.displayName = 'team-store';

//create reducer
const teamReducer = (store=teamState, {type, payload}) => {
    switch(type){
        case ADD_USER:
            return addUser(store, payload.user)
        default:
            return store
    }
}

//=================functions===============

const addUser = (store, user) => {
    return {
        ...store,
        [Object.keys.length]: user
    }
}

export {TeamContext, teamState, teamReducer}

