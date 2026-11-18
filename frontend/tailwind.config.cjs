module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        priority: {
          low: '#10b981',
          medium: '#f59e0b',
          high: '#ef4444',
        },
      },
    },
  },
  plugins: [],
};
