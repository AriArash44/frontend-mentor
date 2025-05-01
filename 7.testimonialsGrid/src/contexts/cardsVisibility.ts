import React, { createContext } from 'react';
import { cardsVisibilityAction, cardsVisibilityActionType } from '../types/cardsVisibilityActions';

interface CardsVisibilityContextType {
    cardsVisibilityState: [boolean, boolean, boolean, boolean, boolean];
    dispatch: React.Dispatch<cardsVisibilityAction>;
}

const cardsVisibilityContext = createContext<CardsVisibilityContextType | undefined>(undefined);

function cardsVisibilityReducer(
    state: [boolean, boolean, boolean, boolean, boolean],
    action: cardsVisibilityAction
): [boolean, boolean, boolean, boolean, boolean] {
    switch (action.type) {
        case cardsVisibilityActionType.toggleCell:
            return state.map((cell, index) =>
                index === action.index ? !cell : cell
            ) as [boolean, boolean, boolean, boolean, boolean];
        default:
            return state;
    }
}
  
export { cardsVisibilityContext, cardsVisibilityReducer };