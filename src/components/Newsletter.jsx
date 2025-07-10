import { motion } from 'framer-motion';
import { FiMail, FiSend } from 'react-icons/fi';

const Newsletter = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary-100 to-secondary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side */}
            <div className="p-10 bg-gradient-to-br from-primary-400 to-secondary-500 text-white">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-display font-bold mb-4">Stay Updated</h2>
                <p className="text-primary-100 mb-6">
                  Subscribe to our newsletter for the latest book releases, recommendations, and exclusive offers.
                </p>
                <div className="flex space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <FiMail className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold">Monthly Digest</h4>
                    <p className="text-sm text-primary-100">Curated content delivered to your inbox</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Side */}
            <div className="p-10">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition flex items-center justify-center"
                  >
                    <FiSend className="mr-2" /> Subscribe Now
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;