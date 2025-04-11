
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import StatusBadge from './StatusBadge';
import { Button } from './ui/button';

export type TestStatus = 'ok' | 'pending' | 'tbd' | 'consult';

interface TestCardProps {
  testName: string;
  status: TestStatus;
  date?: string;
  location?: string;
  doctor?: string;
  isChecked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  showScheduleButton?: boolean;
  onSchedule?: () => void;
}

const TestCard = ({
  testName,
  status,
  date,
  location,
  doctor,
  isChecked = false,
  onCheckChange,
  showScheduleButton = false,
  onSchedule,
}: TestCardProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4 flex items-start">
        <div className="mr-3 mt-1">
          <Checkbox
            checked={isChecked}
            onCheckedChange={onCheckChange}
            id={`test-${testName.toLowerCase().replace(/\s+/g, '-')}`}
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <h3 className="font-medium">{testName}</h3>
              <StatusBadge status={status} />
            </div>
            
            {doctor && (
              <div className="text-sm text-gray-600">
                {doctor}
              </div>
            )}
          </div>
          
          {date && (
            <div className="text-sm text-gray-500 mt-1">
              Date: {date || 'Pending'}
            </div>
          )}
          
          {location && (
            <div className="text-sm text-gray-500">
              Location: {location}
            </div>
          )}
        </div>
        
        {showScheduleButton && status === 'consult' && (
          <Button 
            className="bg-blue text-white hover:bg-blue-600 ml-4"
            onClick={onSchedule}
          >
            Schedule Consultation
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default TestCard;
