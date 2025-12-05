// 从API获取初始分数
export const fetchInitialScore = async () => {
  try {
    const response = await fetch('https://cs6080.web.cse.unsw.edu.au/raw/data/score.json');
    if (!response.ok) {
      throw new Error('Failed to fetch score');
    }
    const data = await response.json();
    return data.score || 5;
  } catch (error) {
    console.error('Error fetching score:', error);
    return 5; // 默认值
  }
};

