import { Action, configureStore } from '@reduxjs/toolkit';

interface UIState {
    active: boolean;
}

const initialState: UIState = { active: false };

type ActivityAction =
    | { type: "MAKE_ACTIVE" }
    | { type: "MAKE_INACTIVE" }
    | { type: "TOGGLE_ACTIVE_STATE" };

type ExtendedActivityAction = ActivityAction | Action<string>;

const activeReducer = (
    state: UIState = initialState,
    action: ExtendedActivityAction
): UIState => {
    switch (action.type) {
        case "MAKE_ACTIVE":
            return { active: true };
        case "MAKE_INACTIVE":
            return { active: false };
        case "TOGGLE_ACTIVE_STATE":
            return { active: !state.active };
        default:
            return state;
    }
};

const activityStore = configureStore({
    reducer: {
        uiState: activeReducer,
    },
});

export type RootState = ReturnType<typeof activityStore.getState>;

export default activityStore;