import { useState } from 'react'
import { useEffect } from 'react';
import Card from './card';




function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [images, setImages] = useState([]);
  const [chosenImages, setChosenImages] = useState([]);
  const chosen = [];

  useEffect(() => {
    const fetch = async () => {
      for(let i =1; i < 151; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`, {mode: 'cors'});
      const data = await response.json();
      const img = data.sprites.front_default;
      let name = data.name;
      name = name[0].toUpperCase() + name[1];
      setImages([...images, {id: i, name: name, img: img}])
      }}
    fetch();
  }, [images]);

  function randomCards() {
    const arr = [];
    while (arr.length < 5) {
      const r = Math.floor(Math.random() * 150) + 1;
      if(arr.indexOf(r) === -1) arr.push(r);
      if(arr.length === 5 && arr.every(number => chosen.includes(number))) arr.splice(Math.floor(Math.random() * 4), 1);
    }
    arr.map(number => {
      setChosenImages([...chosenImages, {id: images[number-1].id, name: images[number-1].id, img: images[number-1].id}]);
    })
  }

  return (
    <>
      <h1> Memory Card PokeGame </h1>
      <p>Do not click on the same picture to get more points!</p>
      <Card randomCards={randomCards} setHighScore={setHighScore} setCurrentScore={setCurrentScore}/>
      <div className='points'>
        <p>High Score: {highScore}</p>
        <p>Current Score: {currentScore}</p>
      </div>

    </>
  )
}

export default App
