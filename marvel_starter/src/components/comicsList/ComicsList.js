import './comicsList.scss';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();


    useEffect(() => {
        onRequest(offset, true);
    }, [])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        console.log(offset);
        setComicsEnded(comicsEnded => ended);
    }


    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            return (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <li className="comics__item" key={i}>
                        <Link to={`/comics/${item.id}`} >
                            <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                </motion.div>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    const items = renderItems(comicsList);
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;