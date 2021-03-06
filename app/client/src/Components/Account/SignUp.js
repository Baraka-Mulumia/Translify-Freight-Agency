import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { AuthAPI } from "../../Api";
import { useDispatch } from "react-redux";
import { userSet } from "../../State/user.slice";
import Glitch from "../../Resources/Utils/error";
import {
  MdLockOutline,
  MdVisibility,
  MdVisibilityOff,
  MdAssignmentInd,
  MdPhone,
  MdEnhancedEncryption,
} from "react-icons/md";

import {
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  IconButton,
  InputAdornment,
} from "@material-ui/core";

import {
  Form,
  SubmitButton,
  FormPaper,
  FormAvatar,
  FormContainer,
} from "./elements";

import ValidationError, { RenderErrorMessage } from "../Error/Validation";
import ValidationPatterns from "../../Resources/Patterns/validation";
import LoadingComponent from "../LoadingComponent";

export default function SignUp({ route }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToasts();
  const [message, setMessage] = useState("");
  const { register, handleSubmit, errors } = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState("");

  const handleShowPassword = () => {
    setShowPassword((prevState) => {
      return !prevState;
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = () => {
    setMessage("");
  };
  const role = route;
  const onSubmit = (user) => {
    const { firstname, lastname, phoneno, username, password } = user;
    setIsLoading(true);
    AuthAPI.register(
      firstname,
      lastname,
      username,
      phoneno,
      password,
      role
    ).then(
      (response) => {
        const { UID, phoneno } = response.data;
        dispatch(
          userSet({
            UID,
            phoneno,
          })
        );
        setIsLoading(false);
        history.push(`/verify-account`);
      },
      (error) => {
        const resMessage = Glitch.message(error);
        if (error.response && error.response.status === 409) {
          setMessage(resMessage);
        }
        addToast(resMessage, { appearance: "error" });
        setIsLoading(false);
      }
    );
  };
  let content;

  if (isLoading) {
    content = <LoadingComponent />;
  } else {
    content = (
      <FormContainer container route={route}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <FormPaper>
            <FormAvatar>
              <MdLockOutline />
            </FormAvatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    inputRef={register({
                      required: true,
                      pattern: ValidationPatterns.name,
                      minLength: 4,
                    })}
                    autoComplete="fname"
                    onChange={handleChange}
                    name="firstname"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                  />
                  <ValidationError
                    errors={errors}
                    fieldName="firstname"
                    patternErrorMsg="Alphabets Only!"
                    requiredErrorMsg="First Name Required"
                    lengthErrorMsg="Minimum of 4 Characters!"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    inputRef={register({
                      required: true,
                      pattern: ValidationPatterns.name,
                      minLength: 4,
                    })}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    autoComplete="lastname"
                  />
                  <ValidationError
                    errors={errors}
                    fieldName="lastname"
                    patternErrorMsg="Alphabets Only!"
                    requiredErrorMsg="Last Name Required"
                    lengthErrorMsg="Minimum of 4 Characters!"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputRef={register({
                      required: true,
                      pattern: /^[a-z0-9_-]{3,16}$/gi,
                    })}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdAssignmentInd />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    placeholder=" e.g johdoe"
                  />
                  <ValidationError
                    errors={errors}
                    fieldName="username"
                    patternErrorMsg="Username must be 3 to 16 characters and should not contain spaces or special symbols"
                    requiredErrorMsg="Username Is Required"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    inputRef={register({
                      required: true,
                      pattern: ValidationPatterns.phoneno,
                    })}
                    onChange={handleChange}
                    name="phoneno"
                    label="Phoneno"
                    type="number"
                    id="phoneno"
                    required
                    autoComplete="phoneno"
                    placeholder="e.g 0712345678"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdPhone />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ValidationError
                    errors={errors}
                    fieldName="phoneno"
                    patternErrorMsg="Icorrect Format!"
                    requiredErrorMsg="Phone No is Required"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputRef={register({
                      required: true,
                      pattern: ValidationPatterns.password,
                    })}
                    onChange={handleChange}
                    placeholder=" e.g 123Asd"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MdEnhancedEncryption />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <MdVisibility />
                            ) : (
                              <MdVisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="password"
                  />
                  <ValidationError
                    errors={errors}
                    fieldName="password"
                    patternErrorMsg="Password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
                    requiredErrorMsg="Password is Required"
                  />
                </Grid>
              </Grid>
              <br />
              <SubmitButton type="submit" secondary>
                Continue
              </SubmitButton>
              {message && <RenderErrorMessage msg={message} />}
              <br />
              <br />
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to={`/${route}/sign-in`} variant="body2">
                    Already have an account? sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </FormPaper>
        </Container>
      </FormContainer>
    );
  }

  return content;
}
