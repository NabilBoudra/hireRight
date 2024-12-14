import api from "../api";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableBody, TableHead } from "@/components/ui/table";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function JobTable() { 
    const [jobs, setJobs] = useState([]); 
    const navigate = useNavigate(); 

    useEffect(() => { 
        const fetchJobs = async () => { 
            const fetchedJobs = await api.get('/statistics-by-job')
            setJobs(fetchedJobs);
        }
        fetchJobs();
    }, [])
    return <Card className="mt-2 w-full">
                <CardHeader>
                    <CardTitle>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Job Listings
                    </h3>
                    <Typography></Typography>
                    </CardTitle>
                    <CardDescription>
                        Overview of all job positions and their applicants
                    </CardDescription>
                    <Table className="mt-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>All Applications</TableHead>
                            <TableHead>Pending Applications</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job, index) => (
                            <TableRow key={index} onClick={
                                () => {
                                    console.log(job.id);
                                    navigate(`/recruiter/${job.id}`)
                                }
                            }>
                                <TableCell className="py-4">{job.title}</TableCell>
                                <TableCell className="py-4">{job.company}</TableCell>
                                <TableCell className="py-4">{job.applicationsCount}</TableCell>
                                <TableCell className="py-4">{job.unreviewedApplicationsCount}</TableCell>
                                <TableCell>      
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.isOpen? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                        {job.isOpen? "Open": "Closed"}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardHeader>
            </Card>
}