import "./Signin.scss";
import "../../styles/text.scss";
import "bulma/css/bulma.css";

import { useState } from "react";
import { signIn } from "~/api";
import { Link } from "react-router";
import { useNavigate } from "react-router";

export const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      alert("Заповніть всі поля");
      return;
    }

    try {
      setLoading(true);
      await signIn(form);
      navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
            className={`button is-success ${loading ? "is-loading" : ""}`}
            type="submit"
            disabled={loading}
          >
            Ввійти
          </button>
        </div>

        <span className="text--addText text--small">
          <Link to="/signup">В мене вже є профіль</Link>
        </span>
      </form>
    </div>
  );
};

export default Signin;
