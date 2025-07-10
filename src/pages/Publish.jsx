import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiCheckCircle } from 'react-icons/fi';

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
    
    // Simulate API call
    setTimeout(() => {
      // Save to localStorage
      const existingBooks = JSON.parse(localStorage.getItem('userBooks') || '[]');
      const newBook = {
        id: Date.now(),
        ...formData,
        rating: 4, // Default rating
        year: new Date().getFullYear(),
        reviews: []
      };
      localStorage.setItem('userBooks', JSON.stringify([...existingBooks, newBook]));
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after 2 seconds
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Publish Your Book</h1>
        
        {isSuccess ? (
          <div className="text-center py-8">
            <FiCheckCircle className="mx-auto text-green-500 w-12 h-12 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Your book has been submitted!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for contributing to our community.
            </p>
            <button
              onClick={() => navigate('/mybooks')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              View My Books
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Book Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Author Name *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select a category</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="horror">Horror</option>
                <option value="romance">Romance</option>
                <option value="science fiction">Science Fiction</option>
                <option value="fantasy">Fantasy</option>
                <option value="biography">Biography</option>
                <option value="self-help">Self-Help</option>
                <option value="finance">Finance</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="bookLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Book Link (Google Drive, PDF, etc.) *
              </label>
              <div className="flex">
                <input
                  type="url"
                  id="bookLink"
                  name="bookLink"
                  value={formData.bookLink}
                  onChange={handleChange}
                  required
                  placeholder="https://drive.google.com/..."
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
                  <FiUpload className="mr-1" /> Link
                </span>
              </div>
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Cover Image URL *
              </label>
              <div className="flex">
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/book-cover.jpg"
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <span className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
                  <FiUpload className="mr-1" /> Image
                </span>
              </div>
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
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg transition flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Publish Book'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PublishBook;