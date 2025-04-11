
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MainLayout from '@/layouts/MainLayout';
import TestCard, { TestStatus } from '@/components/TestCard';
import { useToast } from '@/hooks/use-toast';

interface Test {
  id: number;
  name: string;
  status: TestStatus;
  date?: string;
  location?: string;
  doctor?: string;
  isCompleted: boolean;
}

// Mock data for an operation's required tests
const initialTests: Test[] = [
  {
    id: 1,
    name: "Blood Test",
    status: "ok",
    date: "2024-02-01",
    location: "City Hospital Lab",
    doctor: "Dr. Emily Carter",
    isCompleted: true,
  },
  {
    id: 2,
    name: "X-Ray",
    status: "consult",
    date: "Pending",
    location: "Radiology Dept.",
    doctor: "Dr. James Lee",
    isCompleted: false,
  },
  {
    id: 3,
    name: "MRI Scan",
    status: "tbd",
    date: "2024-12-14",
    location: "MRI Center",
    doctor: "Dr. Sarah Thompson",
    isCompleted: false,
  },
  {
    id: 4,
    name: "ECG",
    status: "consult",
    date: "Pending",
    location: "Cardiology Dept.",
    doctor: "Dr. Michael Brown",
    isCompleted: false,
  },
  {
    id: 5,
    name: "Urine Test",
    status: "ok",
    date: "2024-11-02",
    location: "City Hospital Lab",
    doctor: "Dr. Anna White",
    isCompleted: true,
  },
];

const OperationTests = () => {
  const [tests, setTests] = useState<Test[]>(initialTests);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleCheckChange = (id: number, checked: boolean) => {
    setTests(tests.map(test => 
      test.id === id ? { ...test, isCompleted: checked } : test
    ));
    
    toast({
      title: checked ? "Test marked as completed" : "Test marked as incomplete",
      description: `Test status has been updated.`,
    });
  };
  
  const handleScheduleConsultation = (id: number) => {
    toast({
      title: "Consultation scheduled",
      description: "A consultation request has been sent.",
    });
  };

  return (
    <MainLayout
      hospitalName="MedFlow"
      userName="John Smith"
      userRole="medical"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Knee Replacement Pre-Op Tests</h1>
        <p className="text-gray-600">Patient: John Smith</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((test) => (
          <TestCard
            key={test.id}
            testName={test.name}
            status={test.status}
            date={test.date}
            location={test.location}
            doctor={test.doctor}
            isChecked={test.isCompleted}
            onCheckChange={(checked) => handleCheckChange(test.id, checked)}
            showScheduleButton={test.status === 'consult'}
            onSchedule={() => handleScheduleConsultation(test.id)}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default OperationTests;
