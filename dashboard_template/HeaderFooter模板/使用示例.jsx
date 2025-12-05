import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Dashboard from './Dashboard'; // 你的页面组件

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/game1" element={<div>Game 1</div>} />
            <Route path="/game2" element={<div>Game 2</div>} />
            <Route path="/game3" element={<div>Game 3</div>} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;


