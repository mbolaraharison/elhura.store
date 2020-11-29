import React, { Component } from "react";
import {Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {register} from "./RegistrationStyles";

class ButtonsAs extends Component {
    render() {
        let { classes } = this.props;
        return (
            <React.Fragment>
                <Button
                    disabled={!this.props.registration.isValid()}
                    disableRipple
                    fullWidth
                    variant="outlined"
                    className={`${classes.buttonJoin} ${classes.button}`}
                    type="submit"
                    onClick={this.props.registration.loadRegistrationFormCustomer({customer:true, company:false, admin:false})}
                >
                    As customer
                </Button>
                <Button
                    disabled={!this.props.registration.isValid()}
                    disableRipple
                    fullWidth
                    variant="outlined"
                    className={`${classes.buttonAs} ${classes.button}`}
                    type="submit"
                    onClick={this.props.registration.loadRegistrationFormCustomer({customer:false, company:true, admin:false})}
                >
                    As seller company
                </Button>
                <Button
                    disabled={!this.props.registration.isValid()}
                    disableRipple
                    fullWidth
                    variant="outlined"
                    className={`${classes.buttonAs} ${classes.button}`}
                    type="submit"
                    onClick={this.props.registration.loadRegistrationFormCustomer({customer:false, company:false, admin:true})}
                >
                    As admin
                </Button>
            </React.Fragment>
        );
    }
}

export default withStyles(register)(ButtonsAs);