import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/auth-context";

const HomePage = () => {
  const { currentUser } = useAuth();
  const [companies, setCompanies] = useState([]);
  
  useEffect(() => {
    // Set document title for this page
    document.title = "JobTrack - Find Your Dream Job";
    
    // Fetch companies from our JSON file
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        setCompanies(data.companies);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const features = [
    {
      icon: <i className="fa-solid fa-magnifying-glass text-teal-500 text-2xl"></i>,
      title: "Find Jobs",
      description: "Browse through thousands of opportunities from leading companies across various industries."
    },
    {
      icon: <i className="fa-solid fa-circle-check text-blue-500 text-2xl"></i>,
      title: "Review Requirements",
      description: "Check if your qualifications and skills match with the job requirements before applying."
    },
    {
      icon: <i className="fa-solid fa-briefcase text-purple-500 text-2xl"></i>,
      title: "Apply with Confidence",
      description: "Submit applications to positions where you meet the criteria for better success rates."
    }
  ];

  return (
    <Layout title="JobTrack - Find Your Dream Job">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              className="w-full lg:w-1/2 lg:pr-12" 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Find Your <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Perfect Job</span> Match
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Discover job opportunities that align with your skills and qualifications. 
                Review requirements before applying to increase your chances of success.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/companies" className="btn btn-primary text-white px-8 py-6 text-lg">
                  Browse Companies
                  <i className="fa-solid fa-arrow-right ml-2"></i>
                </Link>
                <Link to="/jobs" className="btn btn-outline btn-secondary px-8 py-6 text-lg">
                  View All Jobs
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="w-full lg:w-1/2 mt-12 lg:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Job Search Illustration" 
                className="w-full rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              JobTrack simplifies your job search process with a few easy steps
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                variants={fadeInUp}
              >
                <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-16 text-center">
            <Link to="/companies" className="btn btn-primary">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Companies</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover opportunities with leading companies across industries
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {companies.map((company) => (
              <motion.div 
                key={company.id}
                variants={fadeInUp}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all flex flex-col items-center"
              >
                <Link to={`/companies/${company.id}`} className="w-full h-full flex flex-col items-center">
                  <div className="w-16 h-16 mb-4 rounded-full overflow-hidden">
                    <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-center font-medium text-sm">{company.name}</h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <Link to="/companies" className="btn btn-outline btn-primary">
              View All Companies
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Hide when user is logged in */}
      {!currentUser && (
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Hear from job seekers who found their perfect career match through JobTrack
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[1, 2, 3].map((item) => (
                <motion.div 
                  key={item}
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                      <img 
                        src={`https://randomuser.me/api/portraits/women/${item + 20}.jpg`} 
                        alt="Testimonial" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Sarah Johnson</h3>
                      <p className="opacity-80 text-sm">Software Developer</p>
                    </div>
                  </div>
                  <p className="opacity-90">
                    "JobTrack made it easy to find positions that matched my skills. I was able to review the requirements
                    before applying and landed a job that was the perfect fit for my experience and career goals."
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fa-solid fa-heart text-yellow-400 text-sm"></i>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default HomePage;
