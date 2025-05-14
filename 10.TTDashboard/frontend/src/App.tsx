import DashboardPage from "./components/pages/DashboardPage";
import { TimeFrameContext, TimeFrameReducer } from "./contexts/timeFrame";
import { useReducer } from "react";

function App() {
    const [timeFrame, dispatch] = useReducer(TimeFrameReducer, {
        timeFrame: "Daily",
    });
    return (
      <TimeFrameContext.Provider value={{ timeFrame, dispatch }}>
        <DashboardPage />
      </TimeFrameContext.Provider>
    )
}

export default App