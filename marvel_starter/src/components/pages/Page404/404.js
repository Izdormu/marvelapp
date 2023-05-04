import { Link } from "react-router-dom";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import './404.scss';

const Page404 = () => {
  return (
    <div className="page404">
      <ErrorMessage />
      <p className="page404__text">Page not found</p>
      <Link className="page404__link" to="/">Go to main page</Link>
    </div>
  )
}

export default Page404;