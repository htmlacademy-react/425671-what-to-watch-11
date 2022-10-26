import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Header from '../../components/header';

export default function NotFoundScreen(): JSX.Element {
  return (
    <div className="user-page">
      <Helmet>
        <title>WTW: 404. Page not found</title>
      </Helmet>
      <Header headerClass='user-page__head' />

      <div className="user-page__content" style={{margin: '0 auto', maxWidth: '480px', textAlign: 'center'}}>
        <h1>404<br/><br/>Page not found :(</h1>
        <Link to="/" className='user-block__link'>Go to main page</Link>
      </div>

      <Footer />
    </div>
  );
}
