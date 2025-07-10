import { useState } from 'react';
import BookCard from '../components/BookCard';
import BookDetailsModal from '../components/BookDetailsModal';
import Chatbot from '../components/Chatbot';
import { FiLoader } from 'react-icons/fi';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const searchBooks = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=12`
      );
      const data = await response.json();
      
      if (data.docs && data.docs.length > 0) {
        const formattedBooks = data.docs.map(book => ({
          id: book.key.replace('/works/', ''),
          title: book.title,
          author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
          description: book.first_sentence ? book.first_sentence.join(' ') : 'No description available',
          image: book.cover_i 
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
            : '/src/assets/placeholder-cover.jpg',
          year: book.first_publish_year || 'Unknown',
          pages: book.number_of_pages_median || 'Unknown',
          rating: Math.min(5, (book.ratings_average || 3) + 1),
          category: book.subject ? book.subject[0] : 'General',
          reviews: []
        }));
        setBooks(formattedBooks);
      } else {
        setBooks([]);
      }
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Discover Your Next Favorite Book</h1>
          <div className="flex max-w-md mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search horror, money, love..."
              className="flex-1 border border-blue-500 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
              onKeyPress={(e) => e.key === 'Enter' && searchBooks(searchTerm)}
            />
            <button
              onClick={() => searchBooks(searchTerm)}
              className="bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-r-lg font-medium transition"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
      
      {/* Book Results */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <FiLoader className="animate-spin text-blue-500 text-4xl" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : books.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Search Results for "{searchTerm}"
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map(book => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onSelect={setSelectedBook}
                />
              ))}
            </div>
          </>
        ) : searchTerm ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No books found for "{searchTerm}". Try another search term.
          </p>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Popular Categories
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['Fantasy', 'Science Fiction', 'Romance', 'Mystery', 'Biography'].map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSearchTerm(category);
                    searchBooks(category);
                  }}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Chatbot */}
      <Chatbot />
      
      {/* Book Details Modal */}
      {selectedBook && (
        <BookDetailsModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
        />
      )}
    </div>
  );
};

export default Home;