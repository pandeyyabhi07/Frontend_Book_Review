import { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi! I'm your book assistant. Ask me anything about books or topics you're interested in.", 
      isUser: false 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        text: botResponse,
        isUser: false
      }]);
    }, 800);
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('good for beginners') || input.includes('beginner')) {
      return "This book is excellent for beginners! It starts with basic concepts and gradually builds up complexity.";
    } else if (input.includes('horror') || input.includes('scary')) {
      return "For horror books, I recommend checking out 'The Shining' by Stephen King or 'House of Leaves' by Mark Z. Danielewski.";
    } else if (input.includes('finance') || input.includes('money')) {
      return "Popular finance books include 'Rich Dad Poor Dad' by Robert Kiyosaki and 'The Intelligent Investor' by Benjamin Graham.";
    } else if (input.includes('love') || input.includes('romance')) {
      return "Great romance books are 'Pride and Prejudice' by Jane Austen or 'The Notebook' by Nicholas Sparks.";
    } else if (input.includes('summary') || input.includes('about')) {
      return "This book explores deep themes through its narrative. Without spoilers, it's about personal growth and overcoming challenges.";
    } else {
      const genericResponses = [
        "That's an interesting question about this book. I recommend checking the reviews section for more insights.",
        "I'd suggest reading the book description and reviews to better understand if it matches your interests.",
        "This book covers that topic in depth, especially in chapters 3-5.",
        "Many readers find this book helpful for that subject. Would you like recommendations for similar books?"
      ];
      return genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }
  };

  return (
    <section id="chatbot" className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
            <FiMessageSquare className="mr-2" /> Book Assistant
          </h2>
        </div>
        
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${message.isUser 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              >
                <div className="flex items-start">
                  <div className={`p-1 rounded-full mr-2 ${message.isUser 
                    ? 'bg-blue-600' 
                    : 'bg-gray-300 dark:bg-gray-600'}`}
                  >
                    <FiUser className={message.isUser ? 'text-white' : 'text-gray-700 dark:text-gray-300'} />
                  </div>
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about books or topics..."
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-r-lg transition"
            >
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;