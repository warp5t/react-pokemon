import './App.css'
import {Header} from './components/Header'
import { PokemonsContainer,PaginationPoke } from './components/Pokemons'

function App() {
  return (
    <div className='wrapRoot'>
    <Header />
    <PokemonsContainer />
    <PaginationPoke />
    </div>
  )
}

export default App
