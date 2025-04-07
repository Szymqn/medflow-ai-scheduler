
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useToast } from '@/hooks/use-toast';

// Mock appointments for specific days
const appointments = {
  '2024-05-10': [
    { id: 1, type: 'Blood Test', time: '10:00 AM', doctor: 'Dr. Emily Carter', location: 'Lab 2, East Wing' },
  ],
  '2024-05-25': [
    { id: 2, type: 'Pre-Op Consultation', time: '2:30 PM', doctor: 'Dr. Mark Twain', location: 'Clinic Room 305' },
  ]
};

// These are just placeholders for appointment types and their icons
const appointmentIcons = {
  'Blood Test': '🩸',
  'Pre-Op Consultation': '🏥',
  'Operation': '⚕️',
  'Follow-up': '📋',
  'Physical Therapy': '🦿',
};

const CalendarPage = () => {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  // Get all days in the current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Convert Sunday (0) to be the last day of the week (6) for our Monday-first calendar
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const days = [];
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push({ day: null, date: null });
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateStr = date.toISOString().split('T')[0];
      days.push({ 
        day: i, 
        date: dateStr,
        hasAppointment: !!appointments[dateStr]
      });
    }
    
    return days;
  };
  
  const days = getDaysInMonth(currentMonth);
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null);
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
  };
  
  const handleDateClick = (date: string | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  
  const selectedDateAppointments = selectedDate ? appointments[selectedDate] || [] : [];

  return (
    <MainLayout
      hospitalName="Sacred Heart Hospital"
      userName="John Smith"
      userRole="patient"
    >
      <div className="max-w-5xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendar
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevMonth} className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="text-lg font-medium">
                {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
              </div>
              
              <Button variant="outline" size="sm" onClick={handleNextMonth} className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                <div key={day} className="text-center font-medium text-sm py-2">
                  {day}
                </div>
              ))}
              
              {days.map((day, i) => (
                <div
                  key={i}
                  className={`
                    text-center p-2 rounded-md min-h-14 cursor-pointer
                    ${day.date ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-50'}
                    ${day.date === selectedDate ? 'ring-2 ring-coral' : ''}
                  `}
                  onClick={() => handleDateClick(day.date)}
                >
                  {day.day && (
                    <>
                      <div className="font-medium">{day.day}</div>
                      {day.hasAppointment && (
                        <div className="mt-1 text-sm text-coral-900">
                          {appointments[day.date].map((apt) => (
                            <div key={apt.id} className="text-xs">
                              {appointmentIcons[apt.type as keyof typeof appointmentIcons] || '📅'}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
            
            {selectedDate && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">
                  Appointments for {new Date(selectedDate).toLocaleDateString()}
                </h3>
                
                {selectedDateAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 bg-coral-50 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{appointment.type}</h4>
                            <div className="mt-1 space-y-1 text-sm text-gray-600">
                              <div>Time: {appointment.time}</div>
                              <div>Doctor: {appointment.doctor}</div>
                              <div>Location: {appointment.location}</div>
                            </div>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Appointment details",
                                description: "Viewing details for your appointment.",
                              });
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 bg-gray-50 rounded-md">
                    <p className="text-gray-500">No appointments scheduled for this day.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        toast({
                          title: "Request appointment",
                          description: "Appointment request feature is not implemented yet.",
                        });
                      }}
                    >
                      Request an Appointment
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CalendarPage;
