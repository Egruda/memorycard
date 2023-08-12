import { useState } from 'react'
import Card from './card';
import '../styles/App.css';



function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h1> Memory Card <span>PokeGame</span> </h1>
      <p>Do not click on the same picture to get more points!</p>
      <Card highScore={highScore} currentScore={currentScore} setHighScore={setHighScore} setCurrentScore={setCurrentScore}/>
      <div className='points'>
        <p>High Score: {highScore}</p>
        <p>Current Score: {currentScore}</p>
      </div>

    </>
  )
}

export default App
