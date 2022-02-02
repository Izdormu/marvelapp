
import {useState,useEffect,useRef} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

    const [charList,setCharList] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [newItemLoading,setNewItemLoading] = useState(false);
    const [offset,setOffset] = useState(0);
    const [charEnded,setCharEnded] = useState(false);
    const [activeItem,setActiveItem] = useState(null);
    
    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    },[])
    // componentDidMount() {
    //     this.onRequest();
    // }

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = marvelService._totalCharacters -offset <= 9;



        // this.setState(({charList,offset}) => ({
        //     charList: [...charList,...newCharList ],
        //     loading: false,
        //     newItemLoading: false,
        //     offset: offset + 9,
        //     charEnded: ended
        // }))

        setCharList(charList => [...charList,...newCharList ]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);


    }

   const onError = () => {
       setError(true);
       setLoading(false);

    
    
    
    
    }
   const handleClick = id => {
       setActiveItem(activeItem => id)
        console.log("click")
    }

    
    
    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
   function renderItems(arr) {
        
        
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpgb') {
                imgStyle = {'objectFit' : 'unset'};
            }
            // const {activeItem} = this.state.activeItem
            const active = item.id === activeItem
            const clazz = active ? "char__item char__item_selected": "char__item"
            
            console.log(activeItem)
            
            return (
                <li 
                    tabIndex= {0}
                    key={item.id}
                    onClick={() => {props.onCharSelected(item.id);handleClick(item.id)}}
                    className={clazz}
                    >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
                 
            )
            
        });
        
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )

      
    }

    

        // const {charList, loading, error,offset,newItemLoading,charEnded,activeItem} = this.state;
        
        const items = renderItems(charList,activeItem);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long"
                disabled = {newItemLoading}
                style = {{"display" : charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
                >

                    <div className="inner">load more</div>
                </button>
            </div>
        )
    
}
//надо имортировать
// CharList.propTypes = {
//     onCharSelected: PropTypes.func.isRequired
// }

export default CharList;