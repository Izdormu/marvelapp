import './singleComic.scss';
import xMen from '../../../resources/img/x-men.png';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';



const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState();
    const { loading, error, getComic, clearError } = useMarvelService();

    const updateChar = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }

    useEffect(() => {
        updateChar();
    }, [comicId])

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const ComicWrapper = ({ comic }) => {
        const { title, description, thumbnail, pageCount, price } = comic;
        let imgStyle = { 'objectFit': 'cover' };
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = { 'objectFit': 'contain' };
        }

        return (
            <div className='single-comic'>
                <img src={thumbnail} alt={title} className="single-comic__img" style={imgStyle} />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount} pages</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        )
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic) ? <ComicWrapper comic={comic} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SingleComicPage;