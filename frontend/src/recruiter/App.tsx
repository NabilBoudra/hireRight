import TopBar from "./components/TopBar";
import JobTable from "./JobTable";
import Statistics from "./Statistics";

export default function RecruiterApp() { 
    return <div className="flex flex-col min-h-screen bg-gray-100">
        <TopBar/>
        <div className="w-full px-[5%]">
            <Statistics/>
            <div className="w-full">
                <JobTable/>
            </div>
        </div>
    </div>
}
