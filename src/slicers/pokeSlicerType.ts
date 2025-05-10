export interface PokeResults {
  data: DataPoke;
  isLoading: boolean;
  error: string | null;
}

interface InfoPoke {
  name: string;
  url: string;
}

interface DataPoke {
  count: number;
  next: string | null;
  previous: null | string;
  results: InfoPoke[];
  currentPage: number;
}

export const initialState: PokeResults = {
  data: {
    count: 0,
    next: null,
    previous: null,
    results: [],
    currentPage: 1,
  },
  isLoading: false,
  error: null,
};