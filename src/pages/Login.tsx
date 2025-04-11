
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [role, setRole] = useState<'patient' | 'medical' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRoleSelect = (selectedRole: 'patient' | 'medical') => {
    setRole(selectedRole);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) {
      toast({
        title: "Please select a role",
        description: "You need to select either Patient or Medical Staff role.",
        variant: "destructive",
      });
      return;
    }
    
    if (!username || !password) {
      toast({
        title: "Missing credentials",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would make an API call to authenticate
    
    // Mock login for demo purposes
    if (username === 'demo' && password === 'password') {
      toast({
        title: "Login successful",
        description: `Welcome back, ${username}!`,
      });
      
      if (role === 'patient') {
        navigate('/patient-dashboard');
      } else {
        navigate('/medical-dashboard');
      }
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-medgray-100">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h2 className="text-xl text-gray-600">Welcome to the Hospital Operation Scheduler</h2>
        </div>
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Login</CardTitle>
            <p className="text-sm text-gray-500">Please select your role to continue</p>
          </CardHeader>
          
          <CardContent>
            <div className="flex justify-center gap-4 mb-6">
              <Button
                type="button"
                className={`rounded-full ${role === 'patient' ? 'bg-coral hover:bg-coral-600' : 'bg-medgray-300 text-gray-700 hover:bg-medgray-400'}`}
                onClick={() => handleRoleSelect('patient')}
              >
                Patient
              </Button>
              <Button
                type="button"
                className={`rounded-full ${role === 'medical' ? 'bg-coral hover:bg-coral-600' : 'bg-medgray-300 text-gray-700 hover:bg-medgray-400'}`}
                onClick={() => handleRoleSelect('medical')}
              >
                Medical
              </Button>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm">Username</label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-coral hover:bg-coral-600"
              >
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
