import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Register from '../components/Auth/Register';
import { authService } from '../services/auth.service';
import type { RegisterFormData } from '../types/auth.types';

const RegisterPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async (formData: RegisterFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.register(formData);
      
      if (response.message === 'User registered successfully') {
        // Navigate to login page on successful registration
        navigate('/login');
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err: unknown) {
      if (err instanceof Error && 'response' in err) {
        const axiosError = err as Error & { response?: { data?: { message?: string } } };
        setError(axiosError.response?.data?.message || 'An error occurred during registration');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during registration');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-blue-500 rounded-lg"></div>
            <span className="text-2xl font-bold text-gray-800">Todo App</span>
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Register 
          onSubmit={handleRegister} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </div>
  );
};

export default RegisterPage;