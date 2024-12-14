import TopBar from "./components/TopBar";
import api from "../api";
import ApplicationsTable from "./ApplicationsTable";
import JobStatistics from "./JobStatistics";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function JobDetails() { 
    const [statistics, setStatistics] = useState({});
    const [applicants, setApplicants] = useState([]);
    const { id } = useParams(); 

    useEffect(() => { 
      const fetchData = async () => { 
        const fetchedData = await api.get(`/applicants/${id}`)
        setApplicants(fetchedData);
      }; 
      fetchData();
    }, [])

    useEffect(() => { 
        const fetchJobs = async () => { 
            const fetchedStatistics = await api.get(`/statistics-by-job/${id}`)
            setStatistics(fetchedStatistics);
        }
        fetchJobs();
    }, [applicants])

    return <div className="flex flex-col min-h-screen bg-gray-100">
        <TopBar/>
        <div className="w-full px-[5%]">
            <JobStatistics statistics={statistics} />
            <div className="w-full">
                <ApplicationsTable applicants={applicants} setApplicants={setApplicants}/>
            </div>
        </div>
    </div>
}