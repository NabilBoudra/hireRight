import TopBar from "./components/TopBar";
import ApplicationsTable from "./ApplicationsTable";
import JobStatistics from "./JobStatistics";

export default function JobDetails() { 
    console.log("This is being rendered again")
    return <div className="flex flex-col min-h-screen bg-gray-100">
        <TopBar/>
        <div className="w-full px-[5%]">
            <JobStatistics/>
            <div className="w-full">
                <ApplicationsTable/>
            </div>
        </div>
    </div>
}