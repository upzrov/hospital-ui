import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { signUp } from '~/api';
import { ErrorNotification } from '~/components/ErrorNotification';
import { useError } from '~/hooks/useError';
import '~/styles/routes/Signup.scss';

export const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    fullName: '',
    dateOfBirth: '',
    phoneNumber: '',
    password: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { error, handleError, clearError } = useError();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signUp(form);
      navigate('/signin');
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
        <h1 className="auth-title">Реєстрація</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-grid">
            <div className="auth-field">
              <label>Ім'я</label>
              <input
                type="text"
                name="name"
                placeholder="Іван"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <label>Прізвище</label>
              <input
                type="text"
                name="fullName"
                placeholder="Іванов"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <label>Дата народження</label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <label>Номер телефону</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="+380..."
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

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
          </div>

          <button
            className={`auth-submit-btn ${loading ? 'loading' : ''}`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Реєстрація...' : 'Зареєструватися'}
          </button>

          <div className="auth-footer">
            <span className="auth-footer-text">Вже маєте профіль?</span>
            <Link to="/signin" className="auth-link">
              Увійти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
