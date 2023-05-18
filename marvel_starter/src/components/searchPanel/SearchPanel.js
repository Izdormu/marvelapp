import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './searchPanel.scss';

const SearchPanel = () => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacterByName, clearError } = useMarvelService();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onCharLoaded = (char) => {
    setChar(char);
  }

  const updateChar = async (data) => {
    const name = data.name;
    clearError();
    getCharacterByName(name).then(onCharLoaded);
  }

  const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;

  const result = !char ? null : char.length > 0 ?
    <div className="char__search-wrapper">
      <div className="char__search-success">There is! Visit {char[0].name} page?</div>
      <Link to={`/characters/${char[0].id}`} className="button button__secondary">
        <div className='inner'>To Page</div>
      </Link>
    </div> :
    <div className="char__search-error">There is no character with this name</div>

  return (
    <div className="char__search-form">
      <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
      <form className="char__search-wrapper" onSubmit={handleSubmit(updateChar)}>
        <input {...register("name", { required: true })} placeholder="Type name here" />
        <button type="submit" className="button button__main"
          disabled={loading}>
          <div className='inner'>Find</div>
        </button>
      </form>
      {result}
      {errorMessage}
    </div>
  )
}

export default SearchPanel;