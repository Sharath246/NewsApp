import { Link } from 'react-router-dom';
import '../Styles/Error.css'
export default function Error() {
  return (
    <div className='main'>
      <div className="error-container">
        <div className="error-content">
          <h1>Oops! Something Went Wrong</h1>
          <p>
            We're sorry, but it seems there's an internal problem with the app.
            Please try again later or go back to the home page.
          </p>
          <div className="error-image"></div>
          <div className="button-group">
            <Link to="/" className="btn-home">
              Back to Home
            </Link>
            <button className="btn-retry" onclick={{}}>
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
