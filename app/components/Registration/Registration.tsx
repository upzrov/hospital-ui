import './Registration.scss'
import 'bulma/css/bulma.css'

export const Registration = () => {
    return (
        <div className="registration--block">
            <p className="title signIn--title">Реєстрація</p>
            <div className="field">
                <label className="label">ПІБ:</label>
                <div className="control">
                    <input className="input" type="text" placeholder=""/>
                </div>
            </div>
            <div className="field">
                <label className="label">Номер телефона:</label>
                <div className="control">
                    <input className="input" type="text" placeholder=""/>
                </div>
            </div>
            <div className="field">
                <label className="label">Пароль:</label>
                <div className="control">
                    <input className="input" type="text" placeholder=""/>
                </div>
            </div>
            <div className="field field-center">
                <p className="control">
                    <button className="button is-success">
                        Зареєструватися
                    </button>
                </p>
                <h6 className="text--addText text--small">В мене ще немає профілю</h6>
            </div>
        </div>
    )
}

export default Registration