import './SignIn.scss';
import '../../styles/text.scss';
import 'bulma/css/bulma.css';

import { useState } from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export const SignIn = ({ isOpen, onClose }: Props) => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.email.trim() || !form.password.trim()) {
            alert('Заповніть всі поля');
            return;
        }

        try {
            setLoading(true);

            const response = await fetch('http://localhost:5141/Auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                alert('Невірний email або пароль');
                return;
            }

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            alert('Успішний вхід!');
            onClose(); // закриваємо модалку після логіну
        } catch (error) {
            console.error(error);
            alert('Помилка зʼєднання із сервером');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <p className="title signIn--title">Вхід</p>

                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">Пошта:</label>
                        <input
                            className="input"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field">
                        <label className="label">Пароль:</label>
                        <input
                            className="input"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="buttons">
                        <button
                            className={`button is-success ${
                                loading ? 'is-loading' : ''
                            }`}
                            type="submit"
                            disabled={loading}
                        >
                            Ввійти
                        </button>

                        <button
                            className="button is-light"
                            type="button"
                            onClick={onClose}
                        >
                            Закрити
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;