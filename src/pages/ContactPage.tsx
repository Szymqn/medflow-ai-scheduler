
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageSquare, MapPin, Clock, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/MainLayout';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [messageType, setMessageType] = useState('general');
  const [message, setMessage] = useState('');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully. We'll get back to you soon.",
    });
    
    setMessage('');
  };
  
  return (
    <MainLayout
      hospitalName="Sacred Heart Hospital"
      userName="John Smith"
      userRole="patient"
    >
      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="contact" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
            <TabsTrigger value="message">Send Message</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hospital Contact Information</CardTitle>
                  <CardDescription>Ways to reach Sacred Heart Hospital</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ContactItem 
                    icon={<Phone className="h-5 w-5 text-coral" />} 
                    title="Phone" 
                    details={[
                      "Main Line: +1 (234) 567-8901",
                      "Emergency: +1 (234) 567-9999"
                    ]} 
                  />
                  
                  <ContactItem 
                    icon={<Mail className="h-5 w-5 text-coral" />} 
                    title="Email" 
                    details={[
                      "General Inquiries: info@sacredheart.example",
                      "Appointments: appointments@sacredheart.example"
                    ]} 
                  />
                  
                  <ContactItem 
                    icon={<MapPin className="h-5 w-5 text-coral" />} 
                    title="Address" 
                    details={[
                      "123 Healing Way",
                      "Anytown, CA 12345"
                    ]} 
                  />
                  
                  <ContactItem 
                    icon={<Clock className="h-5 w-5 text-coral" />} 
                    title="Hours" 
                    details={[
                      "Hospital: 24/7",
                      "Visitor Hours: 9:00 AM - 8:00 PM",
                      "Administrative Offices: Monday-Friday, 8:00 AM - 5:00 PM"
                    ]} 
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Care Team</CardTitle>
                  <CardDescription>Direct contacts for your healthcare providers</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ContactItem 
                    icon={<FileText className="h-5 w-5 text-coral" />} 
                    title="Primary Doctor" 
                    details={[
                      "Dr. Mark Twain",
                      "Specialty: Orthopedic Surgery",
                      "Email: m.twain@sacredheart.example",
                      "Office: +1 (234) 567-8910"
                    ]} 
                  />
                  
                  <ContactItem 
                    icon={<FileText className="h-5 w-5 text-coral" />} 
                    title="Nurse Coordinator" 
                    details={[
                      "Sarah Johnson, RN",
                      "Email: s.johnson@sacredheart.example",
                      "Phone: +1 (234) 567-8920"
                    ]} 
                  />
                  
                  <Button className="w-full bg-coral text-white hover:bg-coral-600 mt-4"
                    onClick={() => {
                      toast({
                        title: "Call initiated",
                        description: "Connecting you to your care team...",
                      });
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Care Team
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Hospital Map & Directions</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="aspect-video bg-coral-50 rounded-md flex items-center justify-center">
                    <div className="text-center p-6">
                      <MapPin className="h-8 w-8 text-coral mb-4 mx-auto" />
                      <p className="text-gray-600">Interactive hospital map would be displayed here</p>
                      <Button className="mt-4" variant="outline"
                        onClick={() => {
                          toast({
                            title: "Directions",
                            description: "Opening map directions in a new window.",
                          });
                        }}
                      >
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="message">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Contact your healthcare team or hospital administration
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message Type
                    </label>
                    <select 
                      className="w-full rounded-md border border-gray-300 p-2"
                      value={messageType}
                      onChange={(e) => setMessageType(e.target.value)}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="appointment">Appointment Request</option>
                      <option value="prescription">Prescription Refill</option>
                      <option value="billing">Billing Question</option>
                      <option value="medical">Medical Question</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea 
                      className="w-full rounded-md border border-gray-300 p-2 min-h-[150px]"
                      placeholder="Type your message here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-coral text-white hover:bg-coral-600"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
                
                <div className="mt-6 p-4 bg-coral-50 rounded-md">
                  <h3 className="font-medium mb-2">Response Times</h3>
                  <ul className="text-sm space-y-1">
                    <li>• General inquiries: 1-2 business days</li>
                    <li>• Appointment requests: 1 business day</li>
                    <li>• Medical questions: 24 hours</li>
                    <li>• Urgent matters: Please call the hospital directly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  details: string[];
}

const ContactItem = ({ icon, title, details }: ContactItemProps) => {
  return (
    <div className="flex">
      <div className="mt-1 mr-3">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <div className="text-sm text-gray-600 mt-1">
          {details.map((detail, index) => (
            <div key={index}>{detail}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
