import { FaBookOpen, FaUsers, FaAward } from 'react-icons/fa';
import Testimonials from '../components/Testimonials';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-primary-600 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About BookFinder</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Connecting readers with their next favorite book since 2023
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
          <FaBookOpen className="text-4xl text-primary-500 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">10,000+</h3>
          <p className="text-gray-600 dark:text-gray-400">Books in our database</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
          <FaUsers className="text-4xl text-primary-500 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">50,000+</h3>
          <p className="text-gray-600 dark:text-gray-400">Active readers</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
          <FaAward className="text-4xl text-primary-500 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">100+</h3>
          <p className="text-gray-600 dark:text-gray-400">Featured authors</p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Our Story
        </h2>
        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          <p>
            Founded in 2023 by a team of book enthusiasts, BookFinder began as a passion project to help readers 
            discover books they'll love. Frustrated by the difficulty of finding quality recommendations, we set 
            out to create a platform that makes book discovery effortless and enjoyable.
          </p>
          <p>
            Our mission is simple: to connect readers with books that will inspire, entertain, and educate. 
            Whether you're looking for your next beach read or diving into academic research, BookFinder is 
            designed to help you find exactly what you need.
          </p>
          <p>
            Today, we're proud to serve a growing community of book lovers from around the world, and we're 
            constantly working to improve our platform with new features and better recommendations.
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Alex Johnson", role: "Founder & CEO", bio: "Book lover since childhood", img: "https://randomuser.me/api/portraits/men/75.jpg" },
            { name: "Maria Garcia", role: "Lead Developer", bio: "Tech meets literature", img: "https://randomuser.me/api/portraits/women/65.jpg" },
            { name: "James Wilson", role: "Content Curator", bio: "Literary expert", img: "https://randomuser.me/api/portraits/men/22.jpg" }
          ].map((member, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
              <img src={member.img} alt={member.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{member.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;