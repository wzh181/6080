import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import StatsButton from './components/StatsButton';
import Dashboard from './pages/Dashboard';
import GuessTheNumber from './pages/GuessTheNumber';
import TicTacToe from './pages/TicTacToe';
import SealTheBox from './pages/SealTheBox';
import StatsPanel from './pages/StatsPanel';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="main-body">
          <StatsButton />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/game/guessthenumber" element={<GuessTheNumber />} />
            <Route path="/game/tictactoe" element={<TicTacToe />} />
            <Route path="/game/sealthebox" element={<SealTheBox />} />
            <Route path="/statspanel" element={<StatsPanel />} />
          </Routes>
        </div>
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
