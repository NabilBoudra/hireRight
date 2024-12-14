import ApplicationsChart from "./components/ApplicationsChart";
import Statistic from "./Statistic";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';


export default function JobStatistics({statistics})  { 


    return <div className="my-4 flex flex-wrap">
                <Statistic 
                    title={"Total Applications"} 
                    unit={"Applications"} 
                    statistic={statistics.applicationsCount} 
                    icon={<FileOpenOutlinedIcon/>} 
                    description={"Applications pending review"}
                />
                <Statistic 
                    title={"Unreviewed Applications"} 
                    unit={"applications"} 
                    statistic={statistics.unreviewedApplicationsCount} 
                    icon={<PendingActionsIcon/>} 
                    description={"Job positions currently open"}
                />
                <div className="flex-[2]">
                    <ApplicationsChart chartData={statistics.chartStatistics}/>
                </div>
            </div>

}