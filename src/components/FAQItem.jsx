import { memo } from 'react';

// Memoized FAQ Item component to prevent unnecessary re-renders
const FAQItem = memo(({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <button 
        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <h3 className="text-xl font-semibold text-gray-900">{question}</h3>
        <svg 
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="px-8 pb-6">
          <div className="text-gray-600 space-y-4">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
});

FAQItem.displayName = 'FAQItem';

export default FAQItem;
