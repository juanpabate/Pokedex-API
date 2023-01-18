import { useEffect, useState } from 'react'
import './App.css'
import Button from './components/Button'
import Card from './components/Card'
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

function App() {

  const [pokemonId, setPokemonId]= useState(1);
  const [cadena, setCadena]= useState([]);

  const lastPokemon = ()=>{
    if(pokemonId=== 1){
      setPokemonId(1);
    }else{
      setPokemonId(pokemonId - 1);
    }
  }

  const nextPokemon= ()=>{
    setPokemonId(pokemonId + 1);
  }

  useEffect(()=>{
    PokemonChain(pokemonId);
  }, [pokemonId]);

  const PokemonChain= async(id)=>{
    let request= await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
    let pokemonData= await request.json();

    let pokeArray=[];

    let lvl1Name= pokemonData.chain.species.name;
    let lvl1Image= await pokemonImage(lvl1Name);

    pokeArray.push([lvl1Name, lvl1Image]);

    if(pokemonData.chain.evolves_to.length !== 0){
      let lvl2Name= pokemonData.chain.evolves_to[0].species.name;
      let lvl2Image= await pokemonImage(lvl2Name);
      pokeArray.push([lvl2Name, lvl2Image]);

      if(pokemonData.chain.evolves_to[0].evolves_to.length !== 0){
        let lvl3Name= pokemonData.chain.evolves_to[0].evolves_to[0].species.name;
        let lvl3Image= await pokemonImage(lvl3Name);
        pokeArray.push([lvl3Name, lvl3Image]);
        console.log(pokeArray);
      }
    }
    setCadena(pokeArray);
  }

  const pokemonImage= async(name)=>{
    let request= await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    let data= await request.json();
    let image= await data.sprites.other['official-artwork'].front_default;
    return image;
  }

  return (
    <div className="App">
      <div className='background-container'></div>
      <img src="../public/logo.png" alt="" className='logo'/>
      <div className={`cards-container element${cadena.length}`}>
        {cadena.map(pokemon =>
          <Card 
          key= {pokemon[0]}
          name={pokemon[0]}
          img={pokemon[1]}
          attack={pokemonId}
          defense={pokemonId}/>
        )}
      </div>
      <div className='buttons-container'>
        <Button handleClick= {lastPokemon}> <AiFillCaretLeft /> </Button>
        <Button handleClick= {nextPokemon}> <AiFillCaretRight /> </Button>
      </div>
    </div>
  )
}

export default App
