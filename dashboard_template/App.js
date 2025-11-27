import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import React,{useEffect,useState} from 'react';
import './App.css';
import logo from "./logo.svg"
import Dashboard from './Dashboard';
import Dash from './dash';
import Blanko from './Blanko.jsx';


const Header =()=>{
  return(
    <div className='header'>
      <img src={logo} alt='logo' style={{width:50,height:50,margin:15}}/>
      <div>
        <Link to="/" onClick={() => console.log("Home link clicked!")}><span className='long'>Home |</span><span className='short'>H | </span></Link>
        <Link to="/dash2"><span className='long'>dash2 |</span></Link>
        <Link to="/blanko"><span className='long'>Blanko |</span><span className='short'>B | </span></Link>
      </div>
    </div>
  )
}

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
      <Header/>

      <Routes>
        <Route path="/" element={<Dashboard numWon={numWon} setnumWon={setnumWon}/>}></Route>
        <Route path="/dash2" element={<Dash numWon={numWon} setnumWon={setnumWon}/>}></Route>
        <Route path="/blanko" element={<Blanko/>}></Route>
        <Route path="/slido" ></Route>
        <Route path="/tetro" ></Route>
      </Routes>

      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
