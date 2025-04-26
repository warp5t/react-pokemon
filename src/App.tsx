import './App.css';
import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { CompareScreen } from './screens/comparison/pokeCompareScreen';
import { FavoritePokes } from './screens/favorites/pokeFavoriteScreen';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/favorites' element={<FavoritePokes />} />
        <Route path='/comparison' element={<CompareScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

/*
import './App.css';
import { Header } from './components/Header';
import { PokemonsContainer, PaginationPoke } from './components/Pokemons';

function App() {
  return (
    <div className='wrapRoot'>
      <Header />
      <PokemonsContainer />
      <PaginationPoke />
    </div>
  );
}

export default App;
*/
