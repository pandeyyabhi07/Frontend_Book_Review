import { FiStar } from 'react-icons/fi';

const BookCard = ({ book, onSelect }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
      onClick={() => onSelect(book)}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={book.image} 
          alt={book.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/src/assets/placeholder-cover.jpg';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-1 line-clamp-1">
          {book.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {book.author || 'Unknown Author'}
        </p>
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <FiStar 
              key={i} 
              className={`${i < book.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} w-4 h-4`} 
            />
          ))}
          <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
            {book.rating?.toFixed(1) || 'N/A'}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {book.description || 'No description available'}
        </p>
        <button className="mt-3 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
          Read More
        </button>
      </div>
    </div>
  );
};

export default BookCard;