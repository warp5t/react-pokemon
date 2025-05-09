import './App.css';
import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { CompareScreen } from './screens/comparison/pokeCompareScreen';
import { FavoritePokes } from './screens/favorites/pokeFavoriteScreen';
import { NotFoundPage } from './screens/notFound/NotFoundPage';
import { PokemonsContainer } from './components/Pokemons';
import { PokeDetailsScreen } from './screens/details/pokeDetailsScreen';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<PokemonsContainer />} />
        <Route path='/details/:pokemonName' element={<PokeDetailsScreen />} />
        <Route path='/favorites' element={<FavoritePokes />} />
        <Route path='/comparison' element={<CompareScreen />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
