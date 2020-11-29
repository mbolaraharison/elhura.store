import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { register } from "./RegistrationStyles";

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import RegistrationForm from "./RegistrationForm";
import ButtonsAs from "./ButtonsAs";
import RegistrationFormCustomer from "./RegistrationFormCustomer";
import RegistrationFormCompany from "./RegistrationFormCompany";
import RegistrationFormAdmin from "./RegistrationFormAdmin";
import logo from "../../images/logo.jpg";

class Registration extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    hidePassword: true,
    error: null,
    errorOpen: false,
    showSignUpChoices: false,
    signUpChoices: {customer: false, company: false, admin: false},
    firstname: "",
    lastname: "",
    birthdate: "",
    birthplace: "",
    name: "",
    siret: "",
    documents: "",
    street: "",
    postalCode: "",
    city: "",
    region: "",
    country: ""
  };

  componentDidMount() {
  }

  errorClose = e => {
    this.setState({
      errorOpen: false
    });
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };

  passwordMatch = () => this.state.password === this.state.passwordConfirm;

  showPassword = () => {
    this.setState(prevState => ({ hidePassword: !prevState.hidePassword }));
  };

  isValid = () => {
    if (this.state.email === "" || this.state.password === "" || this.state.passwordConfirm === "") {
      return false;
    }
    return true;
  };

  isEmailValid = () => {
    if (/^([a-z0-9.]+@[a-z0-9]+\.[a-z0-9]+)$/.test(this.state.email)) {
      return true;
    }
    return false;
  }

  submitRegistration = e => {
    e.preventDefault();
    if (!this.isEmailValid()) {
      this.setState({
        errorOpen: true,
        error: "Invalid email"
      });
    }else{
      if (!this.passwordMatch()) {
        this.setState({
          errorOpen: true,
          error: "Passwords don't match"
        });
      }else{
        const newUserCredentials = {
          email: this.state.email,
          password: this.state.password,
          passwordConfirm: this.state.passwordConfirm,
          showSignUpChoices: true
        };
        this.setState(newUserCredentials);
        console.log("this.props.newUserCredentials", newUserCredentials);
      }
    }
    //dispath to userActions
  };

  completeRegistration =  e => {
    e.preventDefault();
    console.log(this.state);
  }

  loadRegistrationFormCustomer = choices => e => {
    // Here we request the back end to insert data (email, password) in db
    // We only update the state of the component if we have received a response from the back
    this.setState({signUpChoices:choices});
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <CssBaseline />

        <Paper className={classes.paper}>
          {<Avatar className={classes.avatar}>
            <img className={classes.logo} src={logo} alt="Logo" />
                      </Avatar>}
          <form
              className={classes.form}
              onSubmit={() => this.submitRegistration}
          >
            {
              !this.state.showSignUpChoices ?
                    <RegistrationForm registration={this}/>
                  :
                  <React.Fragment>
                    {!this.state.signUpChoices.customer ? null : <RegistrationFormCustomer registration={this}/>}
                    {!this.state.signUpChoices.company ? null : <RegistrationFormCompany registration={this}/>}
                    {!this.state.signUpChoices.admin ? null : <RegistrationFormAdmin registration={this}/>}
                    {(this.state.signUpChoices.customer || this.state.signUpChoices.company || this.state.signUpChoices.admin) ? null : <ButtonsAs registration={this}/>}
                  </React.Fragment>
            }
          </form>
          {this.state.error ? (
            <Snackbar
              variant="error"
              key={this.state.error}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              open={this.state.errorOpen}
              onClose={this.errorClose}
              autoHideDuration={3000}
            >
              <SnackbarContent
                className={classes.error}
                message={
                  <div>
                    <span style={{ marginRight: "8px" }}>
                      <ErrorIcon fontSize="large" color="error" />
                    </span>
                    <span> {this.state.error} </span>
                  </div>
                }
                action={[
                  <IconButton
                    key="close"
                    aria-label="close"
                    onClick={this.errorClose}
                  >
                    <CloseIcon color="error" />
                  </IconButton>
                ]}
              />
            </Snackbar>
          ) : null}
        </Paper>
      </div>
    );
  }
}

export default withStyles(register)(Registration);