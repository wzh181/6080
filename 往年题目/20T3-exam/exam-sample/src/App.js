import React, { useEffect, useState } from "react";

import './App.css';

function App() {
  // Initialize with the current time to avoid an empty screen on first render
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // Set up the interval when the component mounts
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div>
      {time}
    </div>
  );
}

export default App;
