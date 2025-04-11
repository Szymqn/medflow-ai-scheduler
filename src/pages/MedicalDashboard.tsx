
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layouts/MainLayout';
import StatusBadge from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for upcoming operations
const upcomingOperations = [
  {
    id: 1,
    patientName: "John Smith",
    operationDate: "2024-01-15 13:15",
    doctor: "Dr. Mark Twain",
    testStatus: "tbd" as const,
  },
  {
    id: 2,
    patientName: "Tom May",
    operationDate: "2024-05-05 14:25",
    doctor: "Dr. John Smith",
    testStatus: "pending" as const,
  },
];

// Mock data for upcoming tests
const upcomingTests = [
  {
    id: 1,
    testName: "Blood Test",
    patientName: "John Smith",
    date: "2024-01-15 13:15",
    doctor: "Dr. Mark Twain",
    status: "pending" as const,
  },
  {
    id: 2,
    testName: "MRI Scan",
    patientName: "Jane Brown",
    date: "2024-05-05 14:25",
    doctor: "Dr. John Smith",
    status: "tbd" as const,
  },
];

const MedicalDashboard = () => {
  const { toast } = useToast();
  
  const handleCall = (patientName: string) => {
    toast({
      title: "Calling patient",
      description: `Initiating call to ${patientName}...`,
    });
  };

  return (
    <MainLayout
      hospitalName="MedFlow"
      userName="Dr. John Smith"
      userRole="medical"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Operation Status TBD</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {upcomingOperations.map((operation) => (
                <div
                  key={operation.id}
                  className="p-4 rounded-md bg-blue-50"
                >
                  <h3 className="font-medium">{operation.patientName}</h3>
                  
                  <div className="mt-2 text-sm text-gray-500">
                    <div>Date: {operation.operationDate}</div>
                    <div>Doctor: {operation.doctor}</div>
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <StatusBadge status={operation.testStatus} />
                    
                    <Button
                      variant="outline"
                      className="text-xs h-8"
                      onClick={() => {
                        toast({
                          title: "View details",
                          description: `Viewing details for ${operation.patientName}'s operation.`,
                        });
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Call Module</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {upcomingOperations.map((operation) => (
                <div
                  key={operation.id}
                  className="p-4 rounded-md bg-medgray-100 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{operation.patientName}</h3>
                    <p className="text-sm text-gray-500">
                      Operation: {new Date(operation.operationDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <Button
                    className="bg-blue text-white hover:bg-blue-600"
                    onClick={() => handleCall(operation.patientName)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Test Dates</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {upcomingTests.map((test) => (
                <div
                  key={test.id}
                  className="p-4 rounded-md bg-blue-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{test.testName}</h3>
                      <p className="text-sm">Patient: {test.patientName}</p>
                    </div>
                    
                    <StatusBadge status={test.status} />
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-500">
                    <div>Date: {test.date}</div>
                    <div>Doctor: {test.doctor}</div>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <Button
                      size="sm"
                      className="bg-blue text-white hover:bg-blue-600 mr-2"
                      onClick={() => handleCall(test.patientName)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Notify
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "View test details",
                          description: `Viewing details for ${test.patientName}'s ${test.testName}.`,
                        });
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MedicalDashboard;
