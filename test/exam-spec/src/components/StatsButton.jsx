import { useNavigate } from 'react-router-dom';
import './StatsButton.css';

function StatsButton() {
  const navigate = useNavigate();

  return (
    <button className="stats-button" onClick={() => navigate('/statspanel')}>
      Stats
    </button>
  );
}

export default StatsButton;

