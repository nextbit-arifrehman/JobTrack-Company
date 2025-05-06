import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';
import Layout from '../components/Layout';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const defaultProfileImage = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!currentUser) {
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/login', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [currentUser, navigate]);

  // Show loading state
  if (isLoading) {
    return (
      <Layout title="Loading - JobTrack">
        <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </Layout>
    );
  }

  // If not logged in, show nothing (will redirect)
  if (!currentUser) {
    return null;
  }

  try {
    // Get sign-in method safely
    const signInMethod = currentUser.providerData && currentUser.providerData.length > 0
      ? currentUser.providerData[0].providerId === 'google.com'
        ? 'Google'
        : 'Email & Password'
      : 'Email & Password';

    return (
      <Layout title="My Profile - JobTrack">
        <div className="min-h-[calc(100vh-16rem)] py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Profile Header */}
              <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600">
                <div className="absolute -bottom-16 left-8">
                  <div className="relative">
                    <img
                      src={currentUser.photoURL || defaultProfileImage}
                      alt={currentUser.displayName || 'User'}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                      onError={(e) => {
                        e.target.src = defaultProfileImage;
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="pt-20 pb-8 px-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {currentUser.displayName || 'User'}
                    </h1>
                    <p className="text-gray-600">
                      {currentUser.email}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/profile/update')}
                    className="btn btn-primary"
                  >
                    <i className="fa-solid fa-pen-to-square mr-2"></i>
                    Update Profile
                  </button>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Account Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{currentUser.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Account Created</p>
                        <p className="font-medium">
                          {currentUser.metadata?.creationTime
                            ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                            : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Sign In</p>
                        <p className="font-medium">
                          {currentUser.metadata?.lastSignInTime
                            ? new Date(currentUser.metadata.lastSignInTime).toLocaleDateString()
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Account Security
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Email Verification</p>
                        <p className="font-medium">
                          {currentUser.emailVerified ? (
                            <span className="text-green-600">
                              <i className="fa-solid fa-check-circle mr-1"></i>
                              Verified
                            </span>
                          ) : (
                            <span className="text-yellow-600">
                              <i className="fa-solid fa-exclamation-circle mr-1"></i>
                              Not Verified
                            </span>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Sign-in Method</p>
                        <p className="font-medium">{signInMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } catch (error) {
    console.error('Profile page error:', error);
    return (
      <Layout title="Error - JobTrack">
        <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-gray-600">Please try refreshing the page</p>
          </div>
        </div>
      </Layout>
    );
  }
};

export default ProfilePage;
