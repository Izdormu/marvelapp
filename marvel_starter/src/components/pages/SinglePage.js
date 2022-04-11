import { useParams,Link } from 'react-router-dom';

import { useState,useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';


const SinglePage = ({Component,dataType}) => {

    const {id} = useParams();
    const [data,setData] = useState(null)
    const{loading,error,getComic,getCharacter,clearError } = useMarvelService();

    useEffect(() => {
        updateData()
    },[id])

    // componentDidUpdate(prevProps){
    //     if (this.props.charId !== prevProps.charId) {
    //         this.updateChar();
    //     }
    // }

    


  const  updateData = () => {
            clearError()

            switch (dataType) {
                case 'comic':
                    getComic(id)
                    .then(onDataLoaded)
                    break;
                case 'character':
                    getCharacter(id)
                    .then(onDataLoaded)
            }
            
            
    }



    const onDataLoaded = (data) => {
    
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
       <>
        <AppBanner/>
        {errorMessage}
        {spinner}
        {content}
       </> )
}

// const View =({comic}) => {

//     const{title,description,pageCount,thumbnail,language,price} = comic;

//     return (
//         <>
//         <AppBanner></AppBanner>
//         <div className="single-comic">
//             <img src={thumbnail} alt={title}className="single-comic__img"/>
//             <div className="single-comic__info">
//                 <h2 className="single-comic__name">{title}</h2>
//                 <p className="single-comic__descr">{description}</p>
//                 <p className="single-comic__descr">{pageCount}</p>
//                 <p className="single-comic__descr">Language: {language}</p>
//                 <div className="single-comic__price">{price}</div>
//             </div>
//             <Link to= "/comics" className="single-comic__back">Back to all</Link>
//         </div>
//         </>
//     )

// }

export default SinglePage;