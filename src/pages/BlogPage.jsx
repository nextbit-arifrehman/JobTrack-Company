import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Layout from '../components/Layout';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Career Tips & Blog - JobTrack";
    
    // Sample blog data - in a real app, you'd fetch this from an API
    const blogPosts = [
      {
        id: 1,
        title: "How to Prepare for Technical Interviews",
        excerpt: "Mastering technical interviews requires both knowledge and strategy. Learn the best practices to stand out.",
        author: "Sarah Johnson",
        date: "May 15, 2023",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Interview Tips"
      },
      {
        id: 2,
        title: "Building a Professional LinkedIn Profile",
        excerpt: "Your LinkedIn profile is your digital resume. Learn how to optimize it to attract recruiters.",
        author: "Michael Chen",
        date: "June 3, 2023",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Career Growth"
      },
      {
        id: 3,
        title: "Remote Work: Productivity Tips and Challenges",
        excerpt: "Working remotely has become the new normal. Discover strategies to stay productive and overcome common challenges.",
        author: "Emma Rodriguez",
        date: "July 12, 2023",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Remote Work"
      },
      {
        id: 4,
        title: "Negotiating Your Salary: Do's and Don'ts",
        excerpt: "Salary negotiation is an art. Learn effective techniques to ensure you're compensated fairly for your skills.",
        author: "David Wilson",
        date: "August 5, 2023",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Negotiation"
      },
      {
        id: 5,
        title: "The Future of Work: AI and Automation",
        excerpt: "How will AI and automation shape the job market? Prepare for the changing landscape of employment.",
        author: "Priya Sharma",
        date: "September 20, 2023",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Industry Trends"
      },
      {
        id: 6,
        title: "Mastering the Art of Networking",
        excerpt: "Effective networking can open doors to opportunities. Learn how to build meaningful professional relationships.",
        author: "James Thompson",
        date: "October 8, 2023",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        category: "Networking"
      }
    ];
    
    setTimeout(() => {
      setPosts(blogPosts);
      setLoading(false);
    }, 1000); // Simulate loading delay
  }, []);

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
    <Layout title="Career Tips & Blog - JobTrack">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Career Tips & Insights
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Helpful resources to guide you through your job search and career development
          </motion.p>
        </div>
      </section>
      
      {/* Blog Posts Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={fadeInUp}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center mt-4">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                        <img 
                          src={`https://randomuser.me/api/portraits/men/${post.id + 10}.jpg`} 
                          alt={post.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium">{post.author}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Want more career tips?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest career advice, job search tips, and industry insights.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 rounded-lg text-gray-900"
                required
              />
              <button 
                type="submit" 
                className="bg-brand-blue hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
