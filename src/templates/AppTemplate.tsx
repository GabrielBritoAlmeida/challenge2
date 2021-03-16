import { useContext } from "react";
import { MoviesContext, GenreResponseProps } from "../context/MoviesContext";

import { MovieCard } from "../components/MovieCard";
import { SideBar } from "../components/SideBar";
import { Content } from "../components/Content";

export const AppTemplate: React.FC = () => {
  const {
    genres,
    handleClickButton,
    selectedGenreId,
    selectedGenre,
    movies,
  } = useContext(MoviesContext);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        genres={genres}
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId}
      />
      <Content selectedGenre={selectedGenre} movies={movies} />
    </div>
  );
};

export default AppTemplate;
