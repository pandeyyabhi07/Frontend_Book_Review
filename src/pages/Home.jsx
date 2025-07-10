import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BookCard from '../components/BookCard';
import BookDetailsModal from '../components/BookDetailsModal';
import Chatbot from '../components/Chatbot';
import CategorySlider from '../components/CategorySlider';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import { FiLoader, FiSearch, FiArrowRight } from 'react-icons/fi';
import { FaBookOpen, FaUserTie, FaRegLightbulb } from 'react-icons/fa';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [featuredBooks, setFeaturedBooks] = useState([]);

  // Fetch featured books on component mount
  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=best+sellers&limit=3`
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
          setFeaturedBooks(formattedBooks);
        }
      } catch (err) {
        console.error('Error fetching featured books:', err);
      }
    };

    fetchFeaturedBooks();
  }, []);

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

  const handleCategorySelect = (category) => {
    setSearchTerm(category);
    searchBooks(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white dark:from-dark-900 dark:to-dark-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-900 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
            >
              Discover Your Next <span className="text-accent-300">Favorite Book</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-primary-100 max-w-3xl mx-auto mb-10"
            >
              Explore thousands of books across all genres. Find your perfect read today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for books, authors, or genres..."
                className="flex-1 px-6 py-4 focus:outline-none dark:bg-gray-800 dark:text-white"
                onKeyPress={(e) => e.key === 'Enter' && searchBooks(searchTerm)}
              />
              <button
                onClick={() => searchBooks(searchTerm)}
                className="bg-accent-500 hover:bg-accent-600 px-6 py-4 text-white font-medium transition flex items-center"
              >
                <FiSearch className="mr-2" /> Search
              </button>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-dark-800"></div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Why Choose BookFinder?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We provide the best platform for book lovers to discover, explore, and discuss literature.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBookOpen className="text-4xl text-primary-500" />,
                title: "Vast Collection",
                description: "Access thousands of books across all genres and categories.",
                color: "bg-primary-100 dark:bg-primary-900/30"
              },
              {
                icon: <FaUserTie className="text-4xl text-secondary-500" />,
                title: "Expert Recommendations",
                description: "Get personalized recommendations based on your reading preferences.",
                color: "bg-secondary-100 dark:bg-secondary-900/30"
              },
              {
                icon: <FaRegLightbulb className="text-4xl text-accent-500" />,
                title: "Smart Search",
                description: "Find exactly what you're looking for with our powerful search tools.",
                color: "bg-accent-100 dark:bg-accent-900/30"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`${feature.color} p-8 rounded-xl shadow-md hover:shadow-lg transition`}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      {featuredBooks.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-dark-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                Featured Books
              </h2>
              <button className="flex items-center text-primary-600 dark:text-primary-400 font-medium">
                View all <FiArrowRight className="ml-2" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <BookCard 
                    book={book} 
                    onSelect={setSelectedBook}
                    featured={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Slider */}
      <section className="py-16 bg-white dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategorySlider onSelectCategory={handleCategorySelect} />
        </div>
      </section>

      {/* Search Results */}
      <section className="py-16 bg-gray-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <FiLoader className="animate-spin text-primary-500 text-4xl" />
            </div>
          ) : error ? (
            <p className="text-center text-accent-600">{error}</p>
          ) : books.length > 0 ? (
            <>
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-10">
                Search Results for "{searchTerm}"
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {books.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <BookCard 
                      book={book} 
                      onSelect={setSelectedBook}
                    />
                  </motion.div>
                ))}
              </div>
            </>
          ) : searchTerm ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No books found for "{searchTerm}". Try another search term.
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                Start by searching for a book or browsing categories
              </h3>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />

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