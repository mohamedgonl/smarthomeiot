/* eslint-disable jsx-a11y/anchor-is-valid */
import { authApi } from 'api/authApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'store/hooks';
import './css/main.css';
import './css/util.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [_, dispatch] = useStore();

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      authApi.login(username, password).then((res) => {
        dispatch({ type: 'LOGIN', payload: res.accountId });
        navigate('/');
      });
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form validate-form" onSubmit={handleLogin}>
            <span className="login100-form-title p-b-43">Login to continue</span>

            <div className="wrap-input100 validate-input">
              <input
                className={'input100' + (username ? ' has-val' : '')}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="label-input100">Username</span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input
                className={'input100' + (password ? ' has-val' : '')}
                type="password"
                name="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="label-input100">Password</span>
            </div>

            <div className="flex-sb-m w-full p-t-3 p-b-32">
              <div className="contact100-form-checkbox">
                <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                <label className="label-checkbox100" htmlFor="ckb1">
                  Remember me
                </label>
              </div>

              <div>
                <a href="#" className="txt1">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Login
              </button>
            </div>
          </form>

          <div
            className="login100-more"
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/bg-01.jpg'})` }}
          />
        </div>
      </div>
    </div>
  );
};
