import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const categories = [
  { name: 'Fantasy', icon: '🧙', color: 'bg-purple-100 text-purple-800' },
  { name: 'Science Fiction', icon: '👽', color: 'bg-blue-100 text-blue-800' },
  { name: 'Romance', icon: '💖', color: 'bg-pink-100 text-pink-800' },
  { name: 'Mystery', icon: '🕵️', color: 'bg-gray-100 text-gray-800' },
  { name: 'Biography', icon: '📜', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Horror', icon: '👻', color: 'bg-red-100 text-red-800' },
  { name: 'Self-Help', icon: '🧠', color: 'bg-green-100 text-green-800' },
];

const CategorySlider = ({ onSelectCategory }) => {
  return (
    <div className="relative my-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Browse by Category
      </h2>
      <div className="flex space-x-4 overflow-x-auto pb-4 px-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className={`flex flex-col items-center justify-center min-w-[120px] p-4 rounded-xl ${category.color} dark:bg-opacity-20 shadow-md hover:shadow-lg transition-all`}
          >
            <span className="text-2xl mb-2">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;