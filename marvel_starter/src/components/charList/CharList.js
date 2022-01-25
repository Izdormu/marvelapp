
import {Component} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 0,
        charEnded: false,
        activeItem: null,
        
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })

    }

    onCharListLoaded = (newCharList) => {
        let ended = this.marvelService._totalCharacters - this.state.offset <= 9;



        this.setState(({charList,offset}) => ({
            charList: [...charList,...newCharList ],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    
    
    
    
    }
    handleClick = id => {
        this.setState({activeItem : id})
        console.log("click")
    }
    
    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        
        
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpgb') {
                imgStyle = {'objectFit' : 'unset'};
            }
            const {activeItem} = this.state
            const active = item.id === activeItem
            const clazz = active ? "char__item char__item_selected": "char__item"
            
            console.log(activeItem)
            
            return (
                <li 
                    tabIndex= {0}
                    key={item.id}
                    onClick={() => {this.props.onCharSelected(item.id);this.handleClick(item.id)}}
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

    render() {

        const {charList, loading, error,offset,newItemLoading,charEnded,activeItem} = this.state;
        
        const items = this.renderItems(charList,activeItem);

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
                onClick={() => this.onRequest(offset)}
                >

                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}
//надо имортировать
// CharList.propTypes = {
//     onCharSelected: PropTypes.func.isRequired
// }

export default CharList;