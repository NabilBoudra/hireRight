import ApplicationsChart from "./components/ApplicationsChart";
import TopBar from "./components/TopBar";
import JobTable from "./JobTable";
import Statistic from "./Statistic";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';

export default function RecruiterApp() { 
    return <div className="flex flex-col min-h-screen bg-gray-100">
        <TopBar/>
        <div className="w-full px-[5%]">
            <div className="my-4 flex flex-wrap">
                <Statistic 
                    title={"Unreviewed Applications"} 
                    unit={"Applications"} 
                    statistic={30} 
                    icon={<PendingActionsIcon/>} 
                    description={"Applications pending review"}
                />
                <Statistic 
                    title={"Open Positions"} 
                    unit={"Positions"} 
                    statistic={10} 
                    icon={<WorkHistoryOutlinedIcon/>} 
                    description={"Job positions currently open"}
                />
                <div className="flex-[2]">
                    <ApplicationsChart/>
                </div>
            </div>
            <div className="w-full">
                <JobTable/>
            </div>
        </div>
    </div>
}
