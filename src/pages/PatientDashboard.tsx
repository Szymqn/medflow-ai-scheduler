
import React from 'react';
import { Calendar, ArrowLeft, ArrowRight, FileDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import StatusBadge from '@/components/StatusBadge';
import { useToast } from '@/hooks/use-toast';

// Mock data for patient dashboard
const patientData = {
  name: "Johnathan Doe",
  age: 45,
  bloodType: "O+",
  contact: "+12345678",
  photo: "public/lovable-uploads/patient.jpg",
};

const upcomingOperations = [
  {
    id: 1,
    name: "Knee Replacement",
    date: "2024-04-15",
    time: "10:00 AM",
    status: "tbd" as const,
  },
  {
    id: 2,
    name: "Appendectomy",
    date: "2024-02-20",
    time: "1:00 PM",
    status: "ok" as const,
  },
];

const testResults = [
  {
    id: 1,
    name: "Blood Test",
    date: "2024-01-10",
    status: "ok" as const,
  },
  {
    id: 2,
    name: "MRI Scan",
    date: "2024-02-05",
    status: "pending" as const,
  },
];

// Calendar mock data (for simplicity)
const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
const currentMonth = "May";

const PatientDashboard = () => {
  const { toast } = useToast();
  
  const handleDownloadPDF = (testId: number) => {
    toast({
      title: "Download started",
      description: "Your test results PDF is being downloaded.",
    });
  };

  return (
    <MainLayout
      hospitalName="Sacred Heart Hospital"
      userName="John Smith"
      userRole="patient"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src={patientData.photo}
                  alt={patientData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h2 className="text-xl font-medium">{patientData.name}</h2>
              
              <div className="mt-4 space-y-2 w-full">
                <div className="flex justify-between">
                  <span className="text-gray-500">Age:</span>
                  <span>{patientData.age}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Blood Type:</span>
                  <span>{patientData.bloodType}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Contact:</span>
                  <span>{patientData.contact}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Operations</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {upcomingOperations.map((operation) => (
                <div
                  key={operation.id}
                  className="p-4 rounded-md bg-coral-50"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{operation.name}</h3>
                    <div className="px-3 py-1 rounded-full bg-medgray-100 text-sm">
                      {operation.status === 'ok' ? 'Patient Ready' : 'Tests TBD'}
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-500">
                    <div>Date: {operation.date}</div>
                    <div>Time: {operation.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{currentMonth}</span>
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                <div key={day} className="text-center font-medium text-sm">
                  {day}
                </div>
              ))}
              
              {calendarDays.map((day) => (
                <div
                  key={day}
                  className={`text-center p-2 rounded-md ${
                    day === 10 || day === 25
                      ? 'bg-coral-100 text-coral-700'
                      : 'bg-coral-50'
                  }`}
                >
                  {day}
                  {day === 10 && <div className="text-xs mt-1">🩸</div>}
                  {day === 25 && <div className="text-xs mt-1">🏥</div>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-full">
          <CardHeader>
            <CardTitle>My Tests</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {testResults.map((test) => (
                <div
                  key={test.id}
                  className="p-4 rounded-md bg-coral-50 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{test.name}</h3>
                    <div className="mt-1 text-sm text-gray-500">
                      <div>Date: {test.date}</div>
                      <div>
                        Status: <StatusBadge status={test.status} />
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleDownloadPDF(test.id)}
                    variant="outline"
                    className={`${
                      test.status === 'ok'
                        ? 'bg-coral text-white hover:bg-coral-600'
                        : 'bg-medgray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={test.status !== 'ok'}
                  >
                    <FileDown className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PatientDashboard;
