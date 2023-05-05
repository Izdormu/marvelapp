import { Link } from "react-router-dom";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import './404.scss';
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  const handleGoBackClick = () => {
    navigate(-1);
  }
  return (
    <div className="page404">
      <ErrorMessage />
      <p className="page404__text">Page not found</p>
      <button className="page404__link" onClick={handleGoBackClick}>Go back</button>
      <p className="page404__text">or</p>
      <Link className="page404__link" to="/">Go to main page</Link>
    </div>
  )
}

export default Page404;