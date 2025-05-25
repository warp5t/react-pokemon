import { render, screen } from '@testing-library/react';
import { describe, vi, it, beforeEach, expect } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PokeDetailsScreen } from './pokeDetailsScreen';
import { useParams } from 'react-router-dom';
import '@testing-library/jest-dom';

// Мокаем react-router-dom
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

describe('PokeDetailsScreen - conditional rendering', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useParams).mockReturnValue({ pokemonName: 'pikachu' });
  });

  it('renders error message if error is true', () => {
    const errorStore = configureStore({
      reducer: {
        persistedReducer: () => ({
          pokeDetails: {
            isLoading: false,
            data: {},
            error: 'Some error',
          },
        }),
      },
    });

    render(
      <Provider store={errorStore}>
        <PokeDetailsScreen />
      </Provider>
    );
    expect(screen.getByText('Покемон не найден!')).toBeInTheDocument();
  });

  it('renders loading message if isLoading is true', () => {
    const loadingStore = configureStore({
      reducer: {
        persistedReducer: () => ({
          pokeDetails: {
            isLoading: true,
            data: {},
            error: null,
          },
        }),
      },
    });

    render(
      <Provider store={loadingStore}>
        <PokeDetailsScreen />
      </Provider>
    );
    expect(screen.getByText('Loading pokemon...')).toBeInTheDocument();
  });
});