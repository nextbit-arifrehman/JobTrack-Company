import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
          <p className="mt-2 text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-primary mr-4"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            <i className="fa-solid fa-home mr-2"></i>
            Go Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
