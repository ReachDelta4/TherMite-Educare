import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  QrCode,
  Search,
  CheckCircle,
  XCircle,
  Download,
  Share2,
  Calendar,
  User,
  Award,
  Upload
} from "lucide-react";

const mockCertificates = [
  { id: "CERT-2024-001", name: "John Doe", course: "Full Stack Web Development", date: "2024-03-15", status: "Valid" },
  { id: "CERT-2023-056", name: "Jane Smith", course: "Data Science with Python", date: "2023-11-20", status: "Valid" },
  { id: "CERT-2022-102", name: "Mike Johnson", course: "Project Management Fundamentals", date: "2022-08-01", status: "Expired" },
];

export function CertificateVerification() {
  const [certificateId, setCertificateId] = useState("");
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = () => {
    setIsLoading(true);
    setVerificationResult(null);
    setTimeout(() => {
      const foundCert = mockCertificates.find(c => c.id === certificateId);
      setVerificationResult(foundCert || { id: certificateId, status: "Not Found" });
      setIsLoading(false);
    }, 1500);
  };

  const VerificationResultCard = () => {
    if (!verificationResult) return null;

    if (verificationResult.status === "Not Found") {
        return (
            <Card className="mt-6 border-red-500">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <XCircle className="h-8 w-8 text-red-500" />
                        <div>
                            <CardTitle>Certificate Not Found</CardTitle>
                            <CardDescription>The certificate ID '{verificationResult.id}' is invalid.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        );
    }
    
    const isValid = verificationResult.status === 'Valid';

    return (
        <Card className={`mt-6 ${isValid ? 'border-green-500' : 'border-yellow-500'}`}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {isValid ? <CheckCircle className="h-8 w-8 text-green-500" /> : <XCircle className="h-8 w-8 text-yellow-500" />}
                        <div>
                            <CardTitle>Certificate {verificationResult.status}</CardTitle>
                            <CardDescription>ID: {verificationResult.id}</CardDescription>
                        </div>
                    </div>
                    <Badge variant={isValid ? "default" : "destructive"}>{verificationResult.status}</Badge>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2"><User className="h-4 w-4"/><span>{verificationResult.name}</span></div>
                <div className="flex items-center gap-2"><Award className="h-4 w-4"/><span>{verificationResult.course}</span></div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4"/><span>Issued on: {verificationResult.date}</span></div>
            </CardContent>
            <CardContent className="flex gap-2">
                <Button variant="outline"><Download className="h-4 w-4 mr-2"/> Download</Button>
                <Button variant="outline"><Share2 className="h-4 w-4 mr-2"/> Share</Button>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Certificate Verification</h1>
          <p className="text-muted-foreground">
            Verify the authenticity of certificates issued by our platform
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Verify Certificate</CardTitle>
          <CardDescription>Enter the unique certificate ID to verify its status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter Certificate ID (e.g., CERT-2024-001)"
              value={certificateId}
              onChange={e => setCertificateId(e.target.value)}
            />
            <Button onClick={handleVerification} disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <VerificationResultCard />

      <Card>
        <CardHeader>
          <CardTitle>Bulk Verification</CardTitle>
          <CardDescription>Upload a CSV file to verify multiple certificates at once.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border-2 border-dashed rounded-lg text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="mt-2 text-sm">Drag & drop CSV file here</p>
            <Button variant="outline" size="sm" className="mt-2">Browse File</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 