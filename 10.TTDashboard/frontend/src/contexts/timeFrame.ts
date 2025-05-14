import React, { createContext } from 'react';

type TimeFrameOption = "Daily" | "Weekly" | "Monthly";

type TimeFrameState = {
    timeFrame: TimeFrameOption;
};

type TimeFrameAction = {
    type: "SET_TIMEFRAME";
    payload: TimeFrameOption;
};

interface TimeFrameContextType {
    timeFrame: TimeFrameState;
    dispatch: React.Dispatch<TimeFrameAction>;
}

const TimeFrameContext = createContext<TimeFrameContextType | undefined>(undefined);

function TimeFrameReducer(
    state: TimeFrameState,
    action: TimeFrameAction
): TimeFrameState {
    switch (action.type) {
        case "SET_TIMEFRAME":
            return { timeFrame: action.payload };
        default:
            return state;
    }
}
  
export { TimeFrameContext, TimeFrameReducer };