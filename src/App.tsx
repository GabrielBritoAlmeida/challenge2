import "./styles/global.scss";
import "./styles/sidebar.scss";
import "./styles/content.scss";
import { AppTemplate } from "./templates/AppTemplate";
import { MoviesContextProvider } from "./context/MoviesContext";

export function App() {
  return (
    <MoviesContextProvider>
      <AppTemplate />
    </MoviesContextProvider>
  );
}
