import './PersonalAccountPage.scss'

import {Registration} from "~/components/Registration/Registration";
import {SignIn} from "~/components/SignIn/SignIn";

export default function ContactPage() {
    return (
        <div>
            <h1>ContactPage</h1>

            <div>
                <section className="section">
                    <div className="container">
                        <h1 className="title is-4 mb-5">Patient Information</h1>

                        <form>
                            <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Name</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="ex. John smith"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control">
                                            <input className="input" type="email"
                                                   placeholder="ex. john.smith@domain.com"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Date of Birth</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="ex. 12-02-2001"/></div>
                                    </div>
                                </div>
                            </div>

                            <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Address Line 1</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="ex. 6033 Collins Inlet"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Address Line 2</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="ex. 6033 Collins Inlet"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <label className="label">City</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="ex. West Gina"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">State</label>
                                        <div className="control">
                                            <input className="input" type="text"
                                                   placeholder="ex. New York"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Zipcode</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="ex. 70945"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <label className="label">How may we contact you:</label>
                                        <div className="control">
                                            <div className="select is-fullwidth"><select>
                                                <option>Select one</option>
                                            </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="columns">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Contact Info</label>
                                        <div className="control">
                                            <input className="input" type="text"
                                                   placeholder="ex. 278.268.6823 x36440"/></div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <label className="label">How did you hear about us</label>
                                        <div className="control">
                                            <div className="select is-fullwidth"><select>
                                                <option>Select one</option>
                                            </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Social Security Number</label>
                                        <div className="control">
                                            <input className="input" type="text"
                                                   placeholder="0 123 456 7890"/></div>
                                    </div>
                                </div>
                            </div>

                            <div className="field mt-4">
                                <div className="control">
                                    <button className="button is-link">Next</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>

            <div className="registration">
                <Registration/>
            </div>
            <div className="signIn">
                <SignIn/>
            </div>
        </div>
    )
}