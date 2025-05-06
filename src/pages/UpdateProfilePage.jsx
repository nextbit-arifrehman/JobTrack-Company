import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

const UpdateProfilePage = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { replace: true });
      return;
    }

    setFormData({
      name: currentUser.displayName || "",
      photoURL: currentUser.photoURL || "",
    });
  }, [currentUser, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateUserProfile({
        displayName: formData.name,
        photoURL: formData.photoURL
      });
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Layout title="Update Profile - JobTrack">
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Update Profile</h2>
            <p className="mt-2 text-gray-600">
              Update your profile information
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
                  Photo URL
                </label>
                <div className="relative mt-1">
                  <input
                    id="photoURL"
                    name="photoURL"
                    type="url"
                    value={formData.photoURL}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Enter a URL for your profile picture
                </p>
              </div>

              {formData.photoURL && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={formData.photoURL}
                    alt="Profile preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                      e.target.src = "https://randomuser.me/api/portraits/lego/1.jpg";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary flex-1"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Updating...
                  </span>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProfilePage;