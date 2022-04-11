import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";


import './charSearchForm.scss';

const CharSearchForm = ()=> {

    const [char,setChar] = useState(null)
    const{loading,error,getCharacterByName,clearError} =useMarvelService();


    const onCharLoaded = (char) => {
        setChar(char)
    }

    const updateChar = (name) => {

        clearError();

        getCharacterByName(name)
            .then(onCharLoaded)

    }
    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
        <div className = "char__search-wrapper">
            <div className= "char__search-success">
                There is! Visit {char[0].name} page?
            </div>
            <Link to ={`/characters/${char[0].id}`} className="button button__secondary"><div className="inner">To page</div>
            </Link>
        </div>:
          <div className="char__search-error">
          The character was not found. Check the name and try again
      </div>;
console.log("work")
    return(
        <div className = "char__search-form">
          <Formik
       initialValues={{
           charName : ""
       }}
       validationSchema = {Yup.object({
        charName: Yup.string().required('This field is required')
       })}
       onSubmit={({charName}) => {
         updateChar(charName);
       }}
     >
      
         <Form>
            <label className ="char__search-label" htmlFor="charName">Or find a character by name</label>
            <div className="char__search-wrapper">
           <Field type="charName" name="charName" type= "text"
           placeholder= "Enter name"/>
            <button className="button button__main" type="submit" disabled={loading} >
             <div className="inner">find</div>
           </button>
           </div>
           <FormikErrorMessage name="charName" component="div" className = "char__search-error"/>
           
         </Form>
       
     </Formik>  
     {results}
    {errorMessage}

        </div>
    )

    
}

export default CharSearchForm