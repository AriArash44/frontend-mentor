import Card from "../common/Card";
import ProfCard from "../common/ProfCard";
import DashboardLayout from "../layout/DashboardLayout";
import { useGetImage } from "../../hooks/useGetImage";
import { throttledToast } from "../../utils/showToastHandler";
import { useFetcher } from "../../hooks/useFetcher";
import { useContext } from "react";
import { TimeFrameContext } from "../../contexts/timeFrame";

const DashboardPage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {imageSrc, error, loading} = useGetImage("user-image?username=JeremyRobson");
    const { timeFrame } = useContext(TimeFrameContext)!;
    const { data } = useFetcher(`time-data?timeSlot=${timeFrame["timeFrame"].toLowerCase()}`);
    if (error) {
        throttledToast("An error occurred");
    }
    return (
      <DashboardLayout>
        <DashboardLayout.Header>
          <h1 className="sr-only hidden">time tracking dashboard</h1>
        </DashboardLayout.Header>
        <DashboardLayout.Main>
          { !imageSrc ?
            <div className="spinner"></div>
          : 
            <>
              <ProfCard profImg={imageSrc} username="Jeremy Robson"/>
              {data.map((item: any) => (
                <Card headImg={item["title"].toLowerCase().replace(/ /g, "-")} title={item["title"]}
                    value={item["current"]} preValue={item["previous"]} key={item["title"]}/>
              ))}
            </>
          }
        </DashboardLayout.Main>
      </DashboardLayout>
    );
};

export default DashboardPage;