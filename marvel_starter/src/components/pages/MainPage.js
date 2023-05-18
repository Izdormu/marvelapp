import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchPanel from "../searchPanel/SearchPanel";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { useState } from "react";
import decoration from '../../resources/img/vision.png';
import { motion } from "framer-motion";


const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState();

  const onCharSelected = (id) => {
    setSelectedChar(id);
  }
  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <SearchPanel />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  )
}

export default MainPage;