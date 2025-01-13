import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import axios from 'axios';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONTEXT_PROMPT = `You are an agricultural expert assistant focused on Southern African farming, particularly Malawi. 
Your expertise includes local farming practices, crop selection, soil management, and sustainable agriculture techniques 
specific to the region. Only provide information related to agriculture and farming in Southern Africa. 
If asked about other topics, politely redirect the conversation to agricultural topics.`;

export default function ChatDialog({ isOpen, onClose }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407/v1/chat/completions',
        {
          model: "mistralai/Mistral-Nemo-Instruct-2407",
          messages: [
            { role: "system", content: CONTEXT_PROMPT },
            ...messages,
            { role: "user", content: userMessage }
          ],
          max_tokens: 500,
          stream: false
        },
        {
          headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
          }
        }
      );

      const assistantMessage = response.data.choices[0].message.content;
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed bottom-20 right-6 z-50 transition-all duration-300 ease-in-out
        ${isMinimized ? 'w-72 h-12' : 'w-[90vw] md:w-96 h-[500px] max-w-[96vw]'}`}
    >
      <div className="bg-white rounded-lg shadow-xl flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b bg-green-600 rounded-t-lg">
          <h3 className="text-lg font-semibold text-white">Agricultural Assistant</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:text-green-100 transition-colors"
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-green-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="p-3 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about farming in Southern Africa..."
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 text-white rounded-lg px-3 py-2 hover:bg-green-700 transition-colors disabled:bg-green-400"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}