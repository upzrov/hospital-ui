import '~/styles/routes/sign-in.scss';
import '~/styles/text.scss';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { signIn } from '~/api';
import { ErrorNotification } from '~/components/ErrorNotification';
import { useError } from '~/hooks/useError';

export const Signin = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const { error, handleError, clearError } = useError();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      handleError('Заповніть всі поля');
      return;
    }

    try {
      setLoading(true);
      await signIn(form);
      window.location.href = '/';
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <ErrorNotification message={error} onClose={clearError} />

      <div className="auth-card">
        <h1 className="auth-title">Вхід</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="vash@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className={`auth-submit-btn ${loading ? 'loading' : ''}`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Вхід...' : 'Увійти'}
          </button>

          <div className="auth-footer">
            <span className="auth-footer-text">В мене ще немає профілю?</span>
            <Link to="/signup" className="auth-link">
              Зареєструватися
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
