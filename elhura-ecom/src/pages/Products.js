import React, {Component} from 'react';
import {AppBar, Toolbar, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

class Products extends Component {
    constructor() {
        super();
    }

    render() {
        const { classes } = this.props
        return (
            <div className='products'>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar>
                        <Typography className={classes.name} variant="h6">
                            Elhura
                        </Typography>
                        <Link to={"/tutorials"} className={classes.link}>
                            <Typography variant="body2">
                                Tutorials
                            </Typography>
                        </Link>
                        <Link to={"/add"} className={classes.link}>
                            <Typography variant="body2">
                                Add
                            </Typography>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Products;