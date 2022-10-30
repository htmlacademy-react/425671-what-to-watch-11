import { Link } from 'react-router-dom';

type HeaderProps = {
  headerClass?: string;
  children?: React.ReactNode;
}

export default function Header({children, headerClass}: HeaderProps ): JSX.Element {
  return (
    <header className={`page-header${headerClass ? ` ${headerClass}` : ''}`}>
      <div className="logo">
        <Link to="/" className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      { children }
    </header>
  );
}
