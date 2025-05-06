import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  // Set language to browser preference
  useEffect(() => {
    auth.useDeviceLanguage();
  }, []);

  useEffect(() => {
    // Get email from location state if coming from login page
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value.trim();
    setEmail(newEmail);
    setError('');
    setSuccess('');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Send password reset email with continue URL
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/login`, // Redirect back to login after reset
        handleCodeInApp: true
      });

      setSuccess('Password reset email sent! Please check your inbox.');
      
      // Redirect to Gmail after 2 seconds
      setTimeout(() => {
        window.open('https://mail.google.com', '_blank');
      }, 2000);
    } catch (error) {
      console.error('Reset password error:', error);
      
      // Handle specific error cases
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email address');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later');
          break;
        case 'auth/missing-android-pkg-name':
        case 'auth/missing-ios-bundle-id':
          setError('Please try again from a web browser');
          break;
        default:
          setError('Failed to send reset email. Please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Forgot Password - JobTrack">
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold">Reset your password</h2>
            <p className="mt-2 text-gray-600">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fa-regular fa-envelope text-gray-400"></i>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="input input-bordered w-full pl-10"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            {success && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="text-sm text-green-700">{success}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <i className="fa-solid fa-paper-plane mr-2"></i>
                    Reset Password
                  </span>
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                <i className="fa-solid fa-arrow-left mr-2"></i>
                Back to Login
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;