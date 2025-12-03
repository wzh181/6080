/**
 * API utility functions
 */

const API_URL = 'http://cgi.cse.unsw.edu.au/~cs6080/data';

/**
 * Fetch initial score from API
 * @returns {Promise<number>} Initial score value
 */
export const fetchInitialScore = async () => {
  try {
    const response = await fetch(`${API_URL}/score.json`);
    const data = await response.json();
    return data.score || 0;
  } catch (error) {
    console.error('Failed to fetch initial score:', error);
    return 0;
  }
};

