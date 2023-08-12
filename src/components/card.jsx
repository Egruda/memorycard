import { useState } from "react";
import { useEffect } from "react";
import '../styles/card.css';

function Card({currentScore, highScore, setCurrentScore, setHighScore}) {
    
    const [chosen, setChosen] = useState([]);
    const [images, setImages] = useState([]);
    
   

    

    
    useEffect(() => {
      const arr = [];
      while (arr.length < 5) {
        const r = Math.floor(Math.random() * 150) + 1;
        if(arr.indexOf(r) === -1) arr.push(r);
        if(arr.length === 5 && arr.every(number => chosen.includes(number))) arr.splice(Math.floor(Math.random() * 4), 1);
      }
      
      async function getImage () {
        let imageList = [];
        for(let i = 0; i < 5; i++) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${arr[i]}/`);
          
          const data = await response.json();
          const img = data.sprites.front_default;
          
          let name = data.name;
          name = name[0].toUpperCase() + name.slice(1);
          const list = {id: arr[i], name: name, imgURL: img};
          imageList = [...imageList, list];
        }
        setImages(imageList);
    }
  getImage()}, [chosen])
  
    function onClick(e) {
      if(chosen.includes(e.target.dataset.img)) {
        setHighScore(currentScore > highScore? currentScore : highScore); 
        setCurrentScore(0);
        setChosen([]);
      } else {
        setCurrentScore(currentScore+1);
        setHighScore(currentScore+1 > highScore? currentScore + 1 : highScore);
        setChosen([...chosen, e.target.dataset.img]);
      }
    }

    return (
     <div className='cards'>
     
      {images.map(img=> 
        <div key={img.id} className='card'>
        <button type='button' onClick={onClick}>
          <img data-img={img.id} src={img.imgURL} />
        </button>
          <p>{img.name}</p>
        </div>)}
      </div>

    )
}

export default Card;