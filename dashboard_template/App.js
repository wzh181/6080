import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import React,{useEffect,useState} from 'react';
import './App.css';
// import logo from "./logo.svg"
const logo = "https://via.placeholder.com/50x50"; // 或使用你的logo路径
import Dashboard from './Dashboard';
import Dash from './dash';
import Blanko from './Blanko.jsx';


const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="header-logo" />
      <nav className="header-nav">
        <Link to="/" onClick={() => console.log("Home link clicked!")}>
          <span className="nav-long">Home</span>
          <span className="nav-short">H</span>
        </Link>
        <span className="nav-separator">
          <span className="nav-separator-long"> | </span>
          <span className="nav-separator-short"> | </span>
        </span>
        <Link to="/dash2">
          <span className="nav-long">Dash2</span>
          <span className="nav-short">D2</span>
        </Link>
        <span className="nav-separator">
          <span className="nav-separator-long"> | </span>
          <span className="nav-separator-short"> | </span>
        </span>
        <Link to="/blanko">
          <span className="nav-long">Blanko</span>
          <span className="nav-short">B</span>
        </Link>
      </nav>
    </div>
  );
};

const Footer =()=>{
  return(
    <div className='footer'>
    </div>
  )
}

function App() {
  const [numWon, setnumWon] = useState()

  useEffect(()=>{
    const num = localStorage.getItem("number")
    if(num){
      setnumWon(parseInt(num))
    }else{
      const url="https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json"
      fetch(url)
      .then(res=>res.json())
      .then((res)=>{
        setnumWon(res.score)
        localStorage.setItem("number",res.score)
      })
    }
  },[])

  return (
    <div className="body">
      <BrowserRouter>
        <Header />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Dashboard numWon={numWon} setnumWon={setnumWon} />}
            />
            <Route
              path="/dash2"
              element={<Dash numWon={numWon} setnumWon={setnumWon} />}
            />
            <Route path="/blanko" element={<Blanko />} />
            <Route path="/slido"></Route>
            <Route path="/tetro"></Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
