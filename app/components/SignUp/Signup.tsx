import "./Signup.scss";
import "bulma/css/bulma.css";
import { useState } from "react";
import { signUp } from "~/api";

export const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    password: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(form);
  };

  return (
    <div className="registration--block">
      <p className="title signIn--title">Реєстрація</p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Ім'я:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Прізвище:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Дата народження:</label>
          <div className="control">
            <input
              className="input"
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Номер телефону:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Пароль:</label>
          <div className="control">
            <input
              className="input"
              // type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Пошта:</label>
          <div className="control">
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field field-center">
          <p className="control">
            <button className="button is-success" type="submit">
              Зареєструватися
            </button>
          </p>

          <h6 className="text--addText text--small">В мене ще немає профілю</h6>
        </div>
      </form>
    </div>
  );
};

export default Signup;
