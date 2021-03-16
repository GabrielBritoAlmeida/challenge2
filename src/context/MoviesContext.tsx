import { createContext, ReactNode, useEffect, useState } from "react";

interface MovieProviderProps {
  children: ReactNode;
}

export interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MovieContextData {
  genres: GenreResponseProps[];
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
}

import { api } from "../services/api";

export const MoviesContext = createContext({} as MovieContextData);

export function MoviesContextProvider({ children }: MovieProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <MoviesContext.Provider
      value={{
        genres,
        handleClickButton,
        selectedGenreId,
        selectedGenre,
        movies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
