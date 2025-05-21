import React, { useState } from 'react';

const ComingSoonSection = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setMessage('Thank you! You will be notified.');
      setEmail('');
    }, 1200);
  };

  return (
    <section
      aria-labelledby="coming-soon-title"
      className="w-full bg-gray-900 text-white py-16 px-4 flex flex-col items-center border-t border-gray-800"
    >
      <div className="max-w-xl w-full flex flex-col items-center">
        <h2
          id="coming-soon-title"
          className="text-3xl md:text-4xl font-bold mb-4 text-emerald-400 text-center"
        >
          Coming Soon: A11YO Tools
        </h2>
        <p className="text-lg text-gray-200 mb-8 text-center">
          A selection of tools to speed up your Accessibility Readiness!
        </p>
        <form
          className="w-full flex flex-col sm:flex-row gap-2 items-center justify-center"
          onSubmit={handleSubmit}
          aria-label="Notify me when A11YO Tools launches"
        >
          <label htmlFor="coming-soon-email" className="sr-only">
            Email Address
          </label>
          <input
            id="coming-soon-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email Address"
            className="w-full sm:w-64 px-4 py-2 rounded-md border border-gray-700 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            aria-required="true"
            aria-label="Email Address"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2 rounded-md font-semibold bg-emerald-400 text-gray-900 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Notify Me'}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-emerald-300 text-center" role="status">{message}</p>
        )}
      </div>
    </section>
  );
};

export default ComingSoonSection; 