const axios = require('axios');

const getRandomQuote = async () => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    return response.data.content;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return 'Error fetching quote';
  }
};

module.exports = {
  getRandomQuote,
};
