import './App.css'
import {Header} from './components/Header'
import { PokemonsContainer } from './components/Pokemons'

function App() {
  return (
    <div className='wrapRoot'>
    <Header />
    <PokemonsContainer />
    </div>
  )
}

export default App
