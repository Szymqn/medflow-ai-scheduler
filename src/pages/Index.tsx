
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Redirects to login page
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  
  return null;
};

export default Index;
