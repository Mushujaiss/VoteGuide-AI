import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { electionData } from '../data/indiaElectionData';
import './ChatAssistant.css';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "Namaste! I'm VoteGuide AI. Do you need help with Form 6 or finding your polling booth?", isUser: false }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    for (const entry of electionData.chatBotKnowledge) {
      if (entry.keywords.some(kw => lowerQuery.includes(kw))) {
        return entry.answer;
      }
    }
    return electionData.fallbackAnswer;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input.trim(), isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const aiResponse = { text: getAIResponse(userMessage.text), isUser: false };
      setMessages(prev => [...prev, aiResponse]);
    }, 600);
  };

  return (
    <div className="chat-widget">
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        <Bot size={28} />
      </button>
      
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <Bot />
            <span>VoteGuide AI</span>
            <button className="close-chat" onClick={() => setIsOpen(false)}><X size={20}/></button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.isUser ? 'user-message' : 'ai-message'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Type your question..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit"><Send size={18}/></button>
          </form>
        </div>
      )}
    </div>
  );
}
