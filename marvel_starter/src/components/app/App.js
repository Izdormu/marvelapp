import AppHeader from "../appHeader/AppHeader";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage, ComicsPage, Page404, SinglePage } from '../pages';
import SingleComicLayout from '../pages/SinglePage/SingleComicLayout/SingleComicLayout';
import SingleCharacterLayout from '../pages/SinglePage/SingleCharacterLayout/SingleCharacterLayout';


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path="/comics/:comicId" element={<SinglePage Component={SingleComicLayout} dataType="comic" />} />
                        <Route exact path="/characters/:id" element={<SinglePage Component={SingleCharacterLayout} dataType='character' />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </Router >
    )
}

export default App;