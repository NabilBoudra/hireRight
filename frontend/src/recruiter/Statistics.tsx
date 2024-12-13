import { useEffect, useState } from "react";
import api from "../api";
import ApplicationsChart from "./components/ApplicationsChart";
import Statistic from "./Statistic";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';

export default function Statistics()  { 
    const [statistics, useStatistics] = useState({});
    useEffect(() => { 
        const fetchStatistics = async () => { 
            const fetchedStatiscs = await api.get('/statistics'); 
            useStatistics(fetchedStatiscs);
        } 
        void fetchStatistics();
    }, [])

    return <div className="my-4 flex flex-wrap">
                <Statistic 
                    title={"Unreviewed Applications"} 
                    unit={"Applications"} 
                    statistic={statistics.unreviewedApplicationsCount} 
                    icon={<PendingActionsIcon/>} 
                    description={"Applications pending review"}
                />
                <Statistic 
                    title={"Open Positions"} 
                    unit={"Positions"} 
                    statistic={statistics.openJobsCount} 
                    icon={<WorkHistoryOutlinedIcon/>} 
                    description={"Job positions currently open"}
                />
                <div className="flex-[2]">
                    <ApplicationsChart chartData={statistics.chartStatistics}/>
                </div>
            </div>

}