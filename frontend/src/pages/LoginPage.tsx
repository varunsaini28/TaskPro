import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Login from '../components/Auth/Login';
import { authService } from '../services/auth.service';
import type { LoginFormData } from '../types/auth.types';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (formData: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(formData);
      
      if (response.message === 'Login succesfully') {
        // Navigate to home page on successful login
        navigate('/');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
      const apiError = err as { response?: { data?: { message?: string } } };
      setError(apiError?.response?.data?.message || errorMessage);
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Login 
          onSubmit={handleLogin} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </div>
  );
};

export default LoginPage;