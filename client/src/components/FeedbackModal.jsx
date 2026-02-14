import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Send, Loader2, CheckCircle, MessageSquare } from 'lucide-react';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('bug');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setRating(0);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed bottom-0 left-0 md:left-auto md:right-8 md:bottom-8 w-full md:w-96 bg-[#0f1115] border border-white/10 md:rounded-2xl rounded-t-2xl z-[70] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-2 text-white font-bold">
                <MessageSquare size={18} className="text-cyber-primary" />
                <span>System Feedback</span>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4"
                  >
                    <CheckCircle size={32} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">Transmission Received</h3>
                  <p className="text-gray-400 text-sm">Thank you for contributing to the system.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Rating */}
                  <div className="flex justify-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`transition-all hover:scale-110 ${rating >= star ? 'text-cyber-primary' : 'text-gray-600'}`}
                      >
                        <Star size={24} fill={rating >= star ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>

                  {/* Category */}
                  <div className="grid grid-cols-3 gap-2">
                    {['Bug', 'Feature', 'Other'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat.toLowerCase())}
                        className={`py-2 text-xs font-mono rounded border transition-all ${
                          category === cat.toLowerCase()
                            ? 'bg-cyber-primary text-black border-cyber-primary font-bold'
                            : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Text Area */}
                  <textarea
                    placeholder="Describe your observation..."
                    className="w-full h-24 bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyber-primary/50 resize-none"
                    required
                  ></textarea>

                  {/* Submit Button */}
                  <button
                    disabled={isSubmitting || rating === 0}
                    className="w-full py-3 bg-cyber-primary text-black font-bold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 transition-colors"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                    {isSubmitting ? 'TRANSMITTING...' : 'SEND FEEDBACK'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;