import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

/**
 * Can be created outside of the main component of this js file.
 * All nececssary values of hte method will be supplied to it.
 * @param {*} state 
 * @param {*} action 
 * @returns 
 */

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return ({
        value: action.val, 
        isValid: action.val.includes('@')
      });
  }
  if (action.type === 'INPUT_BLUR') {
    return ({
        value: state.value, 
        isValid: state.value.includes('@')
      });
  }
  return (
    {
      value: '', 
      isValid: false
    }
  );
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return ({
        value: action.val, 
        isValid: action.val.trim().length > 6
      });
  }
  if (action.type === 'INPUT_BLUR') {
    return ({
        value: state.value, 
        isValid: state.value.trim().length > 6
      });
  }
  return (
    {
      value: '', 
      isValid: false
    }
  );
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, disptachEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, disptachPassword] = useReducer(passwordReducer, {value: '', isValid: null});
  const context = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return(() => {
      console.log('EFFECT CLEANUP');
    });
  }, []);

  //alias assignment:  the isValid value of the emailState object will be reassigned a name of emailIsValid
  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  useEffect(() => {
    console.log('checking form validity...')
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return (() => {
      console.log('CLEANUP'); 
      clearTimeout(identifier); 
    });
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    disptachEmail({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      passwordState.isValid && event.target.value.includes('@')
    );
  };

  const passwordChangeHandler = (event) => {
    disptachPassword({type: 'USER_INPUT', val: event.target.value});

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    );
  };

  const validateEmailHandler = () => {
    disptachEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    disptachPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      context.onLogIn(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus(); 
    }
  };

  // <Button type="submit" className={classes.btn} disabled={!formIsValid}></Button>
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id="email" ref={emailInputRef} isValid={emailIsValid} type="email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} label="Email"/>
        <Input id="password" ref={passwordInputRef} isValid={passwordIsValid} type="password" value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} label="Password"/>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
