import { useEffect, useState } from 'react';
import { FiX, FiStar, FiMessageSquare, FiExternalLink } from 'react-icons/fi';

const BookDetailsModal = ({ book, onClose }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{book.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <FiX size={24} />
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img 
                  src={book.image} 
                  alt={book.title} 
                  className="w-full rounded-lg shadow-md"
                />
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`${i < book.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} w-5 h-5`} 
                    />
                  ))}
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {book.rating.toFixed(1)}
                  </span>
                </div>
                
                <div className="mt-4">
                  <a 
                    href={`https://openlibrary.org/works/${book.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <FiExternalLink className="mr-1" /> View on Open Library
                  </a>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {bookDetails?.description 
                      ? typeof bookDetails.description === 'string' 
                        ? bookDetails.description 
                        : bookDetails.description.value || 'No description available'
                      : book.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Author</h4>
                    <p className="text-gray-800 dark:text-white">{book.author}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">First Published</h4>
                    <p className="text-gray-800 dark:text-white">{book.year}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</h4>
                    <p className="text-gray-800 dark:text-white capitalize">{book.category}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pages</h4>
                    <p className="text-gray-800 dark:text-white">{book.pages}</p>
                  </div>
                </div>
                
                {bookDetails?.subjects && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Subjects</h4>
                    <div className="flex flex-wrap gap-2">
                      {bookDetails.subjects.slice(0, 5).map((subject, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={() => {
                    document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' });
                    onClose();
                  }}
                  className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
                >
                  <FiMessageSquare className="mr-2" /> Start Chat About This Book
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;