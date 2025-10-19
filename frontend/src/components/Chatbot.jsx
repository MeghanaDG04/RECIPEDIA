import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Recipedia's chatbot. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    // Simple response logic
    let botResponse = "I'm sorry, I didn't understand that. Try asking about recipes, categories, or help!";
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('recipe') || lowerInput.includes('veg')) {
      botResponse = "Check out our vegetarian recipes! Visit /veg for more.";
    } else if (lowerInput.includes('nonveg') || lowerInput.includes('chicken') || lowerInput.includes('meat')) {
      botResponse = "Explore non-vegetarian recipes at /nonveg.";
    } else if (lowerInput.includes('dessert') || lowerInput.includes('sweet')) {
      botResponse = "Indulge in our desserts! Go to /dessert.";
    } else if (lowerInput.includes('beverage') || lowerInput.includes('drink')) {
      botResponse = "Quench your thirst with our beverages at /beverages.";
    } else if (lowerInput.includes('help') || lowerInput.includes('how')) {
      botResponse = "I can help with recipe suggestions, categories, or general info. What do you need?";
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      botResponse = "Hi there! Ready to cook something delicious?";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 200);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 cursor-pointer shadow-lg transition-colors duration-200 z-50"
        onClick={toggleChat}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg flex flex-col z-50">
          {/* Header */}
          <div className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-semibold">Recipedia Chatbot</span>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg max-w-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-300 dark:border-slate-600">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 p-2 border border-gray-300 dark:border-slate-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-lg transition-colors duration-200"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
