import { FormEvent, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';

const EMAIL_PATTERN = /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]$/;
const PASSWORD_PATTERN = /([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*/;

function getErrorMessage(inputId: string): string {
  if (inputId === 'user-email') {
    return 'Please enter a valid email address';
  }
  if (inputId === 'user-password') {
    return 'Please enter a valid password';
  }
  return '';
}

export default function SignInScreen(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      if (!EMAIL_PATTERN.test(emailRef.current?.value)) {
        setError('user-email');
        return;
      }

      if (!PASSWORD_PATTERN.test(passwordRef.current?.value)) {
        setError('user-password');
        return;
      }

      onSubmit({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="user-page">
      <Helmet>
        <title>WTW: Sign In</title>
      </Helmet>
      <Header headerClass='user-page__head'>
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__message">
            <p>{ getErrorMessage(error) }</p>
          </div>
          <div className="sign-in__fields">
            <div className={`sign-in__field ${error === 'user-email' ? 'sign-in__field--error' : ''}`}>
              <input ref={emailRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={`sign-in__field ${error === 'user-email' ? 'sign-in__field--error' : ''}`}>
              <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
