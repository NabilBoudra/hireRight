import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableBody, TableHead } from "@/components/ui/table";
import { Typography } from "@mui/material";

const mockData = [
    {
        jobTitle: "Software Engineer",
        allApplicants: 120,
        pendingApplicants: 30,
        status: "Open",
        actions: "View"
    },
    {
        jobTitle: "Product Manager",
        allApplicants: 80,
        pendingApplicants: 20,
        status: "Closed",
        actions: "View"
    },
    {
        jobTitle: "Data Scientist",
        allApplicants: 100,
        pendingApplicants: 25,
        status: "Open",
        actions: "View"
    },
    {
        jobTitle: "UX Designer",
        allApplicants: 60,
        pendingApplicants: 15,
        status: "Open",
        actions: "View"
    },
    {
        jobTitle: "DevOps Engineer",
        allApplicants: 90,
        pendingApplicants: 10,
        status: "Closed",
        actions: "View"
    }
];

export default function JobTable() { 
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
                            <TableHead>All Applications</TableHead>
                            <TableHead>Pending Applications</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockData.map((job, index) => (
                            <TableRow key={index} onClick={
                                () => {
                                    console.log("Viewing job", job.jobTitle);
                                }
                            }>
                                <TableCell>{job.jobTitle}</TableCell>
                                <TableCell>{job.allApplicants}</TableCell>
                                <TableCell>{job.pendingApplicants}</TableCell>
                                <TableCell>      
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.status === "Open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                        {job.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardHeader>
            </Card>
}