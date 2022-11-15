import Header from '../header/header';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import UserBlock from '../user-block/user-block';


export default function FilmPromo(): JSX.Element {
  return (
    <section className="film-card">
      <div className="film-card__bg">
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header headerClass="film-card__head">
        <UserBlock />
      </Header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          >
            <LoadingSpinner />
          </div>
          <div style={{
            flexGrow: '1',
            alignSelf: 'center'
          }}
          >
            <LoadingSpinner />
          </div>
        </div>
      </div>
    </section>
  );
}
