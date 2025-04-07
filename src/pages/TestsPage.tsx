
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Calendar, Phone } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import StatusBadge from '@/components/StatusBadge';
import { useToast } from '@/hooks/use-toast';

// Mock data for tests
const testData = [
  {
    id: 1,
    name: "Blood Test",
    date: "2024-01-10",
    doctor: "Dr. Emily Carter",
    location: "City Hospital Lab",
    notes: "Fasting required for 12 hours before test.",
    status: "ok" as const,
    result: "All values within normal range."
  },
  {
    id: 2,
    name: "X-Ray",
    date: "2024-02-15",
    doctor: "Dr. James Lee",
    location: "Radiology Dept.",
    notes: "Chest X-ray for pre-op assessment.",
    status: "consult" as const,
    result: null
  },
  {
    id: 3,
    name: "MRI Scan",
    date: "2024-02-05",
    doctor: "Dr. Sarah Thompson",
    location: "MRI Center",
    notes: "Right knee MRI for surgical planning.",
    status: "pending" as const,
    result: null
  },
  {
    id: 4,
    name: "ECG",
    date: "2024-02-20",
    doctor: "Dr. Michael Brown",
    location: "Cardiology Dept.",
    notes: "Standard 12-lead ECG for pre-op assessment.",
    status: "consult" as const,
    result: null
  },
  {
    id: 5,
    name: "Urine Test",
    date: "2024-01-12",
    doctor: "Dr. Anna White",
    location: "City Hospital Lab",
    notes: "Standard urinalysis.",
    status: "ok" as const,
    result: "All values within normal range."
  }
];

// Tests needed for upcoming operations
const upcomingOperations = [
  {
    id: 1,
    name: "Knee Replacement",
    date: "2024-04-15",
    requiredTests: [
      { id: 1, name: "Blood Test", status: "ok" as const },
      { id: 2, name: "X-Ray", status: "consult" as const },
      { id: 3, name: "MRI Scan", status: "pending" as const }
    ]
  }
];

const TestsPage = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  
  const filteredTests = testData.filter(test => {
    if (filter === 'all') return true;
    if (filter === 'completed') return test.status === 'ok';
    if (filter === 'pending') return test.status === 'pending' || test.status === 'consult';
    return true;
  });
  
  const handleDownloadPDF = (testId: number) => {
    toast({
      title: "Download started",
      description: "Your test results PDF is being downloaded.",
    });
  };
  
  const handleScheduleConsultation = (testId: number) => {
    toast({
      title: "Consultation request",
      description: "Your consultation request has been sent to the doctor.",
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Tests</CardTitle>
            
            <div className="flex space-x-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'bg-blue-400 text-white hover:bg-blue-600' : ''}
              >
                All
              </Button>
              <Button 
                variant={filter === 'completed' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('completed')}
                className={filter === 'completed' ? 'bg-blue-400 text-white hover:bg-blue-600' : ''}
              >
                Completed
              </Button>
              <Button 
                variant={filter === 'pending' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setFilter('pending')}
                className={filter === 'pending' ? 'bg-blue-400 text-white hover:bg-blue-600' : ''}
              >
                Pending
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {filteredTests.map((test) => (
                <Card key={test.id} className="border border-coral-100">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-lg">{test.name}</h3>
                          <StatusBadge status={test.status} />
                        </div>
                        
                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{new Date(test.date).toLocaleDateString()}</span>
                          </div>
                          <div>Doctor: {test.doctor}</div>
                          <div>Location: {test.location}</div>
                          {test.notes && <div className="mt-2 bg-cyan-200 p-2 rounded-md">{test.notes}</div>}
                          {test.result && (
                            <div className="mt-2 bg-cyan-100 p-2 rounded-md text-green-800">
                              <strong>Result:</strong> {test.result}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 md:min-w-[150px] justify-center">
                        {test.status === 'ok' && (
                          <Button
                            onClick={() => handleDownloadPDF(test.id)}
                            className="bg-blue-400 text-white hover:bg-blue-600"
                          >
                            <FileDown className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                        )}
                        
                        {test.status === 'consult' && (
                          <Button className='bg-blue-400 text-white hover:bg-blue-600'
                            onClick={() => handleScheduleConsultation(test.id)}
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Schedule Consultation
                          </Button>
                        )}
                        
                        {test.status === 'pending' && (
                          <div className="text-sm text-center text-gray-500 p-2 bg-gray-50 rounded-md">
                            Pending completion
                          </div>
                        )}
                        
                        {test.status !== 'pending' && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: "Test details",
                                description: "Viewing details for your test.",
                              });
                            }}
                          >
                            View Details
                          </Button>
                        )}
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
            <CardTitle>Required Tests for Upcoming Operations</CardTitle>
          </CardHeader>
          
          <CardContent>
            {upcomingOperations.map((operation) => (
              <div key={operation.id} className="mb-6">
                <h3 className="text-lg font-medium mb-3">
                  {operation.name} - {new Date(operation.date).toLocaleDateString()}
                </h3>
                
                <div className="space-y-2">
                  {operation.requiredTests.map((test) => (
                    <div 
                      key={test.id} 
                      className="p-3 rounded-md bg-cyan-200 flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          test.status === 'ok' ? 'bg-green-500' : 
                          test.status === 'pending' ? 'bg-amber-500' : 
                          'bg-red-500'
                        }`} />
                        <span>{test.name}</span>
                      </div>
                      <StatusBadge status={test.status} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TestsPage;
