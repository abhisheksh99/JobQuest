import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

const AppliedJobTable = () => {
  // Example applied jobs array for demonstration
  const allAppliedJobs = [
    { _id: "1", date: "2025-01-20", title: "Frontend Developer", company: "ABC Corp", status: "rejected" },
    { _id: "2", date: "2025-01-21", title: "Backend Developer", company: "XYZ Ltd", status: "pending" },
    { _id: "3", date: "2025-01-22", title: "Fullstack Developer", company: "Techies Inc", status: "accepted" },
  ];

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                You haven't applied for any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>{appliedJob.date}</TableCell>
                <TableCell>{appliedJob.title}</TableCell>
                <TableCell>{appliedJob.company}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob.status === "rejected"
                        ? "bg-red-400"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
