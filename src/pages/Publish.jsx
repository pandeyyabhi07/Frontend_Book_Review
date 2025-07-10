// src/pages/Publish.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiCheckCircle, FiBook, FiUser, FiType, FiLink, FiImage } from 'react-icons/fi';

const PublishBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    bookLink: '',
    imageUrl: '',
    category: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const existingBooks = JSON.parse(localStorage.getItem('userBooks') || '[]');
      const newBook = {
        id: Date.now(),
        ...formData,
        rating: 4,
        year: new Date().getFullYear(),
        reviews: []
      };
      localStorage.setItem('userBooks', JSON.stringify([...existingBooks, newBook]));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setFormData({
          title: '',
          author: '',
          description: '',
          bookLink: '',
          imageUrl: '',
          category: ''
        });
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Publish Your Book</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Share your literary work with our community of readers and authors
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <svg width="350" height="350" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 400H400V150H100V400Z" fill="#3B82F6" className="dark:fill-blue-700"/>
              <path d="M100 150H400V100H100V150Z" fill="#1D4ED8" className="dark:fill-blue-800"/>
              <path d="M100 100H150V400H100V100Z" fill="#1D4ED8" className="dark:fill-blue-800"/>
              <path d="M150 100H250V400H150V100Z" fill="#2563EB" className="dark:fill-blue-700"/>
              <path d="M250 100H350V400H250V100Z" fill="#3B82F6" className="dark:fill-blue-600"/>
              <path d="M350 100H400V400H350V100Z" fill="#60A5FA" className="dark:fill-blue-500"/>
              <path d="M125 125H175V175H125V125Z" fill="white"/>
              <path d="M125 200H175V225H125V200Z" fill="white"/>
              <path d="M125 250H225V275H125V250Z" fill="white"/>
              <path d="M125 300H325V325H125V300Z" fill="white"/>
              <path d="M125 350H375V375H125V350Z" fill="white"/>
            </svg>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            {isSuccess ? (
              <div className="text-center py-8">
                <FiCheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Your book has been submitted!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Thank you for sharing your work with our community.
                </p>
                <button
                  onClick={() => navigate('/mybooks')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                >
                  View My Books
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FiBook className="mr-2" /> Book Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter book title"
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FiUser className="mr-2" /> Author Name
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter author name"
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FiType className="mr-2" /> Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter book description"
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FiLink className="mr-2" /> Book Link
                  </label>
                  <input
                    type="url"
                    name="bookLink"
                    value={formData.bookLink}
                    onChange={handleChange}
                    required
                    placeholder="https://example.com/book"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FiImage className="mr-2" /> Cover Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                    placeholder="https://example.com/cover.jpg"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {formData.imageUrl && (
                  <div className="flex justify-center">
                    <img 
                      src={formData.imageUrl} 
                      alt="Book cover preview" 
                      className="h-40 object-contain rounded-lg border border-gray-200 dark:border-gray-600"
                      onError={(e) => {
                        e.target.src = '/src/assets/placeholder-cover.jpg';
                      }}
                    />
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-4 px-6 rounded-lg font-medium transition flex items-center justify-center shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Publishing...
                      </>
                    ) : 'Publish Book'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishBook;