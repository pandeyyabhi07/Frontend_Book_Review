// src/components/BookDetailsModal.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiStar, FiMessageSquare, FiExternalLink, FiCalendar, FiBook, FiUser } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const BookDetailsModal = ({ book, onClose }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://openlibrary.org/works/${book.id}.json`
        );
        const data = await response.json();
        setBookDetails(data);
      } catch (err) {
        console.error('Failed to fetch book details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [book.id]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200 dark:border-gray-700"
        >
          {/* Modal content remains the same as before */}
          {/* ... */}
           <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-800 dark:text-white">
                  {book.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  by {book.author || 'Unknown Author'}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <FiX size={24} />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Reviews
                </button>
                <button
                  onClick={() => setActiveTab('similar')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'similar' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                  Similar Books
                </button>
              </nav>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column */}
                <div className="md:w-1/3">
                  <div className="sticky top-6">
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="w-full rounded-xl shadow-md"
                    />
                    
                    <div className="flex items-center mt-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`${i < book.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} w-5 h-5`} 
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">
                        {book.rating.toFixed(1)} ({Math.floor(Math.random() * 1000)} ratings)
                      </span>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-500 dark:text-gray-400 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Published: {book.year}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiBook className="text-gray-500 dark:text-gray-400 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Pages: {book.pages}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiUser className="text-gray-500 dark:text-gray-400 mr-3" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Author: {book.author || 'Unknown'}
                        </span>
                      </div>
                    </div>
                    
                    <a 
                      href={`https://openlibrary.org/works/${book.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-6 flex items-center justify-center text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      <FiExternalLink className="mr-2" /> View on Open Library
                    </a>
                    
                    <button 
                      onClick={() => {
                        document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' });
                        onClose();
                      }}
                      className="mt-6 w-full flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition"
                    >
                      <FiMessageSquare className="mr-2" /> Chat About This Book
                    </button>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="md:w-2/3">
                  {activeTab === 'details' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Description</h3>
                      <div className="prose dark:prose-invert max-w-none">
                        {bookDetails?.description ? (
                          typeof bookDetails.description === 'string' ? (
                            <p>{bookDetails.description}</p>
                          ) : (
                            <p>{bookDetails.description.value || 'No description available'}</p>
                          )
                        ) : (
                          <p>{book.description || 'No description available'}</p>
                        )}
                      </div>
                      
                      {bookDetails?.subjects && (
                        <div className="mt-8">
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Subjects</h4>
                          <div className="flex flex-wrap gap-2">
                            {bookDetails.subjects.slice(0, 8).map((subject, i) => (
                              <span 
                                key={i} 
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full"
                              >
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                  
                  {activeTab === 'reviews' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Reader Reviews</h3>
                      
                      {book.reviews.length > 0 ? (
                        <div className="space-y-6">
                          {book.reviews.map((review, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                              <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar 
                                    key={i} 
                                    className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} w-4 h-4`} 
                                  />
                                ))}
                              </div>
                              <div className="flex items-start">
                                <FaQuoteLeft className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                                <p className="text-gray-700 dark:text-gray-300 italic">
                                  {review.text}
                                </p>
                              </div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                                — {review.author}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl text-center">
                          <p className="text-gray-600 dark:text-gray-400">
                            No reviews yet. Be the first to review this book!
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                  
                  {activeTab === 'similar' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Similar Books</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                          <div key={item} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex items-center">
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded mr-4"></div>
                            <div>
                              <h4 className="font-medium text-gray-800 dark:text-white">Similar Book {item}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Author Name</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookDetailsModal;