// 初始剩余游戏数（纯前端静态数据）
export const INITIAL_REMAINING = 5;

// 从API获取剩余游戏数（如果需要）
export const fetchRemainingGames = async () => {
  try {
    const response = await fetch('http://cgi.cse.unsw.edu.au/~cs6080/21T3/data/remain.json');
    if (!response.ok) {
      throw new Error('Failed to fetch remaining games');
    }
    const data = await response.json();
    return data.remaining || INITIAL_REMAINING;
  } catch (error) {
    console.error('Error fetching remaining games:', error);
    return INITIAL_REMAINING;
  }
};

