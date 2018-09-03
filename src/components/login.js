import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/user_actions';
import { Field, reduxForm } from 'redux-form';
import { Paper, Button, TextField, Grid } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Lock from '@material-ui/icons/Lock';
import { translateError } from '../helpers/translations';
// import {
//     TextField,
//   } from 'redux-form-material-ui';

export class LoginForm extends Component {
	renderTextField({
		input,
		label,
		meta: { touched, error },
		...custom
	  }) {
      return (
        <div>
          <Grid container spacing={16} alignItems="flex-end">
            <Grid item xs={1}>
              { custom.type === "text" ?
                <AccountCircle />
                : custom.type === "password" ? <Lock /> : null
              }
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth={true}
                label={label}
                helperText={touched && error}
                error={touched && !!error}
                {...input}
                {...custom}
              />
            </Grid>
          </Grid>
        </div>
		)
	}

	onSubmit(values) {
		this.props.login(values);
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<Paper style={{
				width: '300px',
				margin: '0 auto',
				padding: '10px',
			}}>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Typography variant="subheading" color="inherit" noWrap align="center">
						ورود کاربر
					</Typography>
					<div style={{
						margin: '10px auto',
					}}>
						<Field
							fullWidth={true}
							name="username"
							component={this.renderTextField}
							type="text"
							label="نام کاربری"
							inputProps={{
								style: {
									direction: 'ltr',
								}
							}}
							required
						/>
					</div>
					<div style={{
						margin: '10px auto',
					}}>
						<Field
							fullWidth={true}
							name="password"
							component={this.renderTextField}
							type="password"
							label="رمز عبور"
							inputProps={{
								style: {
									direction: 'ltr',
								}
							}}
							required
							/>
					</div>
          <div>
            {!!this.props.auth.errorMessage && this.props.auth.errorMessage.non_field_errors.map((error, i) => {
              return(
                <li key={i}>
                  {translateError(error)}
                </li>
              );
            })}
          </div>
					<div>
						<Button
							fullWidth={true}
							disabled={this.props.auth.isAuthenticating}
							variant="contained"
							color="primary"
							type="submit"
							style={{
								marginTop: '10px'
							}}
							>
							{this.props.auth.isAuthenticating ? "در حال ورود" : "ورود"}
						</Button>
					</div>
				</form>
			</Paper>
		);
	}
}

function mapStateToProps({ auth }, ownProps) {
	return {auth};
}

function validate(values) {
	const errors = {}
	const requiredFields = [
	  'username',
	  'password',
	]
	requiredFields.forEach(field => {
	  if (!values[field]) {
		errors[field] = 'فیلد ضروری'
	  }
	})
	return errors
}

export default reduxForm({
	form: 'LoginForm',
	validate
  })(
	connect(mapStateToProps, { login })(LoginForm)
);