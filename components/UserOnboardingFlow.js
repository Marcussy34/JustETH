import React, { useState, useEffect } from 'react';

const cuisineOptions = [
  { name: 'Italian', icon: '🍝' },
  { name: 'Asian', icon: '🍜' },
  { name: 'Mexican', icon: '🌮' },
  { name: 'Mediterranean', icon: '🥙' },
  { name: 'American', icon: '🍔' },
  { name: 'Indian', icon: '🍛' },
  { name: 'Middle Eastern', icon: '🧆' },
  { name: 'Vegetarian/Vegan', icon: '🥗' },
];

const spendingRanges = [
  { label: '$0 - $15 (Budget)', value: 'budget' },
  { label: '$15 - $30 (Moderate)', value: 'moderate' },
  { label: '$30 - $50 (Upscale)', value: 'upscale' },
  { label: '$50+ (Fine Dining)', value: 'fine-dining' },
];

const UserOnboardingFlow = ({ isOpen, onClose, onComplete, resetKey }) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState([]);
  const [spendingRange, setSpendingRange] = useState('');

  // Reset the state when resetKey changes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setPreferences([]);
      setSpendingRange('');
    }
  }, [resetKey, isOpen]);

  if (!isOpen) return null;

  const handlePreferenceChange = (cuisine) => {
    setPreferences(prev =>
      prev.includes(cuisine) ? prev.filter(p => p !== cuisine) : [...prev, cuisine]
    );
  };

  const handleNext = () => setStep(prev => prev + 1);

  const handleSubmit = () => {
    setStep(3); // Move to the thank you step instead of closing
  };

  const handleFinish = () => {
    onComplete(preferences, spendingRange);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-3xl w-full">
        {step < 3 && (
          <p className="text-2xl font-bold mb-6 text-black">
            Welcome! Let's get to know your food preferences to customize your experience.
          </p>
        )}

        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-6 text-black">Choose your food preferences (Select at least 3)</h2>
            <div className="grid grid-cols-4 gap-8 mb-8">
              {cuisineOptions.map(cuisine => (
                <button
                  key={cuisine.name}
                  onClick={() => handlePreferenceChange(cuisine.name)}
                  className={`flex flex-col items-center justify-center p-4 rounded-full transition-all ${
                    preferences.includes(cuisine.name) 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
                >
                  <span className="text-4xl mb-2">{cuisine.icon}</span>
                  <span className="text-sm">{cuisine.name}</span>
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={preferences.length === 0}
              className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold disabled:opacity-50 hover:bg-purple-700 transition-colors"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-6 text-black">Select your spending range</h2>
            {spendingRanges.map(range => (
              <label key={range.value} className="block mb-4 text-black text-lg">
                <input
                  type="radio"
                  value={range.value}
                  checked={spendingRange === range.value}
                  onChange={(e) => setSpendingRange(e.target.value)}
                  className="mr-3 w-4 h-4"
                />
                {range.label}
              </label>
            ))}
            <button
              onClick={handleSubmit}
              disabled={!spendingRange}
              className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold disabled:opacity-50 hover:bg-purple-700 transition-colors"
            >
              Submit
            </button>
          </>
        )}

        {step === 3 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-black">Thank you for your input!</h2>
            <p className="text-lg mb-8 text-black">We're excited to customize your experience based on your preferences.</p>
            <button
              onClick={handleFinish}
              className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Let's go!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOnboardingFlow;
