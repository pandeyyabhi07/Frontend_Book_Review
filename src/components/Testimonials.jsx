import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Book Blogger",
    content: "BookFinder has completely transformed how I discover new reads. The recommendations are spot-on!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Michael Chen",
    role: "Literature Professor",
    content: "As an educator, I appreciate the depth of information available. My students love it too!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Emma Rodriguez",
    role: "Avid Reader",
    content: "I've found so many hidden gems through BookFinder that I wouldn't have discovered otherwise.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-12">
          What Readers Say About Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <FaQuoteLeft className="text-primary-500 text-3xl mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                {testimonial.content}
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;