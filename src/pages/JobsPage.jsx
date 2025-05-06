import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";

const JobsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jobTypes, setJobTypes] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Set document title
    document.title = "JobTrack - Browse Jobs";

    // Fetch jobs data from our JSON file
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        // Extract all jobs and their company info
        const jobs = data.companies.flatMap(company =>
          company.jobs.map(job => ({
            job,
            companyId: company.id,
            companyName: company.name,
            companyLogo: company.logo,
            companyWebsite: company.website,
          }))
        );
        
        setAllJobs(jobs);
        setFilteredJobs(jobs);
        
        // Get unique job types and locations for filters
        const types = [...new Set(jobs.map(item => item.job.jobType))];
        const locations = [...new Set(jobs.map(item => item.job.location))];
        
        setJobTypes(types);
        setLocations(locations);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    // Filter jobs based on search term and filters
    let filtered = [...allJobs];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.job.title.toLowerCase().includes(lowerSearch) ||
          item.companyName.toLowerCase().includes(lowerSearch) ||
          item.job.description.toLowerCase().includes(lowerSearch)
      );
    }

    if (jobTypeFilter && jobTypeFilter !== "all") {
      filtered = filtered.filter((item) => item.job.jobType === jobTypeFilter);
    }

    if (locationFilter && locationFilter !== "all") {
      filtered = filtered.filter((item) => item.job.location === locationFilter);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, jobTypeFilter, locationFilter, allJobs]);

  const openJobModal = (jobItem) => {
    setSelectedJob(jobItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setJobTypeFilter("");
    setLocationFilter("");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <Layout title="JobTrack - Browse Jobs">
      {/* Search and Filter Section */}
      <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 py-16 px-4">
        <div className="container mx-auto">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Find Your Dream Job
          </motion.h1>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search job title or company..."
                  className="pl-10 py-3 w-full rounded-lg bg-white/80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="py-3 px-4 rounded-lg bg-white/80"
              >
                <option value="">All Job Types</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="py-3 px-4 rounded-lg bg-white/80"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {(searchTerm || jobTypeFilter || locationFilter) && (
              <div className="flex justify-end mt-4">
                <button 
                  onClick={resetFilters} 
                  className="bg-white/80 text-gray-700 px-4 py-2 rounded-lg hover:bg-white/90 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Jobs List Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No jobs found matching your criteria</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
              <button 
                onClick={resetFilters}
                className="btn btn-primary"
              >
                View All Jobs
              </button>
            </div>
          ) : (
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredJobs.map((jobItem, index) => (
                <motion.div
                  key={jobItem.job.id}
                  variants={fadeInUp}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={jobItem.companyLogo}
                          alt={jobItem.companyName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-1">{jobItem.job.title}</h3>
                      <p className="text-gray-600 mb-2">{jobItem.companyName}</p>

                      <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <i className="fa-solid fa-location-dot mr-1"></i>
                          <span>{jobItem.job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fa-solid fa-briefcase mr-1"></i>
                          <span>{jobItem.job.jobType}</span>
                        </div>
                        <div className="flex items-center">
                          <i className="fa-solid fa-dollar-sign mr-1"></i>
                          <span>{jobItem.job.salary}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 line-clamp-2 mb-4">
                        {jobItem.job.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {jobItem.job.requirements.slice(0, 3).map((req, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
                          >
                            {req.split(" ").slice(0, 3).join(" ")}...
                          </span>
                        ))}
                        {jobItem.job.requirements.length > 3 && (
                          <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
                            +{jobItem.job.requirements.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-3">
                      <button
                        onClick={() => openJobModal(jobItem)}
                        className="btn btn-primary"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => navigate(`/companies/${jobItem.companyId}`)}
                        className="btn btn-outline"
                      >
                        Company Profile
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Job Details Modal */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl overflow-hidden shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
          >
            <div className="p-6 flex justify-between items-start border-b">
              <div>
                <h2 className="text-2xl font-bold">{selectedJob.job.title}</h2>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span className="font-medium text-gray-700">{selectedJob.companyName}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedJob.job.location}</span>
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
                  <h4 className="font-semibold mb-2">Job Type & Compensation</h4>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-sm bg-gray-100 py-1 px-3 rounded-full">
                      <i className="fa-solid fa-briefcase mr-2 text-gray-600"></i>
                      <span>{selectedJob.job.jobType}</span>
                    </div>
                    <div className="flex items-center text-sm bg-gray-100 py-1 px-3 rounded-full">
                      <i className="fa-solid fa-dollar-sign mr-2 text-gray-600"></i>
                      <span>{selectedJob.job.salary}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-700">{selectedJob.job.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Requirements</h4>
                  <ul className="space-y-2">
                    {selectedJob.job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-2 mt-0.5">
                          <i className="fa-solid fa-check text-xs"></i>
                        </span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <img 
                    src={selectedJob.job.bannerImage} 
                    alt={`${selectedJob.job.title} banner`}
                    className="rounded-lg w-full h-48 object-cover"
                  />
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
              <button
                onClick={() => {
                  closeModal();
                  navigate(`/companies/${selectedJob.companyId}`);
                }}
                className="btn btn-primary"
              >
                Apply Now
                <i className="fa-solid fa-arrow-right ml-2"></i>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </Layout>
  );
};

export default JobsPage;
