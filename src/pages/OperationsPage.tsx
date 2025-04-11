
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, FileDown } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import StatusBadge from '@/components/StatusBadge';
import { useToast } from '@/hooks/use-toast';

// Mock data for upcoming operations
const operations = [
  {
    id: 1,
    name: "Knee Replacement",
    date: "2024-04-15",
    time: "10:00 AM",
    doctor: "Dr. Mark Twain",
    location: "OR 3, West Wing",
    preOpInstructions: "No food or drink after midnight. Stop blood thinners 5 days prior.",
    status: "tbd" as const,
  },
  {
    id: 2,
    name: "Appendectomy",
    date: "2024-02-20",
    time: "1:00 PM",
    doctor: "Dr. John Smith",
    location: "OR 1, East Wing",
    preOpInstructions: "No food or drink after midnight.",
    status: "ok" as const,
  },
];

// Mock data for past operations
const pastOperations = [
  {
    id: 3,
    name: "Tonsillectomy",
    date: "2023-11-10",
    doctor: "Dr. Emily Carter",
    notes: "Successful procedure with no complications."
  },
  {
    id: 4,
    name: "Gallbladder Removal",
    date: "2023-06-05",
    doctor: "Dr. Sarah Thompson",
    notes: "Patient recovered well. Follow-up in 2 weeks."
  },
];

const OperationsPage = () => {
  const { toast } = useToast();
  
  const handleDownloadDetails = (operationId: number) => {
    toast({
      title: "Download started",
      description: "Your operation details PDF is being downloaded.",
    });
  };

  return (
    <MainLayout
      hospitalName="Sacred Heart Hospital"
      userName="John Smith"
      userRole="patient"
    >
      <div className="space-y-6 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Operations</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              {operations.map((operation) => (
                <Card key={operation.id} className="border border-coral-100">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-medium">{operation.name}</h3>
                          <div className="px-3 py-1 rounded-full bg-medgray-100 text-sm">
                            {operation.status === 'ok' ? 'Patient Ready' : 'Tests TBD'}
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>Date: {new Date(operation.date).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Time: {operation.time}</span>
                          </div>
                          
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Doctor:</span> {operation.doctor}
                          </div>
                          
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Location:</span> {operation.location}
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">Pre-Operation Instructions:</h4>
                          <p className="text-sm text-gray-600 bg-coral-50 p-3 rounded-md">
                            {operation.preOpInstructions}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 min-w-[140px]">
                        <Button 
                          onClick={() => handleDownloadDetails(operation.id)}
                          className="bg-coral text-white hover:bg-coral-600 w-full"
                        >
                          <FileDown className="h-4 w-4 mr-2" />
                          Download Info
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            toast({
                              title: "Tests status",
                              description: "Navigating to test requirements for this operation.",
                            });
                          }}
                        >
                          View Required Tests
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Past Operations</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {pastOperations.map((operation) => (
                <div 
                  key={operation.id}
                  className="p-4 border border-gray-100 rounded-md bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{operation.name}</h3>
                      <div className="mt-1 text-sm text-gray-500">
                        <div>{new Date(operation.date).toLocaleDateString()}</div>
                        <div>{operation.doctor}</div>
                      </div>
                      <p className="mt-2 text-sm">{operation.notes}</p>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadDetails(operation.id)}
                    >
                      <FileDown className="h-4 w-4 mr-2" />
                      Medical Report
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

export default OperationsPage;
