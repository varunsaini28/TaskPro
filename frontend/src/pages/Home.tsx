import React from 'react';
import { Link } from 'react-router-dom';
import type {User} from '../types/auth.types';

interface HomeProps {
  user: User | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to Todo App
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            A simple and efficient way to manage your tasks. Stay organized and boost your productivity.
          </p>
          
          {user ? (
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Welcome back, {user.name}!
              </h2>
              <p className="text-gray-600 mb-6">
                You're now logged in and ready to manage your todos.
              </p>
              <Link
                to="/profile"
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 font-medium"
              >
                Go to Profile
              </Link>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Get Started</h3>
                <p className="text-gray-600 mb-6">
                  Create an account to start managing your todos.
                </p>
                <Link
                  to="/register"
                  className="inline-block w-full text-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 font-medium"
                >
                  Sign Up Free
                </Link>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Already have an account?</h3>
                <p className="text-gray-600 mb-6">
                  Login to access your todos.
                </p>
                <Link
                  to="/login"
                  className="inline-block w-full text-center bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 font-medium"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-500 mb-4">
                <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Organize Tasks</h3>
              <p className="text-gray-600">
                Create, edit, and organize your todos in one place.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-500 mb-4">
                <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Stay Productive</h3>
              <p className="text-gray-600">
                Set deadlines and prioritize tasks to boost productivity.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-purple-500 mb-4">
                <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is securely stored and always private.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;