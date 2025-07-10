import { motion } from 'framer-motion';
import { FiStar, FiBookOpen } from 'react-icons/fi';

const BookCard = ({ book, onSelect, featured = false }) => {
  return (
    <motion.div 
      className={`relative ${featured ? 'featured-book' : ''}`}
      whileHover={{ scale: featured ? 1.03 : 1.02 }}
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${featured ? 'border-2 border-primary-300 dark:border-primary-600' : ''}`}
        onClick={() => onSelect(book)}
      >
        {/* Book Cover */}
        <div className={`relative ${featured ? 'h-64' : 'h-48'} overflow-hidden`}>
          <img 
            src={book.image} 
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.target.src = '/src/assets/placeholder-cover.jpg';
            }}
          />
          {featured && (
            <div className="absolute top-4 left-4 bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Featured
            </div>
          )}
        </div>
        
        {/* Book Info */}
        <div className="p-5">
          <h3 className={`font-bold ${featured ? 'text-xl' : 'text-lg'} text-gray-800 dark:text-white mb-1 line-clamp-1`}>
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {book.author || 'Unknown Author'}
          </p>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FiStar 
                  key={i} 
                  className={`${i < book.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} w-4 h-4`} 
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {book.rating?.toFixed(1) || 'N/A'}
            </span>
          </div>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
            {book.description || 'No description available'}
          </p>
          
          {/* Read More Button */}
          <button className="w-full flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-800 text-primary-600 dark:text-primary-400 py-2 px-4 rounded-lg font-medium transition">
            <FiBookOpen className="mr-2" />
            {featured ? 'View Details' : 'Read More'}
          </button>
        </div>
      </div>
      
      {/* Featured book decoration */}
      {featured && (
        <div className="absolute -bottom-2 -left-2 -right-2 h-2 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-b-lg z-0"></div>
      )}
    </motion.div>
  );
};

export default BookCard;