import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";

const CompanyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        const found = data.companies.find(c => c.id === id);
        if (!found) throw new Error('Company not found');
        setCompany(found);
        document.title = `${found.name} - JobTrack`;
      })
      .catch(error => {
        console.error("Error loading company details:", error);
        navigate("/not-found");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  const openJobModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading company details...</p>
        </div>
      </Layout>
    );
  }

  if (!company) {
    return (
      <Layout>
        <div className="container mx-auto py-20 px-4 text-center">
          <p>Company not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${company.name} - JobTrack`}>
      {/* Company Header */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div
              className="w-24 h-24 md:w-32 md:h-32 rounded-xl shadow-lg flex items-center justify-center p-2 bg-white relative overflow-hidden"
            >
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-w-full max-h-full object-contain absolute inset-0 m-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span class='text-white font-bold text-3xl'>${company.name.charAt(0)}</span>`;
                  }}
                />
              ) : (
                <span className="text-white font-bold text-3xl">
                  {company.name.charAt(0)}
                </span>
              )}
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {company.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                  {company.industry}
                </span>
                <div className="flex items-center text-white/80">
                  <i className="fa-solid fa-location-dot mr-2"></i>
                  <span>{company.location}</span>
                </div>
              </div>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-transparent border border-white/30 text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
              >
                Visit Website
                <i className="fa-solid fa-external-link ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Company Details */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div>
            <h2 className="text-2xl font-bold mb-6">About {company.name}</h2>
            <p className="text-gray-700 mb-8">{company.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Founded</h3>
                <p className="text-gray-700">{company.founded}</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Company Size</h3>
                <p className="text-gray-700">{company.employees}</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-700">{company.location}</p>
              </div>
            </div>

            {/* Benefits Section - if you have a benefits field in data.json, show it here */}
            {company.benefits && (
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-4">Benefits & Perks</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {company.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <i className="fa-solid fa-check text-green-500"></i>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Culture Section - if you have a culture field in data.json, show it here */}
            {company.culture && (
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-4">Company Culture</h3>
                <p className="text-gray-700">{company.culture}</p>
              </div>
            )}

            {/* Social Media Section - if you have a socialMedia field in data.json, show it here */}
            {company.socialMedia && (
              <div>
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <div className="flex gap-4">
                  {Object.entries(company.socialMedia).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <i className={`fa-brands fa-${platform} text-2xl`}></i>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Company Jobs */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Open Positions at {company.name}
            </h2>
            <p className="text-gray-600 mb-8">
              Browse through current job opportunities and find a role that
              matches your skills and career goals.
            </p>
          </div>

          <div className="space-y-6">
            {company.jobs && company.jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <i className="fa-solid fa-location-dot mr-1"></i>
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fa-solid fa-briefcase mr-1"></i>
                        <span>{job.jobType}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fa-solid fa-dollar-sign mr-1"></i>
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => openJobModal(job)}
                    className="btn btn-primary"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Modal */}
      <AnimatePresence>
        {isModalOpen && selectedJob && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          >
            <div
              className="bg-white rounded-xl overflow-hidden shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
            >
              <div className="p-6 flex justify-between items-start border-b">
                <div>
                  <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span className="font-medium text-gray-700">
                      {company.name}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{selectedJob.location}</span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>

              <div className="overflow-y-auto p-6 flex-grow">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">
                      Job Type & Compensation
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center text-sm bg-gray-100 py-1 px-3 rounded-full">
                        <i className="fa-solid fa-briefcase mr-2 text-gray-600"></i>
                        <span>{selectedJob.jobType}</span>
                      </div>
                      <div className="flex items-center text-sm bg-gray-100 py-1 px-3 rounded-full">
                        <i className="fa-solid fa-dollar-sign mr-2 text-gray-600"></i>
                        <span>{selectedJob.salary}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-gray-700">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Requirements</h4>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-2 mt-0.5">
                            <i className="fa-solid fa-check text-xs"></i>
                          </span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t p-6 flex flex-wrap justify-between gap-4">
                <button 
                  onClick={closeModal}
                  className="btn btn-outline"
                >
                  <i className="fa-solid fa-xmark mr-2"></i>
                  Close
                </button>
                <a 
                  href={selectedJob.applicationUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Apply Now
                  <i className="fa-solid fa-external-link ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default CompanyDetailsPage;
