import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableBody, TableHead } from "@/components/ui/table";
import { Typography } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import api from "@/api";
import { Link, useParams } from "react-router";

export default function applicantsTable({applicants, setApplicants}) { 
    const { id } = useParams(); 
    const handleToggleFactory = (userId) => { 
            return () => { 
                const toggleStatus = async () => { 
                    await api.put(`/toggle-status`, {jobId: id, userId});
                    const updatedApplicants = applicants.map(applicant => {
                        if(applicant.id === userId) {
                            applicant.isReviewed = !applicant.isReviewed;
                        }
                        return applicant;
                    });
                    setApplicants(updatedApplicants);
                }
                toggleStatus();
            }
        };
    
    return <Card className="mt-2 w-full">
                <CardHeader>
                    <CardTitle>
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Candidate applicants
                    </h3>
                    <Typography></Typography>
                    </CardTitle>
                    <CardDescription>
                        Overview of all candidate applicants and their status
                    </CardDescription>
                    <Table className="mt-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Applicant Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Summary</TableHead>
                            <TableHead>Skills</TableHead>
                            <TableHead>YoE</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Resume</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applicants.map((applicant, index) => (
                            <TableRow key={index}>
                                <TableCell className="py-4">{applicant.name}</TableCell>
                                <TableCell>      
                                <span onClick={handleToggleFactory(applicant.id)} className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    applicant.isReviewed 
                                        ? "bg-green-100 text-green-800"    // Reviewed state - green
                                        : "bg-yellow-100 text-yellow-800"  // Pending state - yellow
                                    }`}>
                                    {applicant.isReviewed ? "Reviewed" : "Pending Review"}
                                </span>
                                </TableCell>
                                <TableCell className="py-4">
                                <ul className="space-y-3">
                                    {applicant.summary.map((point, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span className="text-gray-700">{point}</span>
                                    </li>
                                    ))}
                                </ul>
                                </TableCell>
                                <TableCell className="py-4">
                                    {applicant.skills.map((point, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="inline-block w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span className="text-gray-700">{point}</span>
                                    </li>
                                    ))}
                                </TableCell>
                                <TableCell >{applicant.yoe}</TableCell>
                                <TableCell>{applicant.score}</TableCell>
                                <TableCell>
                                    <a 
                                        href={ api.defaults.baseURL + applicant.url}
                                        download
                                    >
                                        <FileDownloadOutlinedIcon className="hover:text-blue-500"/>
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardHeader>
            </Card>
}