import './SignIn.scss'
import '../../styles/text.scss'
import 'bulma/css/bulma.css'
import { useState } from "react";

export const SignIn = () => {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5141/Auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Login error:", error);
                alert("Невірний email або пароль");
                return;
            }

            let data = null;

            const text = await response.text();
            if (text) {
                data = JSON.parse(text);
            }

            console.log("LOGIN SUCCESS:", data);
            console.log("LOGIN SUCCESS:", data);

            alert("Успішний вхід!");

            // TODO: тут потім буде JWT
            // localStorage.setItem("token", data.token);

        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <div className="signIn--block">
            <p className="title signIn--title">Вхід</p>

            <form onSubmit={handleSubmit}>

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

                <div className="field">
                    <label className="label">Пароль:</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="field field-center">
                    <p className="control">
                        <button className="button is-success" type="submit">
                            Ввійти
                        </button>
                    </p>

                    <h6 className="text--addText text--small">
                        В мене ще немає профілю
                    </h6>
                </div>

            </form>
        </div>
    );
};

export default SignIn;