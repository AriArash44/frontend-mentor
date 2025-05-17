import Card from "../common/Card";
import ProfCard from "../common/ProfCard";
import DashboardLayout from "../layout/DashboardLayout";
import { useGetImage } from "../../hooks/useGetImage";
import { throttledToast } from "../../utils/showToastHandler";
import { useFetcher } from "../../hooks/useFetcher";
import { useContext } from "react";
import { TimeFrameContext } from "../../contexts/timeFrame";

const DashboardPage = () => {
    const {imageSrc, error } = useGetImage("user-image?username=JeremyRobson");
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
          { !imageSrc || !data ?
            <div className="spinner"></div>
          : 
            <>
              <div className="lg:row-span-2">
                <ProfCard profImg={imageSrc} username="Jeremy Robson"/>
              </div>
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