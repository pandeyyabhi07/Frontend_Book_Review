import { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your smart book assistant 🤖. Ask me anything about books, authors, genres, or recommendations!",
      isUser: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    // Simulate API thinking delay
    setTimeout(() => {
      const botResponse = generateSmartResponse(inputValue);
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: botResponse,
          isUser: false
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const generateSmartResponse = (input) => {
    const q = input.toLowerCase();

    if (q.includes('recommend') || q.includes('suggest')) {
      return "Sure! 📚 Try 'Sapiens' for history lovers, 'The Alchemist' for fiction fans, or 'Atomic Habits' for self-help.";
    }
    if (q.includes('beginner') || q.includes('easy')) {
      return "For beginners, 'Rich Dad Poor Dad' (finance), 'The Subtle Art of Not Giving a F*ck' (self-help), and 'Harry Potter' (fiction) are great picks!";
    }
    if (q.includes('horror')) {
      return "You’ll love 'The Shining' by Stephen King or 'Mexican Gothic' by Silvia Moreno-Garcia 👻";
    }
    if (q.includes('romance') || q.includes('love')) {
      return "'The Notebook', 'Me Before You', and 'It Ends With Us' are popular romance books 💕";
    }
    if (q.includes('finance') || q.includes('money')) {
      return "'The Psychology of Money' and 'The Intelligent Investor' are solid finance reads 💸";
    }
    if (q.includes('summary') || q.includes('what is')) {
      return "It’s a deep dive into human behavior, growth, and purpose. Want a detailed summary?";
    }

    // Default random smart fallback
    const replies = [
      "That's a great question! Let me search some book suggestions for you.",
      "Try exploring similar genres or authors. Want recommendations?",
      "This topic is covered in Chapter 2 of most relevant books.",
      "You might enjoy reading book reviews from other readers as well."
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  return (
    <section id="chatbot" className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
            <FiMessageSquare className="mr-2" /> Smart Book Assistant
          </h2>
        </div>

        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                message.isUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}>
                <div className="flex items-start gap-2">
                  <div className={`p-1 rounded-full ${
                    message.isUser ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    <FiUser className={message.isUser ? 'text-white' : 'text-gray-700 dark:text-gray-300'} />
                  </div>
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 max-w-xs md:max-w-md rounded-lg p-3">
                <div className="animate-pulse text-sm italic">Typing...</div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about books, authors, genres..."
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
