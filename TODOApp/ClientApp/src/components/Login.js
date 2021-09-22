import React, { Component } from 'react';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamname: {
                value: "",
                error: "Pune la dispoziție un numele echipei"
            },
            password: {
                value: "",
                error: "Completează parola pentru acest cont"
            },
            captainEmail: {
                value: "",
                error: "Pune la dispoziție o adresă de email"
            },
            displayResetBox: false,
            loginError: "",
            resetError: ""
        };
        this.resetSuccess = this.resetSuccess.bind(this);
        this.resetFailure = this.resetFailure.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleResetSubmit = this.handleResetSubmit.bind(this);
        this.toggleDisplayResetBox = this.toggleDisplayResetBox.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateTeamname = this.validateTeamname.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateCaptainEmail = this.validateCaptainEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loginToServer = this.loginToServer.bind(this);
        this.setSubmissionSuccess = this.setSubmissionSuccess.bind(this);
        this.setSubmissionFail = this.setSubmissionFail.bind(this);
        this.redirectToHome = this.redirectToHome.bind(this);
        this.redirectToRegister = this.redirectToRegister.bind(this);

        this.showLoading = this.showLoading.bind(this);
        this.showFailedLogin = this.showFailedLogin.bind(this);
        this.showFailedReset = this.showFailedReset.bind(this);
        this.showSuccesfulLogin = this.showSuccesfulLogin.bind(this);
        this.showSuccesfulReset = this.showSuccesfulReset.bind(this);
        this.hideAllTexts = this.hideAllTexts.bind(this);
    }

    handleLoginSubmit = function () {
        const errors = this.validateLogin();
        if (errors.length === 0) {
            this.loginToServer();
        } else {
            alert(errors[0]);
        }
    }

    handleResetSubmit = function () {
        let errors = [this.validateCaptainEmail()];
        errors = errors.filter(e => e.length > 0);
        if (errors.length === 0) {
            this.showLoading();
            /* postResetSend({ captainEmail: this.state.captainEmail.value }, this.resetSuccess, this.resetFailure);*/
        } else {
            alert(errors[0]);
        }

    }

    resetSuccess = function (response) {
        this.showSuccesfulReset();
        setTimeout(function () { window.location.href = '/login'; }, 5000);
    }

    resetFailure = function (response) {
        //alert("Din pacate, nu s-a putut trimite mailul de resetare");
        //window.location.href = '/login';
        this.showFailedReset();
    }

    toggleDisplayResetBox = function () {
        this.hideAllTexts();
        this.setState({ displayResetBox: !this.state.displayResetBox });
    }

    validateCaptainEmail = function () {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let captainEmail = this.state.captainEmail.value;
        if (captainEmail) {
            captainEmail = captainEmail.trim()
            if (captainEmail === "") {
                return "Pune la dispoziție o adresă de email";
            }
            if (!re.test(String(captainEmail).toLowerCase())) {
                return "Pune la dispoziție o adresă de email validă";
            }
            return "";
        } else {
            return "Pune la dispoziție o adresă de email";
        }
    }

    validateTeamname = function (teamname) {
        if (teamname) {
            teamname = teamname.trim()
            if (teamname === "") {
                return this.state.teamname.error;
            }
            return "";
        } else {
            return this.state.teamname.error;
        }
    }

    validatePassword = function (password) {
        if (!password) {
            return this.state.password.error;
        }
        return "";
    }

    validateLogin = function () {
        let errors = [];
        errors.push(this.validateTeamname(this.state.teamname.value));
        errors.push(this.validatePassword(this.state.password.value));
        let filtErrors = errors.filter(e => e.length > 0);
        return filtErrors;
    }

    handleChange = input => e => {
        let newData = {
            value: e.target.value,
            error: this.state[input].error
        }
        this.setState({ [input]: newData });
    };

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.displayResetBox)
            this.handleResetSubmit();
        else
            this.handleLoginSubmit();

    }

    loginToServer = function () {
        let loginParams = {
            teamName: this.state.teamname.value,
            password: this.state.password.value
        };

        this.showLoading();
        /*postLogin(loginParams, this.setSubmissionSuccess, this.setSubmissionFail);*/
    }

    setSubmissionSuccess = function (response) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        this.props.updatePersonalInfo();
        this.showSuccesfulLogin();
        this.redirectToHome();
    }

    redirectToHome() {
        setTimeout(() => {
            window.location.href = "/home";
        }, 1000);
    }

    redirectToRegister() {
        window.location.href = "/register";
    }

    setSubmissionFail = function (response) {
        this.showFailedLogin();
    }

    showLoading = function () {
        /* $("#login-loading-text").show();
         $("#login-successful-text").hide();
         $("#login-error-text").hide();
         $("#reset-error-text").hide();
         $("#reset-successful-text").hide();*/
    }

    showSuccesfulLogin = function () {
        /* $("#login-loading-text").hide();
         $("#login-successful-text").show();
         $("#login-error-text").hide();
         $("#reset-error-text").hide();
         $("#reset-successful-text").hide();*/
    }

    showFailedLogin = function () {
        /* $("#login-loading-text").hide();
         $("#login-successful-text").hide();
         $("#login-error-text").show();
         $("#reset-error-text").hide();
         $("#reset-successful-text").hide();*/
    }

    showSuccesfulReset = function () {
        /*$("#login-loading-text").hide();
        $("#login-successful-text").hide();
        $("#login-error-text").hide();
        $("#reset-error-text").hide();
        $("#reset-successful-text").show();*/
    }

    showFailedReset = function () {
        /* $("#login-loading-text").hide();
         $("#login-successful-text").hide();
         $("#login-error-text").hide();
         $("#reset-error-text").show();
         $("#reset-successful-text").hide();*/
    }

    hideAllTexts = function () {
        /*$("#login-loading-text").hide();
        $("#login-successful-text").hide();
        $("#login-error-text").hide();
        $("#reset-error-text").hide();
        $("#reset-successful-text").hide();*/
    }

    render() {

        return (
            <div className="loginContainer">


                <div className="infoContainer" >
                    <div className="leftContainer">
                        <form onSubmit={this.handleSubmit} className="formFields">
                            <div className="loginTitle">
                                {this.state.displayResetBox ? "Resetează parola" : "Login to HackITall"}
                            </div>

                            {!this.state.displayResetBox && <input
                                type="text"
                                name="teamName"
                                id="loginTag1"
                                placeholder="Nume echipă..."
                                value={this.state.teamname.value}
                                onChange={this.handleChange('teamname')}
                                className="form-input"
                                style={{ fontSize: "1.3rem", marginBottom: "30px" }}
                                required
                            />}
                            {!this.state.displayResetBox && <br />}
                            {!this.state.displayResetBox && <input
                                type="password"
                                name="password"
                                id="loginTag2"
                                placeholder="Parolă..."
                                value={this.state.password.value}
                                onChange={this.handleChange('password')}
                                className="form-input"
                                style={{ fontSize: "1.3rem" }}
                                required
                            />}
                            {this.state.displayResetBox && <input
                                type="text"
                                name="captainEmail"
                                placeholder="Email căpitan..."
                                value={this.state.captainEmail.value}
                                onChange={this.handleChange('captainEmail')}
                                className="form-input"
                                style={{ fontSize: "1.3rem" }}
                                required
                            />}
                            <br />
                            <p id="login-loading-text" style={{ color: "#2fa2db", display: "none" }}>Se trimite...</p>
                            <p id="login-successful-text" style={{ color: "#27c281", display: "none" }}>Success!</p>
                            <p id="login-error-text" style={{ color: "red", display: "none" }}>Login invalid</p>
                            <p id="reset-error-text" style={{ color: "red", display: "none" }}>Reset invalid</p>
                            <p id="reset-successful-text" style={{ color: "#27c281", display: "none" }}>A fost trimis un mail de reset!</p>

                            <button
                                type="submit"
                                className="loginButton"
                            > {this.state.displayResetBox ? "Trimite mail" : "Login"}
                            </button>

                            <br /><br />

                            <a id="forgotPass" style={{ cursor: "pointer" }} onClick={this.toggleDisplayResetBox}> {this.state.displayResetBox ? "Dorești să te loghezi?" : "Ți-ai uitat parola?"}</a>
                            <br />
                            <button
                                className="registerMobile"
                                href="#Home"
                            >Register
							</button>
                        </form>
                    </div>
                    <div className="rightContainer">
                        <div className="sideContainerLogin">
                            <p className="registerTitle">Nu te-ai înscris încă?</p>
                            <p className="registerText">Ia parte la cel mai tare hackathon la nivel de facultate</p>
                            <button
                                className="registerButton"
                            // onClick = {this.redirectToRegister}
                            >Register
						</button>
                            <div><br /></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
