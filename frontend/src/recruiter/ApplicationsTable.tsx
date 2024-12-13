import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableBody, TableHead } from "@/components/ui/table";
import { Typography } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const applicants = [
  {
    name: "John Doe",
    summary: [
      "Developed scalable web applicants using React.js.",
      "Led a team of 5 engineers to deliver a fintech solution.",
    ],
    yoe: 7,
    skills: ["React.js", "Node.js", "Docker"],
    isReviewed: false,
    score: 85
  },
  {
    name: "Jane Smith",
    summary: [
      "Designed REST APIs for e-commerce platforms.",
      "Optimized database performance, reducing query time by 40%.",
    ],
    yoe: 5,
    skills: ["Java", "SQL", "Spring Boot"],
    isReviewed: true,
    score: 90
  },
  {
    name: "Michael Brown",
    summary: [
      "Built microservices architecture for healthcare applicants.",
      "Migrated legacy systems to modern cloud infrastructure.",
    ],
    yoe: 10,
    skills: ["Python", "AWS", "Kubernetes"],
    isReviewed: false,
    score: 95
  },
  {
    name: "Emily White",
    summary: [
      "Created responsive UIs for web and mobile applicants.",
      "Collaborated with designers to ensure UX consistency.",
    ],
    yoe: 4,
    skills: ["HTML", "CSS", "JavaScript"],
    isReviewed: true,
    score: 75
  }
];

  
export default function applicantsTable() { 

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
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                                    {applicant.skills[0]} - {applicant.skills[1]} - {applicant.skills[2]}
                                </TableCell>
                                <TableCell >{applicant.yoe}</TableCell>
                                <TableCell>{applicant.score}</TableCell>
                                <TableCell className="flex ">
                                  <FileDownloadOutlinedIcon/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </CardHeader>
            </Card>
}