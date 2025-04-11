
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Save } from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import { useToast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = React.useState(false);
  
  // Mock user data - in a real app, this would come from an API or state
  const userData = {
    name: "Johnathan Doe",
    email: "john.doe@example.com",
    dateOfBirth: "1978-05-15",
    bloodType: "O+",
    address: "123 Main Street, Anytown, AN 12345",
    phone: "+12345678",
    emergencyContact: "Jane Doe (+12345678901)",
    allergies: "Penicillin",
    medications: "Lisinopril, Metformin",
    photo: "/lovable-uploads/3fa00ed7-6ad0-4cf2-92aa-61185518350c.png"
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <MainLayout
      hospitalName="MedFlow"
      userName="John Smith"
      userRole="patient"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Profile</CardTitle>
            <Button 
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              className="bg-blue text-white hover:bg-blue-600"
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center justify-start">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                  <img
                    src={userData.photo}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                )}
              </div>
              
              {/* Profile Information */}
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ProfileField 
                    label="Full Name" 
                    value={userData.name} 
                    isEditing={isEditing} 
                  />
                  
                  <ProfileField 
                    label="Email" 
                    value={userData.email} 
                    isEditing={isEditing} 
                  />
                  
                  <ProfileField 
                    label="Date of Birth" 
                    value={userData.dateOfBirth} 
                    isEditing={isEditing} 
                  />
                  
                  <ProfileField 
                    label="Blood Type" 
                    value={userData.bloodType} 
                    isEditing={isEditing} 
                  />
                  
                  <ProfileField 
                    label="Phone" 
                    value={userData.phone} 
                    isEditing={isEditing} 
                  />
                  
                  <ProfileField 
                    label="Emergency Contact" 
                    value={userData.emergencyContact} 
                    isEditing={isEditing} 
                  />
                </div>
                
                <ProfileField 
                  label="Address" 
                  value={userData.address} 
                  isEditing={isEditing} 
                  fullWidth 
                />
                
                <ProfileField 
                  label="Allergies" 
                  value={userData.allergies} 
                  isEditing={isEditing} 
                  fullWidth 
                />
                
                <ProfileField 
                  label="Current Medications" 
                  value={userData.medications} 
                  isEditing={isEditing} 
                  fullWidth 
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <MedicalHistoryItem 
                date="2024-01-15" 
                description="Knee examination" 
                doctor="Dr. Mark Twain" 
              />
              <MedicalHistoryItem 
                date="2023-11-03" 
                description="Annual check-up" 
                doctor="Dr. Sarah Thompson" 
              />
              <MedicalHistoryItem 
                date="2023-08-22" 
                description="Sprained ankle treatment" 
                doctor="Dr. John Smith" 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

interface ProfileFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  fullWidth?: boolean;
}

const ProfileField = ({ label, value, isEditing, fullWidth }: ProfileFieldProps) => {
  return (
    <div className={`${fullWidth ? 'col-span-full' : ''}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {isEditing ? (
        <input
          type="text"
          defaultValue={value}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
      ) : (
        <div className="text-sm border border-gray-200 rounded-md px-3 py-2 bg-gray-50">
          {value}
        </div>
      )}
    </div>
  );
};

interface MedicalHistoryItemProps {
  date: string;
  description: string;
  doctor: string;
}

const MedicalHistoryItem = ({ date, description, doctor }: MedicalHistoryItemProps) => {
  return (
    <div className="flex items-center p-3 rounded-md bg-blue-50">
      <div className="flex-1">
        <p className="font-medium">{description}</p>
        <div className="text-sm text-gray-500 mt-1">
          <span>{new Date(date).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{doctor}</span>
        </div>
      </div>
      <Button variant="outline" size="sm">
        View Details
      </Button>
    </div>
  );
};

export default ProfilePage;
