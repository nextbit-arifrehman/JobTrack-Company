import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import Layout from "../components/Layout";

const CompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Set document title
    document.title = "JobTrack - Browse Companies";
    
    // Fetch companies data from our JSON file
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        setCompanies(data.companies);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching companies:", error);
        setLoading(false);
      });
  }, []);
  
  // Filter companies based on search term
  const filteredCompanies = companies.filter((company) => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <Layout title="JobTrack - Browse Companies">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Browse Companies
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore opportunities from leading companies across various industries
          </motion.p>
          
          <motion.div 
            className="max-w-lg mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            <input
              type="text"
              placeholder="Search by company name, industry, or location..."
              className="pl-10 py-6 w-full rounded-full shadow-lg bg-white/90 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </div>
      </section>
      
      {/* Companies List */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading companies...</p>
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-medium text-gray-600">No companies found matching your search.</h3>
              <p className="mt-2 text-gray-500">Try adjusting your search terms or browse all companies.</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredCompanies.map((company) => (
                <motion.div
                  key={company.id}
                  variants={fadeInUp}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <Link to={`/companies/${company.id}`} className="block h-full">
                    <div className="p-6 flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                        <img 
                          src={company.logo} 
                          alt={company.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{company.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{company.industry}</p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <span>{company.location}</span>
                          <span className="mx-2">•</span>
                          <span>{company.jobs.length} {company.jobs.length === 1 ? 'job' : 'jobs'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-6 pb-6">
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="font-medium text-sm mb-2">Recent openings:</h4>
                        <ul className="space-y-1">
                          {company.jobs.slice(0, 3).map((job) => (
                            <li key={job.id} className="text-sm text-gray-600">{job.title}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CompaniesPage;
